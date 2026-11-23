/*
 * Undertow party mode: everyone plays the same 7 prompts at the same time on
 * their own device, with a live leaderboard.
 *
 * How it talks: every device keeps one small "presence" object (who it is, its
 * answers so far, and, for the host, the game state). Each device sees
 * everyone's presence and reacts. No events, no server-side game logic.
 *
 * Two connections:
 *   - claude: the published artifact uses the platform's live room
 *     (claude.use("room")). Players must be signed in with access to the page.
 *   - server: run `node server.js` and open the address it prints. It relays
 *     presence over Server-Sent Events. No accounts needed.
 *
 * The host is the referee: it picks the prompts, starts each round, ends it when
 * everyone has answered (or time runs out), shows standings, and moves on.
 * Scores are self-reported by each device, so this is for friendly games.
 */
(function (UT) {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var G = null; // bridge into game.js, set in init()

  var TIER_POINTS = { common: 10, uncommon: 35, rare: 60, deep: 85, legendary: 100 };
  var TIER_NAMES = { common: 'Shallows', uncommon: 'Kelp Line', rare: 'Twilight Find', deep: 'Abyssal Pull', legendary: 'Leviathan' };
  var COLORS = ['#FF7A6B', '#FFC24A', '#5EF2C2', '#3FE0FF', '#A98BFF', '#FF8FD1', '#9BE15D', '#F4F1FF'];
  var CODE_ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var STATES = ['lobby', 'round', 'between', 'final'];
  var ROUNDS = 7;
  var REVEAL = 3000, ANSWER = 20000, GRACE = 2000, AFTER_ALL = 2500, STANDINGS = 10000;
  var NICK_KEY = 'undertow.nick';

  var byId = {};

  var M = {
    transport: null,
    transportKind: null,
    room: null,
    role: null,          // 'host' | 'player' | null
    code: null,
    nick: '',
    color: null,
    plays: true,         // host also plays
    game: null,          // host only: { ids, state, round, gid, seq }
    gid: '',             // game id my results belong to
    res: [],             // my results: [{ t: tier|null, a: answer }] per round; null = not played
    startedRound: -1,
    peers: [],           // cleaned presence of everyone else
    view: null,
    hostMissingSince: 0,
    hostTimer: null,
    roundStartAt: 0,
    allDoneAt: 0,
    betweenStartAt: 0,
    unsub: [],
    disconnectedSince: 0
  };

  /* ------------------------------------------------------------ helpers */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmtM(m) { return Math.round(m).toLocaleString('en-US'); }
  function cleanText(s, max) {
    if (typeof s !== 'string') return '';
    return s.replace(/[\u0000-\u001f\u007f-\u009f\u00ad\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
  }
  function clampInt(n, lo, hi) { n = Math.floor(Number(n)); return isFinite(n) ? Math.min(hi, Math.max(lo, n)) : lo; }
  function randomCode() { var s = ''; for (var i = 0; i < 4; i++) s += CODE_ALPHA[Math.floor(Math.random() * CODE_ALPHA.length)]; return s; }
  function randomId(n) { var s = ''; var a = 'abcdefghijkmnpqrstuvwxyz23456789'; for (var i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)]; return s; }
  function loadNick() { try { return localStorage.getItem(NICK_KEY) || ''; } catch (e) { return ''; } }
  function saveNick(n) { try { localStorage.setItem(NICK_KEY, n); } catch (e) { /* ignore */ } }
  function pointsOf(res) { return res.reduce(function (n, r) { return n + (r && r.t ? TIER_POINTS[r.t] : 0); }, 0); }
  function leviathans(res) { return res.filter(function (r) { return r && r.t === 'legendary'; }).length; }

  /* ---------------------------------------------------------- transports */
  function claudeTransport(room) {
    return {
      kind: 'claude',
      join: function (code) {
        return room.join('undertow-' + code.toLowerCase()).then(function (r) {
          return {
            setPresence: function (p) { return r.presence(p).catch(function () { /* dropped; next update resends */ }); },
            onPeers: function (fn) {
              return r.onPeers(function (ch) {
                fn(ch.peers.map(function (p) { return { id: p.peer, isMe: p.sameTab, presence: p.presence || {} }; }));
              }, function () { /* terminal; connection handler shows it */ });
            },
            onConnection: function (fn) { return r.onConnection(fn, function () { fn(false); }); },
            leave: function () { return r.leave().catch(function () { /* already gone */ }); }
          };
        });
      }
    };
  }

  function serverTransport() {
    return {
      kind: 'server',
      join: function (code) {
        var name = 'undertow-' + code.toLowerCase();
        var id = randomId(16);
        var peerFns = [], connFns = [], last = null, closed = false;
        var es = new EventSource('api/events?room=' + encodeURIComponent(name) + '&id=' + id);
        function post(p) {
          return fetch('api/presence', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room: name, id: id, presence: p })
          }).catch(function () { /* the stream reconnect resends */ });
        }
        es.addEventListener('peers', function (e) {
          var list;
          try { list = JSON.parse(e.data); } catch (err) { return; }
          if (!Array.isArray(list)) return;
          var peers = list.map(function (p) { return { id: String(p.id), isMe: p.id === id, presence: p.presence || {} }; });
          peerFns.forEach(function (f) { f(peers); });
        });
        es.onopen = function () { connFns.forEach(function (f) { f(true); }); if (last) post(last); };
        es.onerror = function () { if (!closed) connFns.forEach(function (f) { f(false); }); };
        return new Promise(function (resolve, reject) {
          var done = false;
          es.addEventListener('open', function () {
            if (done) return; done = true;
            resolve({
              setPresence: function (p) { last = p; return post(p); },
              onPeers: function (fn) { peerFns.push(fn); return function () { peerFns = peerFns.filter(function (f) { return f !== fn; }); }; },
              onConnection: function (fn) { connFns.push(fn); setTimeout(function () { fn(es.readyState === 1); }, 0); return function () { connFns = connFns.filter(function (f) { return f !== fn; }); }; },
              leave: function () {
                closed = true; es.close();
                return fetch('api/leave', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room: name, id: id }) }).catch(function () {});
              }
            });
          });
          setTimeout(function () { if (!done) { done = true; es.close(); reject(new Error('timeout')); } }, 8000);
        });
      }
    };
  }

  var detecting = null;
  function detect() {
    if (detecting) return detecting;
    detecting = (async function () {
      if (window.claude && typeof window.claude.use === 'function') {
        try {
          var room = await window.claude.use('room');
          if (room) return claudeTransport(room);
        } catch (e) { /* fall through */ }
      }
      if (/^https?:$/.test(location.protocol)) {
        try {
          var r = await fetch('api/ping', { cache: 'no-store' });
          if (r.ok) {
            var j = await r.json();
            if (j && j.app === 'undertow') return serverTransport();
          }
        } catch (e) { /* not our server */ }
      }
      return null;
    })().then(function (t) { M.transport = t; M.transportKind = t ? t.kind : null; return t; });
    return detecting;
  }

  /* ------------------------------------------------------------ presence */
  function myPresence() {
    var p = {
      v: 1, role: M.role, code: M.code, nick: M.nick, color: M.color, gid: M.gid || '',
      res: M.res.map(function (r) { return r ? { t: r.t || null, a: r.a || '' } : null; })
    };
    if (M.role === 'host') { p.plays = M.plays; p.game = M.game; }
    return p;
  }
  function pushPresence() { if (M.room) M.room.setPresence(myPresence()); }

  // Everything heard from other devices is untrusted: rebuild it field by field.
  function clean(p) {
    if (!p || typeof p !== 'object' || p.v !== 1) return null;
    if (p.role !== 'host' && p.role !== 'player') return null;
    if (p.code !== M.code) return null;
    var o = {
      role: p.role,
      nick: cleanText(p.nick, 16) || 'Diver',
      color: COLORS.indexOf(p.color) >= 0 ? p.color : '#A9CBDF',
      gid: typeof p.gid === 'string' ? p.gid.slice(0, 16) : '',
      res: []
    };
    if (Array.isArray(p.res)) {
      for (var i = 0; i < Math.min(ROUNDS, p.res.length); i++) {
        var r = p.res[i];
        o.res.push(r && typeof r === 'object' ? { t: TIER_POINTS[r.t] ? r.t : null, a: cleanText(r.a, 40) } : null);
      }
    }
    if (p.role === 'host') {
      o.plays = !!p.plays;
      var g = p.game;
      if (g && typeof g === 'object' && Array.isArray(g.ids) && STATES.indexOf(g.state) >= 0) {
        var ids = g.ids.filter(function (id) { return typeof id === 'string' && byId[id]; }).slice(0, ROUNDS);
        if (ids.length === ROUNDS) {
          o.game = { ids: ids, state: g.state, round: clampInt(g.round, 0, ROUNDS - 1), gid: typeof g.gid === 'string' ? g.gid.slice(0, 16) : '', seq: clampInt(g.seq, 0, 1e9) };
        }
      }
    }
    return o;
  }

  function localMe() {
    var me = clean(myPresence());
    if (me) { me.id = 'me'; me.isMe = true; }
    return me;
  }

  function hostEntry() {
    if (M.role === 'host') return localMe();
    var hs = M.peers.filter(function (p) { return p.role === 'host' && p.game; });
    hs.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    return hs[0] || null;
  }

  function iPlay() { return M.role === 'player' || (M.role === 'host' && M.plays); }

  // Everyone taking part in the current game, me included.
  function divers(game) {
    var list = M.peers.slice();
    var me = localMe();
    if (me) list.push(me);
    return list.filter(function (p) {
      var playing = p.role === 'player' || (p.role === 'host' && p.plays);
      return playing && (!game || p.gid === game.gid);
    }).map(function (p) {
      p.points = pointsOf(p.res);
      p.depth = Math.min(7000, p.points * 10);
      return p;
    });
  }

  function ranked(game) {
    return divers(game).sort(function (a, b) {
      return b.points - a.points || leviathans(b.res) - leviathans(a.res) || (a.nick < b.nick ? -1 : 1);
    });
  }

  /* ----------------------------------------------------------- host loop */
  function newGame() {
    var ids = UT.daily.randomPrompts(UT.PROMPTS, ROUNDS).map(function (p) { return p.id; });
    var gid = randomId(8);
    M.game = { ids: ids, state: 'lobby', round: 0, gid: gid, seq: (M.game ? M.game.seq + 1 : 1) };
    M.gid = gid;
    M.res = [];
    M.startedRound = -1;
  }

  function setGame(patch) {
    for (var k in patch) M.game[k] = patch[k];
    M.game.seq++;
    var now = Date.now();
    if (patch.state === 'round') { M.roundStartAt = now; M.allDoneAt = 0; }
    if (patch.state === 'between') M.betweenStartAt = now;
    pushPresence();
    update();
  }

  function hostTick() {
    var g = M.game;
    if (M.role !== 'host' || !g) return;
    var now = Date.now();
    if (g.state === 'round') {
      var ds = divers(g);
      var all = ds.length > 0 && ds.every(function (d) { return d.res[g.round] != null; });
      if (all && !M.allDoneAt) M.allDoneAt = now;
      if (!all) M.allDoneAt = 0;
      if (now - M.roundStartAt >= REVEAL + ANSWER + GRACE || (M.allDoneAt && now - M.allDoneAt >= AFTER_ALL)) {
        setGame({ state: 'between' });
        return;
      }
      if (M.view && M.view.indexOf('hostround') === 0) fillHostRound();
    } else if (g.state === 'between') {
      var left = STANDINGS - (now - M.betweenStartAt);
      var t = $('mp-next-time');
      if (t) t.textContent = String(Math.max(0, Math.ceil(left / 1000)));
      if (left <= 0) advance();
    }
  }

  function advance() {
    var g = M.game;
    if (!g || g.state !== 'between') return;
    if (g.round >= ROUNDS - 1) setGame({ state: 'final' });
    else setGame({ state: 'round', round: g.round + 1 });
  }

  /* --------------------------------------------------------- the reactor */
  var missingTimer = null;
  function update() {
    if (!M.role) return;
    var host = hostEntry();
    if (!host || !host.game) {
      if (M.role === 'player') {
        if (!M.hostMissingSince) M.hostMissingSince = Date.now();
        clearTimeout(missingTimer);
        if (Date.now() - M.hostMissingSince >= 5000) { render('nohost'); return; }
        missingTimer = setTimeout(update, 5100 - (Date.now() - M.hostMissingSince));
        if (!M.view || M.view === 'joining') render('joining');
      }
      return;
    }
    M.hostMissingSince = 0;
    clearTimeout(missingTimer);
    var g = host.game;

    if (M.role === 'player' && M.gid !== g.gid) {
      M.gid = g.gid; M.res = []; M.startedRound = -1;
      pushPresence();
    }
    updateGaugeDots(g);

    if (g.state === 'lobby') { render('lobby'); return; }

    if (g.state === 'round') {
      if (iPlay()) {
        if (M.res[g.round] == null && M.startedRound !== g.round) {
          M.startedRound = g.round;
          startMyRound(g);
        } else {
          fillWaitCount(g);
        }
      } else {
        render('hostround');
      }
      return;
    }

    if (g.state === 'between' || g.state === 'final') {
      if (iPlay() && G.phaseActive()) G.forceTimeout();
      render(g.state === 'between' ? 'standings' : 'final');
    }
  }

  function startMyRound(g) {
    var prompts = g.ids.map(function (id) { return byId[id]; });
    while (M.res.length < g.round) M.res.push(null);
    var rounds = [];
    for (var i = 0; i < g.round; i++) {
      var r = M.res[i];
      rounds.push({ promptId: g.ids[i], input: r ? r.a : null, answer: r && r.t ? r.a : null, tier: r ? r.t : null, points: r && r.t ? TIER_POINTS[r.t] : 0, bonus: 0, fuzzy: false });
    }
    pushPresence();
    M.view = 'round';
    G.startMpRound(prompts, g.round, rounds);
  }

  // Called by game.js when this device's round ends (answer or timeout).
  function roundFinished(round, idx) {
    if (!M.role) return;
    while (M.res.length < idx) M.res.push(null);
    M.res[idx] = { t: round.tier || null, a: cleanText(round.answer || '', 40) };
    pushPresence();
    var host = hostEntry();
    if (host && host.game) fillWaitCount(host.game);
    if (M.role === 'host') hostTick();
  }

  function fillWaitCount(g) {
    var el = $('rr-wait');
    if (!el) return;
    var ds = divers(g);
    var done = ds.filter(function (d) { return d.res[g.round] != null; }).length;
    el.textContent = 'Waiting for the other divers · ' + done + ' of ' + ds.length + ' answered';
  }

  /* -------------------------------------------------------------- views */
  function setView(view, html) {
    if (M.view !== view) {
      M.view = view;
      $('mp-body').innerHTML = html;
      G.showScreen('mp');
      return true;
    }
    if (G.screen() !== 'mp') G.showScreen('mp');
    return false;
  }

  function render(view) {
    var host = hostEntry();
    var g = host && host.game;
    if (view === 'lobby') renderLobby(g);
    else if (view === 'hostround') renderHostRound(g);
    else if (view === 'standings') renderStandings(g);
    else if (view === 'final') renderFinal(g);
    else if (view === 'nohost') renderNoHost();
    else if (view === 'joining') setView('joining', '<section class="panel mp-panel"><h2>Joining room ' + esc(M.code) + '…</h2><p class="fine">Looking for the host.</p><div class="btn-row"><button class="btn btn-ghost" type="button" data-mp="leave">Cancel</button></div></section>');
  }

  function rowHtml(p, rank, extra) {
    return '<li class="mp-row' + (p.isMe ? ' me' : '') + '">' +
      (rank ? '<span class="mp-rank">' + rank + '</span>' : '') +
      '<span class="mp-dot" style="background:' + p.color + '"></span>' +
      '<span class="mp-name">' + esc(p.nick) + (p.isMe ? ' <small>you</small>' : '') + (p.role === 'host' ? ' <small>host</small>' : '') + '</span>' +
      (extra || '') + '</li>';
  }

  function renderLobby(g) {
    var isHost = M.role === 'host';
    var fresh = setView('lobby',
      '<section class="panel mp-panel">' +
      '<p class="eyebrow mp-eyebrow">Party dive</p>' +
      '<div class="mp-code-wrap"><span class="fine">Room code</span><span class="mp-code" id="mp-code-big">' + esc(M.code) + '</span></div>' +
      (isHost
        ? '<p class="mp-instructions">Everyone opens this game on their own device, taps <strong>Play with friends</strong>, and enters the code.</p>' +
          '<label class="toggle" for="mp-plays"><span><strong>I’m playing too</strong><small>Turn off to use this screen as a big leaderboard</small></span><input type="checkbox" id="mp-plays"' + (M.plays ? ' checked' : '') + '><span class="switch" aria-hidden="true"></span></label>'
        : '<p class="mp-instructions" id="mp-wait-host">Waiting for the host to start the dive…</p>') +
      '<div class="log-head"><h3>Divers</h3><span class="fine" id="mp-count"></span></div>' +
      '<ul class="mp-list" id="mp-list"></ul>' +
      '<div class="btn-row">' +
      (isHost ? '<button class="btn btn-primary" type="button" data-mp="start" id="mp-start">Start the dive</button>' : '') +
      '<button class="btn btn-ghost" type="button" data-mp="leave">Leave room</button></div>' +
      '</section>');
    var ds = divers(g);
    $('mp-count').textContent = ds.length + (ds.length === 1 ? ' diver' : ' divers');
    var others = M.peers.filter(function (p) { return p.role === 'host' && !p.plays; });
    var list = ds.map(function (p) { return rowHtml(p, 0, ''); }).join('');
    if (M.role === 'player') list += others.map(function (p) { return rowHtml(p, 0, '<span class="mp-extra fine">watching</span>'); }).join('');
    if (M.role === 'host' && !M.plays) list += rowHtml(localMe(), 0, '<span class="mp-extra fine">watching</span>');
    $('mp-list').innerHTML = list || '<li class="fine">Nobody here yet.</li>';
    if (isHost) $('mp-start').disabled = ds.length === 0;
    if (fresh) G.setDepth(0);
  }

  function renderHostRound(g) {
    var p = byId[g.ids[g.round]];
    setView('hostround:' + g.round,
      '<section class="panel mp-panel mp-hostround">' +
      '<div class="card-head"><div class="card-meta"><span class="chip">' + esc(p.category) + '</span><span class="round-label">Party · Prompt ' + (g.round + 1) + ' of ' + ROUNDS + '</span></div>' +
      '<div class="mp-timer"><span id="mp-hr-timer">' + (ANSWER / 1000) + '</span><small>sec</small></div></div>' +
      '<h2 class="prompt-text mp-big-prompt">' + esc(p.prompt) + '</h2>' +
      '<p class="mp-instructions" id="mp-hr-count"></p>' +
      '<ul class="mp-list" id="mp-list"></ul>' +
      '<div class="btn-row"><button class="btn btn-ghost btn-small" type="button" data-mp="end">End this prompt now</button><button class="btn btn-ghost btn-small" type="button" data-mp="leave">End game</button></div>' +
      '</section>');
    fillHostRound();
  }

  function fillHostRound() {
    var g = M.game;
    if (!g || !$('mp-hr-timer')) return;
    var el = Date.now() - M.roundStartAt;
    var left = el < REVEAL ? ANSWER : Math.max(0, ANSWER - (el - REVEAL));
    $('mp-hr-timer').textContent = String(Math.ceil(left / 1000));
    var ds = divers(g);
    var done = ds.filter(function (d) { return d.res[g.round] != null; });
    $('mp-hr-count').textContent = el < REVEAL ? 'Get ready…' : done.length + ' of ' + ds.length + ' divers have answered';
    $('mp-list').innerHTML = ds.map(function (d) {
      var answered = d.res[g.round] != null;
      return rowHtml(d, 0, '<span class="mp-extra">' + (answered ? '<span class="mp-check">Answered</span>' : '<span class="fine">Thinking…</span>') + '</span>');
    }).join('');
    var leader = ranked(g)[0];
    if (leader) G.setDepth(leader.depth);
  }

  function standingsRows(g, showRound) {
    var rows = ranked(g);
    return rows.map(function (d, i) {
      var r = d.res[g.round];
      var extra = '';
      if (showRound) {
        extra = '<span class="mp-extra">' + (r && r.t
          ? '<span class="swatch tier-' + r.t + '"></span>' + esc(r.a)
          : '<span class="fine">No answer</span>') + '</span>';
      }
      return rowHtml(d, i + 1, extra + '<span class="mp-depth">' + fmtM(d.depth) + ' m</span>');
    }).join('');
  }

  function renderStandings(g) {
    var p = byId[g.ids[g.round]];
    var rare = UT.validate.rarest(p).map(function (a) { return a.text; });
    var isHost = M.role === 'host';
    var last = g.round >= ROUNDS - 1;
    setView('standings:' + g.round + ':' + g.gid,
      '<section class="panel mp-panel">' +
      '<p class="eyebrow mp-eyebrow">After prompt ' + (g.round + 1) + ' of ' + ROUNDS + '</p>' +
      '<h2 class="mp-h2">' + esc(p.prompt) + '</h2>' +
      '<p class="fine">Leviathan answers: ' + esc(rare.slice(0, 4).join(', ') + (rare.length > 4 ? ', and ' + (rare.length - 4) + ' more' : '')) + '</p>' +
      '<ol class="mp-list mp-standings" id="mp-list"></ol>' +
      (isHost
        ? '<div class="btn-row"><button class="btn btn-primary" type="button" data-mp="next"><span>' + (last ? 'Show final results' : 'Next prompt') + ' (<span id="mp-next-time">10</span>)</span></button><button class="btn btn-ghost btn-small" type="button" data-mp="leave">End game</button></div>'
        : '<p class="fine">' + (last ? 'Final results coming up…' : 'The next prompt starts soon.') + '</p><div class="btn-row"><button class="btn btn-ghost btn-small" type="button" data-mp="leave">Leave room</button></div>') +
      '</section>');
    $('mp-list').innerHTML = standingsRows(g, true);
    focusDepth(g);
  }

  function focusDepth(g) {
    if (iPlay()) G.setDepth(Math.min(7000, pointsOf(M.res) * 10));
    else { var leader = ranked(g)[0]; G.setDepth(leader ? leader.depth : 0); }
  }

  function emojiRow(res) {
    var E = { common: '🟨', uncommon: '🟩', rare: '🟪', deep: '🔷', legendary: '⬜' };
    var s = '';
    for (var i = 0; i < ROUNDS; i++) s += res[i] && res[i].t ? E[res[i].t] : '⬛';
    return s;
  }

  function renderFinal(g) {
    var rows = ranked(g);
    var isHost = M.role === 'host';
    var fresh = setView('final:' + g.gid,
      '<section class="panel mp-panel mp-final">' +
      '<p class="eyebrow mp-eyebrow">Party dive complete</p>' +
      '<div class="podium" id="mp-podium"></div>' +
      (iPlay() ? '<div class="mp-mine" id="mp-mine"></div>' : '') +
      '<ol class="mp-list mp-standings" id="mp-list"></ol>' +
      '<div class="btn-row">' +
      (isHost ? '<button class="btn btn-primary" type="button" data-mp="again">Play again with this room</button>' : '<p class="fine" style="flex-basis:100%">If the host starts another game, you’ll join it automatically.</p>') +
      '<button class="btn btn-ghost" type="button" data-mp="leave">Leave room</button></div>' +
      '</section>');
    var places = ['2nd', '1st', '3rd'];
    var order = [rows[1], rows[0], rows[2]];
    $('mp-podium').innerHTML = order.map(function (d, i) {
      if (!d) return '<div class="podium-spot empty"></div>';
      return '<div class="podium-spot p' + (i === 1 ? 1 : i === 0 ? 2 : 3) + '">' +
        '<span class="mp-dot big" style="background:' + d.color + '"></span>' +
        '<span class="podium-name">' + esc(d.nick) + '</span>' +
        '<span class="podium-depth">' + fmtM(d.depth) + ' m</span>' +
        '<span class="podium-block">' + places[i] + '</span></div>';
    }).join('');
    if ($('mp-mine')) {
      var myRank = rows.findIndex(function (d) { return d.isMe; }) + 1;
      $('mp-mine').innerHTML = '<span>You finished <strong>' + (myRank ? ordinal(myRank) : '') + '</strong> of ' + rows.length + ' at <strong>' + fmtM(Math.min(7000, pointsOf(M.res) * 10)) + ' m</strong></span><span class="emoji-row">' + emojiRow(M.res) + '</span>';
    }
    $('mp-list').innerHTML = standingsRows(g, false);
    if (fresh) {
      focusDepth(g);
      if (rows[0] && rows[0].isMe && rows.length > 1) G.toast('You dove deepest!', 3000);
    }
  }

  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

  function renderNoHost() {
    setView('nohost',
      '<section class="panel mp-panel"><h2 class="mp-h2">No host in room ' + esc(M.code) + '</h2>' +
      '<p>Either the code is wrong or the host has left. Check the code on the host’s screen and try again.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" type="button" data-mp="menu">Try another code</button><button class="btn btn-ghost" type="button" data-mp="leave">Back to the surface</button></div></section>');
  }

  /* --------------------------------------------------------------- menu */
  function open() {
    M.view = null;
    var nick = M.nick || loadNick();
    setView('menu',
      '<section class="panel mp-panel">' +
      '<p class="eyebrow mp-eyebrow">Party dive</p>' +
      '<h2 class="mp-h2">Play with friends</h2>' +
      '<p>Everyone plays the same 7 prompts at the same time, each on their own device. Rarest answers dive deepest, and you’ll see the standings after every prompt.</p>' +
      '<div id="mp-setup" hidden>' +
      '<label class="mp-label" for="mp-nick">Your diver name</label>' +
      '<input class="mp-input" id="mp-nick" type="text" maxlength="16" autocomplete="nickname" spellcheck="false" placeholder="e.g. Captain Nemo" value="' + esc(nick) + '">' +
      '<div class="mp-choices">' +
      '<div class="mp-choice"><h3>Host a game</h3><p class="fine">You get a room code to share. You can play too, or just show the leaderboard.</p><button class="btn btn-primary" type="button" data-mp="host">Create a room</button></div>' +
      '<div class="mp-choice"><h3>Join a game</h3><label class="mp-label" for="mp-code">Room code</label>' +
      '<form class="mp-join" id="mp-join-form"><input class="mp-input mp-code-input" id="mp-code" type="text" inputmode="text" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD"><button class="btn btn-primary" type="submit">Join</button></form></div>' +
      '</div></div>' +
      '<p class="mp-status" id="mp-status" role="status">Connecting…</p>' +
      '<div class="btn-row"><button class="btn btn-ghost btn-small" type="button" data-mp="back">Back</button></div>' +
      '</section>');
    G.setDepth(0);
    detect().then(function (t) {
      if (M.view !== 'menu') return;
      if (t) {
        $('mp-setup').hidden = false;
        $('mp-status').textContent = '';
        var n = $('mp-nick');
        if (!n.value) n.focus();
      } else {
        $('mp-status').innerHTML = unavailableMessage();
      }
    });
  }

  function unavailableMessage() {
    if (window.claude && typeof window.claude.use === 'function') {
      return 'Party mode can’t connect in this view. Every player needs to be signed in to claude.ai with access to this page. Shared public links can’t join live rooms.';
    }
    return 'Party mode needs a small server so devices can talk to each other. On one computer, run <code>node server.js</code> in the game folder, then open the address it prints on every device.';
  }

  function readNick() {
    var n = cleanText(($('mp-nick') || {}).value || '', 16);
    if (!n) {
      $('mp-status').textContent = 'Pick a diver name first.';
      $('mp-nick').focus();
      return null;
    }
    M.nick = n; saveNick(n);
    return n;
  }

  async function connect(code, role) {
    var t = await detect();
    if (!t) return false;
    $('mp-status').textContent = 'Connecting to room ' + code + '…';
    try {
      M.room = await t.join(code);
    } catch (e) {
      M.room = null;
      $('mp-status').textContent = 'Couldn’t reach the room. Check your connection and try again.';
      return false;
    }
    M.code = code;
    M.role = role;
    M.color = M.color || COLORS[Math.floor(Math.random() * COLORS.length)];
    M.peers = [];
    M.unsub.push(M.room.onPeers(function (list) {
      if (!list) return;
      M.peers = list.filter(function (p) { return !p.isMe; }).map(function (p) {
        var c = clean(p.presence);
        if (!c) return null;
        c.id = p.id; c.isMe = false;
        return c;
      }).filter(Boolean);
      // pick a colour nobody else has, if one is free
      var used = M.peers.map(function (p) { return p.color; });
      if (used.indexOf(M.color) >= 0) {
        var free = COLORS.filter(function (c) { return used.indexOf(c) < 0; });
        if (free.length) { M.color = free[0]; pushPresence(); }
      }
      update();
    }));
    M.unsub.push(M.room.onConnection(function (ok) {
      var banner = $('mp-conn');
      if (ok) { M.disconnectedSince = 0; banner.hidden = true; return; }
      if (!M.disconnectedSince) M.disconnectedSince = Date.now();
      setTimeout(function () { if (M.disconnectedSince && Date.now() - M.disconnectedSince >= 1900 && M.role) banner.hidden = false; }, 2000);
    }));
    return true;
  }

  async function hostGame() {
    if (!readNick()) return;
    var code = randomCode();
    newGame();
    if (!(await connect(code, 'host'))) return;
    pushPresence();
    clearInterval(M.hostTimer);
    M.hostTimer = setInterval(hostTick, 250);
    update();
  }

  async function joinGame(raw) {
    if (!readNick()) return;
    var code = String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length !== 4) { $('mp-status').textContent = 'Room codes are 4 letters or numbers.'; $('mp-code').focus(); return; }
    M.gid = ''; M.res = []; M.startedRound = -1; M.hostMissingSince = Date.now();
    if (!(await connect(code, 'player'))) return;
    pushPresence();
    render('joining');
    update();
  }

  function leave() {
    clearInterval(M.hostTimer); M.hostTimer = null;
    clearTimeout(missingTimer);
    M.unsub.forEach(function (u) { try { u(); } catch (e) { /* ignore */ } });
    M.unsub = [];
    if (M.room) M.room.leave();
    M.room = null; M.role = null; M.code = null; M.game = null; M.peers = []; M.res = []; M.gid = '';
    M.view = null; M.startedRound = -1;
    $('mp-conn').hidden = true;
    clearGaugeDots();
    G.abort();
  }

  /* -------------------------------------------------------- gauge dots */
  function updateGaugeDots(g) {
    var gauge = $('gauge');
    var wrap = $('gauge-peers');
    if (!wrap) { wrap = document.createElement('div'); wrap.id = 'gauge-peers'; wrap.className = 'gauge-peers'; gauge.appendChild(wrap); }
    var others = divers(g).filter(function (d) { return !d.isMe; });
    wrap.innerHTML = others.map(function (d) {
      return '<span class="gauge-peer" style="top:' + (d.depth / 7000 * 100) + '%;background:' + d.color + '" title="' + esc(d.nick) + ' · ' + fmtM(d.depth) + ' m"></span>';
    }).join('');
  }
  function clearGaugeDots() { var w = $('gauge-peers'); if (w) w.innerHTML = ''; }

  /* ------------------------------------------------------------- events */
  function bind() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mp]');
      if (!b) return;
      var a = b.getAttribute('data-mp');
      if (a === 'host') hostGame();
      else if (a === 'back') { leave(); }
      else if (a === 'leave') leave();
      else if (a === 'menu') { leave(); G.showScreen('mp'); open(); }
      else if (a === 'start' && M.role === 'host' && M.game && M.game.state === 'lobby') setGame({ state: 'round', round: 0 });
      else if (a === 'next' && M.role === 'host') advance();
      else if (a === 'end' && M.role === 'host' && M.game && M.game.state === 'round') setGame({ state: 'between' });
      else if (a === 'again' && M.role === 'host') { newGame(); M.view = null; pushPresence(); update(); }
    });
    document.addEventListener('change', function (e) {
      if (e.target && e.target.id === 'mp-plays' && M.role === 'host') {
        M.plays = e.target.checked;
        if (!M.plays) M.res = [];
        pushPresence(); update();
      }
    });
    document.addEventListener('submit', function (e) {
      if (e.target && e.target.id === 'mp-join-form') { e.preventDefault(); joinGame($('mp-code').value); }
    });
    document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'mp-code') {
        var v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
        if (v !== e.target.value) e.target.value = v;
      }
    });
    window.addEventListener('pagehide', function () { if (M.room) M.room.leave(); });
  }

  UT.mp = {
    init: function (bridge) {
      G = bridge;
      UT.PROMPTS.forEach(function (p) { byId[p.id] = p; });
      bind();
      detect(); // start early so the menu opens connected
    },
    open: function () { G.showScreen('mp'); open(); },
    roundFinished: roundFinished,
    active: function () { return !!M.role; },
    _state: M
  };
})(window.UT = window.UT || {});
