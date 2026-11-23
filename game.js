/*
 * Undertow game: state machine, screens, timers, saving, sharing.
 *
 * States: title -> reveal -> answering -> roundResult -> ... (7 rounds) -> results
 */
(function (UT) {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var D = UT.daily, V = UT.validate, O = UT.ocean, A = UT.audio;

  var TIERS = {
    common: { name: 'Shallows', points: 10, emoji: '🟨' },
    uncommon: { name: 'Kelp Line', points: 35, emoji: '🟩' },
    rare: { name: 'Twilight Find', points: 60, emoji: '🟪' },
    deep: { name: 'Abyssal Pull', points: 85, emoji: '🔷' },
    legendary: { name: 'Leviathan', points: 100, emoji: '⬜' }
  };
  var MISS_EMOJI = '⬛';
  var ROUNDS = D.ROUNDS;
  var REVEAL_MS = 3000;
  var ANSWER_MS = 20000;
  var CIRC = 2 * Math.PI * 25;

  var FLAVORS = [
    [500, 'Tide-pool Tourist'],
    [1500, 'Kelp Wanderer'],
    [3000, 'Twilight Drifter'],
    [4500, 'Midnight Diver'],
    [6500, 'Abyssal Explorer'],
    [Infinity, 'Trench Legend']
  ];

  var params = new URLSearchParams(location.search);
  var DEBUG = params.get('debug') === '1' || location.hash === '#debug';

  var store = D.load();
  var S = {
    mode: null,          // 'daily' | 'practice'
    dive: 0,
    prompts: [],
    idx: 0,
    phase: 'idle',       // idle | reveal | answering | roundResult | done
    phaseStart: 0,
    rounds: [],
    lastSecond: null,
    beatTimer: null,
    beatStart: 0,
    beatDur: 0,
    debugDive: null,
    skipTimers: false,
    zoneKey: 'sunlight',
    result: null
  };

  /* ------------------------------------------------------------- helpers */
  function save() { D.save(store); }
  function fmtM(m) { return Math.round(m).toLocaleString('en-US'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function currentDive() { return S.debugDive != null ? S.debugDive : D.diveNumberFor(new Date()); }
  function sumPoints(rounds) { return rounds.reduce(function (n, r) { return n + (r.points || 0); }, 0); }
  function sumBonus(rounds) { return rounds.reduce(function (n, r) { return n + (r.bonus || 0); }, 0); }
  function depthFor(points) { return Math.min(O.MAX_DEPTH, points * 10); }
  function flavorFor(depth) { for (var i = 0; i < FLAVORS.length; i++) if (depth < FLAVORS[i][0]) return FLAVORS[i][1]; return FLAVORS[FLAVORS.length - 1][1]; }
  function promptById(id) { for (var i = 0; i < UT.PROMPTS.length; i++) if (UT.PROMPTS[i].id === id) return UT.PROMPTS[i]; return null; }
  function badge(tier, extra) {
    if (!tier) return '<span class="tier-badge tier-miss">No answer' + (extra || '') + '</span>';
    return '<span class="tier-badge tier-' + tier + '">' + TIERS[tier].name + (extra || '') + '</span>';
  }
  function reducedMotion() {
    if (store.settings.reducedMotion != null) return !!store.settings.reducedMotion;
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function displayedStreak() {
    var st = store.stats;
    return st.lastDive >= currentDive() - 1 ? st.streak : 0;
  }
  function formatCountdown(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  var srEl, toastEl, toastTimer;
  function announce(msg) { srEl.textContent = ''; setTimeout(function () { srEl.textContent = msg; }, 30); }
  function toast(msg, ms) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
      toastTimer = setTimeout(function () { toastEl.hidden = true; }, 400);
    }, ms || 2600);
  }

  /* ------------------------------------------------------------- screens */
  function showScreen(name) {
    ['title', 'round', 'results', 'mp'].forEach(function (n) { $('screen-' + n).hidden = n !== name; });
    document.body.setAttribute('data-screen', name);
    $('scroller').scrollTop = 0;
  }

  /* ----------------------------------------------------------- title */
  function renderTitle() {
    var dive = currentDive();
    var done = store.results[dive];
    var inProgress = store.today && store.today.dive === dive && store.today.rounds.length > 0 && !done;
    $('title-eyebrow').textContent = 'Dive #' + dive + ' · ' + D.formatDiveDate(dive);
    var streak = displayedStreak();
    var streakHtml = streak > 0 ? '<span class="streak">Streak: ' + streak + ' day' + (streak === 1 ? '' : 's') + '</span>' : '<span class="streak fine">Start a streak today</span>';
    var html;
    if (done) {
      html =
        '<div class="title-meta"><h2>Today’s dive is done</h2>' + streakHtml + '</div>' +
        '<div class="mini-result"><span class="big">' + fmtM(done.depth) + ' m</span><span class="final-zone">' + O.zoneFor(done.depth).name + '</span></div>' +
        '<div class="emoji-row" aria-label="Your seven results">' + emojiRow(done.rounds) + '</div>' +
        '<div class="btn-row"><button class="btn btn-primary" type="button" data-act="share">Share result</button>' +
        '<button class="btn btn-ghost" type="button" data-act="view">See dive log</button></div>' +
        '<div class="title-meta"><span class="fine">Next dive in <span class="countdown" data-countdown></span></span>' +
        '<span class="btn-pair"><button class="btn btn-ghost btn-small" type="button" data-act="practice">Practice dive</button>' +
        '<button class="btn btn-ghost btn-small" type="button" data-act="mp">Play with friends</button></span></div>';
    } else {
      var label = inProgress ? 'Resume today’s dive' : 'Begin today’s dive';
      var sub = inProgress ? 'You’re on prompt ' + (store.today.rounds.length + 1) + ' of ' + ROUNDS + '.' : 'Seven prompts. Same for everyone today.';
      html =
        '<div class="title-meta"><h2>' + (inProgress ? 'Dive in progress' : 'Ready to dive?') + '</h2>' + streakHtml + '</div>' +
        '<p class="fine" style="font-size:15px">' + sub + '</p>' +
        '<div class="btn-row"><button class="btn btn-primary" type="button" data-act="daily">' + label + '</button>' +
        '<button class="btn btn-ghost" type="button" data-act="practice">Practice dive</button></div>' +
        '<button class="btn btn-ghost btn-party" type="button" data-act="mp">Play with friends <span class="fine">each on your own device</span></button>' +
        '<div class="title-meta"><button class="btn btn-ghost btn-small" type="button" data-act="help">How to play</button>' +
        '<span class="fine">New dive in <span class="countdown" data-countdown></span></span></div>';
    }
    $('title-panel').innerHTML = html;
    updateCountdowns();
  }

  function goTitle() {
    if (S.phase === 'reveal' || S.phase === 'answering' || S.phase === 'roundResult') return;
    clearBeat();
    S.mode = null; S.phase = 'idle';
    var done = store.results[currentDive()];
    O.setDepth(done ? done.depth : 0);
    renderTitle();
    showScreen('title');
  }

  /* ----------------------------------------------------------- starting */
  function startDaily() {
    var dive = currentDive();
    if (store.results[dive]) { showResults(store.results[dive], 'daily', dive); return; }
    if (!store.today || store.today.dive !== dive) store.today = { dive: dive, rounds: [] };
    save();
    S.mode = 'daily';
    S.dive = dive;
    S.prompts = D.promptsForDive(dive, UT.PROMPTS);
    S.rounds = store.today.rounds.slice();
    S.idx = S.rounds.length;
    O.setDepth(depthFor(sumPoints(S.rounds)));
    if (S.idx >= ROUNDS) { finishDive(); return; }
    startRound();
  }

  function startPractice() {
    S.mode = 'practice';
    S.dive = 0;
    S.prompts = D.randomPrompts(UT.PROMPTS, ROUNDS);
    S.rounds = [];
    S.idx = 0;
    O.setDepth(0);
    startRound();
  }

  /* ------------------------------------------------------------- rounds */
  function renderDots() {
    var ol = $('round-dots');
    var html = '';
    for (var i = 0; i < ROUNDS; i++) {
      var r = S.rounds[i];
      var cls = r ? 'done ' + (r.tier || 'miss') : (i === S.idx ? 'current' : '');
      var label = r ? 'Prompt ' + (i + 1) + ': ' + (r.tier ? TIERS[r.tier].name : 'no answer') : 'Prompt ' + (i + 1) + (i === S.idx ? ', current' : '');
      html += '<li class="' + cls + '" aria-label="' + label + '"></li>';
    }
    ol.innerHTML = html;
  }

  function startRound() {
    clearBeat();
    var p = S.prompts[S.idx];
    showScreen('round');
    $('cat-chip').textContent = p.category;
    $('round-label').textContent = (S.mode === 'practice' ? 'Practice · ' : S.mode === 'mp' ? 'Party · ' : '') + 'Prompt ' + (S.idx + 1) + ' of ' + ROUNDS;
    $('prompt-text').textContent = p.prompt;
    $('answer-form').hidden = false;
    $('feedback').hidden = false;
    $('feedback').textContent = '';
    $('feedback').className = 'feedback';
    $('round-result').hidden = true;
    var input = $('answer-input');
    input.value = '';
    var card = $('prompt-card');
    card.classList.remove('revealing'); void card.offsetWidth; card.classList.add('revealing');
    renderDots();
    $('timer').classList.remove('spent');
    $('timer-fill').style.strokeDashoffset = String(CIRC);
    setPhase('reveal');
    announce('Prompt ' + (S.idx + 1) + ' of ' + ROUNDS + ': ' + p.prompt + '. Answer box opens in 3 seconds.');
  }

  function setPhase(ph) {
    S.phase = ph;
    S.phaseStart = performance.now();
    S.lastSecond = null;
    var input = $('answer-input'), btn = $('answer-submit'), timer = $('timer');
    if (ph === 'reveal') {
      input.disabled = true; btn.disabled = true;
      input.placeholder = 'Get ready…';
      timer.classList.add('reveal'); timer.classList.remove('low');
      $('timer-num').textContent = String(ANSWER_MS / 1000);
    } else if (ph === 'answering') {
      input.disabled = false; btn.disabled = false;
      input.placeholder = 'Type an answer…';
      timer.classList.remove('reveal');
      try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
    } else {
      input.disabled = true; btn.disabled = true;
      timer.classList.remove('reveal', 'low');
    }
  }

  function tick() {
    var now = performance.now();
    var el = now - S.phaseStart;
    var fill = $('timer-fill');
    if (S.phase === 'reveal') {
      var k = Math.min(1, el / (S.skipTimers ? 300 : REVEAL_MS));
      fill.style.strokeDashoffset = String(CIRC * (1 - k));
      if (k >= 1) setPhase('answering');
    } else if (S.phase === 'answering') {
      var remaining = ANSWER_MS - el;
      if (S.skipTimers) remaining = ANSWER_MS;
      var frac = Math.max(0, remaining / ANSWER_MS);
      fill.style.strokeDashoffset = String(CIRC * (1 - frac));
      var sec = Math.max(0, Math.ceil(remaining / 1000));
      if (sec !== S.lastSecond) {
        S.lastSecond = sec;
        $('timer-num').textContent = String(sec);
        $('timer').classList.toggle('low', sec <= 5 && sec > 0);
        if (sec <= 5 && sec > 0) A.tick();
        if (sec === 10) announce('10 seconds left');
        if (sec === 5) announce('5 seconds left');
      }
      if (remaining <= 0) timeout();
    }
  }

  function submit(e) {
    e.preventDefault();
    if (S.phase !== 'answering') return;
    var input = $('answer-input');
    var value = input.value;
    var p = S.prompts[S.idx];
    var res = V.check(p, value);
    if (res.status === 'empty') return;
    if (res.status === 'accepted') {
      var el = performance.now() - S.phaseStart;
      var secsLeft = S.skipTimers ? 10 : Math.max(0, Math.floor((ANSWER_MS - el) / 1000));
      var bonus = store.settings.speedBonus && S.mode !== 'mp' ? Math.min(10, secsLeft) : 0;
      finishRound({
        promptId: p.id, input: value.trim().slice(0, 60), answer: res.answer.text,
        tier: res.answer.tier, points: TIERS[res.answer.tier].points, bonus: bonus, fuzzy: res.fuzzy
      }, res.answer);
    } else {
      var msg = res.message || 'Not on the list. Try another!';
      var fb = $('feedback');
      fb.textContent = msg;
      fb.className = 'feedback bad';
      var form = $('answer-form');
      form.classList.remove('shake', 'flash'); void form.offsetWidth;
      form.classList.add(reducedMotion() ? 'flash' : 'shake');
      setTimeout(function () { form.classList.remove('flash'); }, 600);
      input.select();
      A.thud();
      announce(msg);
    }
  }

  function timeout() {
    var p = S.prompts[S.idx];
    A.timeout();
    finishRound({ promptId: p.id, input: null, answer: null, tier: null, points: 0, bonus: 0, fuzzy: false }, null);
  }

  function finishRound(round, answerObj) {
    setPhase('roundResult');
    S.rounds.push(round);
    if (S.mode === 'daily') {
      store.today = { dive: S.dive, rounds: S.rounds.slice() };
      save();
    }
    renderDots();
    var p = S.prompts[S.idx];

    $('answer-form').hidden = true;
    $('feedback').hidden = true;
    $('timer-fill').style.strokeDashoffset = String(CIRC);
    $('timer').classList.add('spent');
    var rr = $('round-result');
    rr.hidden = false;

    var meters = round.points * 10;
    var badgeEl = $('rr-badge');
    if (round.tier) {
      badgeEl.className = 'tier-badge pop tier-' + round.tier;
      badgeEl.innerHTML = esc(TIERS[round.tier].name) + ' <span class="pts">+' + round.points + '</span>';
      $('rr-meters').textContent = '↓ ' + fmtM(meters) + ' m' + (round.bonus ? ' · +' + round.bonus + ' speed bonus' : '');
      var typed = round.fuzzy ? ' <small>(you typed “' + esc(round.input) + '”)</small>' : '';
      $('rr-answer').innerHTML = '<strong>' + esc(round.answer) + '</strong>' + typed;
      $('rr-note').textContent = (answerObj && answerObj.note) || '';
      $('rr-examples').innerHTML = '';
    } else {
      badgeEl.className = 'tier-badge pop tier-miss';
      badgeEl.textContent = 'Surfaced empty-handed';
      $('rr-meters').textContent = '+0 m';
      $('rr-answer').innerHTML = 'Other divers found:';
      $('rr-note').textContent = '';
      $('rr-examples').innerHTML = V.examples(p).map(function (a) {
        return '<span class="ex"><span class="swatch tier-' + a.tier + '"></span>' + esc(a.text) + '</span>';
      }).join('');
    }
    var last = S.idx === ROUNDS - 1;
    $('next-label').textContent = last ? 'See results' : 'Next prompt';

    // Descend.
    var prevDepth = O.getTarget();
    var prevZone = O.zoneFor(prevDepth).key;
    var newDepth = depthFor(sumPoints(S.rounds));
    var dur = O.setDepth(newDepth);
    A.setDepth(newDepth);
    if (round.tier) A.bloop(round.tier);
    if (round.tier === 'legendary') legendaryFx();
    announce(round.tier ? 'Accepted: ' + round.answer + '. ' + TIERS[round.tier].name + ', plus ' + round.points + ' points. Depth ' + fmtM(newDepth) + ' meters.' : 'Time is up. No answer this round.');

    setTimeout(function () {
      var z = O.zoneFor(newDepth);
      if (z.key !== prevZone && newDepth > prevDepth) {
        A.ping();
        if (newDepth >= O.MAX_DEPTH) toast('You touched the bottom of the world.', 3800);
        else toast('↓ Entering the ' + z.name, 2800);
      } else if (newDepth >= O.MAX_DEPTH && prevDepth < O.MAX_DEPTH) {
        toast('You touched the bottom of the world.', 3800);
      }
    }, Math.max(400, dur * 0.7));

    if (S.mode === 'mp') {
      // Party mode: the host decides when the next prompt starts.
      $('btn-next').hidden = true;
      $('rr-wait').hidden = false;
      $('rr-wait').textContent = 'Waiting for the other divers…';
      if (UT.mp) UT.mp.roundFinished(round, S.idx);
      return;
    }
    $('btn-next').hidden = false;
    $('rr-wait').hidden = true;
    // Auto-advance after a beat; longer when there is something to read.
    var readMore = !round.tier || (answerObj && answerObj.note) || round.fuzzy;
    startBeat(readMore ? 6500 : 2500);
    setTimeout(function () { try { $('btn-next').focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 50);
  }

  function startBeat(ms) {
    clearBeat();
    S.beatDur = ms; S.beatStart = performance.now();
    var fill = $('next-fill');
    fill.style.transition = 'none';
    fill.style.transform = 'scaleX(0)';
    void fill.offsetWidth;
    fill.style.transition = 'transform ' + ms + 'ms linear';
    fill.style.transform = 'scaleX(1)';
    S.beatTimer = setTimeout(next, ms);
  }
  function clearBeat() {
    if (S.beatTimer) clearTimeout(S.beatTimer);
    S.beatTimer = null;
    var fill = $('next-fill');
    if (fill) { fill.style.transition = 'none'; fill.style.transform = 'scaleX(0)'; }
  }

  function next() {
    if (S.phase !== 'roundResult' || S.mode === 'mp') return;
    clearBeat();
    S.idx++;
    if (S.idx >= ROUNDS) finishDive();
    else startRound();
  }

  /* ------------------------------------------------------------ finish */
  function finishDive() {
    S.phase = 'done';
    var points = sumPoints(S.rounds);
    var result = {
      dive: S.dive,
      rounds: S.rounds.slice(),
      points: points,
      bonus: sumBonus(S.rounds),
      depth: depthFor(points)
    };
    if (S.mode === 'daily' && !store.results[S.dive]) {
      store.results[S.dive] = result;
      store.today = null;
      var st = store.stats;
      st.played++;
      st.streak = st.lastDive === S.dive - 1 ? st.streak + 1 : 1;
      st.bestStreak = Math.max(st.bestStreak, st.streak);
      st.lastDive = Math.max(st.lastDive, S.dive);
      st.deepest = Math.max(st.deepest, result.depth);
      st.totalDepth += result.depth;
      result.rounds.forEach(function (r) {
        st.tiers[r.tier || 'miss'] = (st.tiers[r.tier || 'miss'] || 0) + 1;
        if (r.tier === 'legendary') st.legendary++;
      });
      var zk = O.zoneFor(result.depth).key;
      st.zones[zk] = (st.zones[zk] || 0) + 1;
      save();
    }
    showResults(result, S.mode, S.dive);
  }

  function emojiRow(rounds) {
    var s = '';
    for (var i = 0; i < ROUNDS; i++) {
      var r = rounds[i];
      s += r ? (r.tier ? TIERS[r.tier].emoji : MISS_EMOJI) : MISS_EMOJI;
    }
    return s;
  }

  function shareText(result) {
    return 'Undertow Dive #' + result.dive + ' 🌊\n' +
      emojiRow(result.rounds) + '\n' +
      '↓ ' + fmtM(result.depth) + ' m · ' + O.zoneFor(result.depth).name + '\n' +
      'Streak: ' + displayedStreak() + ' 🔥';
  }

  function share(result, btn) {
    var text = shareText(result);
    var label = btn ? btn.textContent : '';
    function done(msg) {
      toast(msg, 2000);
      if (btn) { btn.textContent = msg; setTimeout(function () { btn.textContent = label; }, 1800); }
    }
    function fallback() {
      var box = document.getElementById('share-fallback');
      if (box) { box.hidden = false; box.value = text; box.focus(); box.select(); }
      done('Select the text to copy it');
    }
    var inFrame = window.self !== window.top;
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (!inFrame && coarse && navigator.share) {
      navigator.share({ text: text }).catch(function (err) { if (!err || err.name !== 'AbortError') fallback(); });
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done('Copied!'); }, fallback);
    } else {
      fallback();
    }
  }

  function showResults(result, mode, dive) {
    S.result = result;
    S.mode = mode;
    S.phase = 'done';
    O.setDepth(result.depth);
    var zone = O.zoneFor(result.depth);
    var practice = mode === 'practice';
    var bonusLine = result.bonus ? ' · +' + result.bonus + ' speed bonus' : '';
    var hero =
      '<section class="panel results-hero">' +
      '<h2 id="results-heading">' + (practice ? 'Practice dive complete' : 'Dive #' + dive + ' complete') + '</h2>' +
      '<div class="final-depth">' + fmtM(result.depth) + '<span>m</span></div>' +
      '<div class="final-zone">' + zone.name + '</div>' +
      '<p class="flavor">' + flavorFor(result.depth) + '</p>' +
      '<p class="score-line">' + result.points + ' of 700 points' + bonusLine + '</p>' +
      '<div class="emoji-row" aria-label="Your seven results">' + emojiRow(result.rounds) + '</div>' +
      '<div class="btn-row">' +
      (practice
        ? '<button class="btn btn-primary" type="button" data-act="practice">Another practice dive</button>'
        : '<button class="btn btn-primary" type="button" data-act="share">Share result</button>') +
      '<button class="btn btn-ghost" type="button" data-act="title">Back to the surface</button>' +
      '</div>' +
      (practice ? '' : '<textarea id="share-fallback" class="share-fallback" rows="4" readonly hidden aria-label="Result text to copy"></textarea>') +
      (practice ? '' : '<p class="fine">Next dive in <span class="countdown" data-countdown></span></p>') +
      '</section>';

    var log = '<section class="panel"><div class="log-head"><h3>Dive log</h3><span class="fine">Your answers</span></div><ol class="dive-log">';
    result.rounds.forEach(function (r, i) {
      var p = promptById(r.promptId);
      var rare = p ? V.rarest(p).map(function (a) { return a.text; }) : [];
      var rareTxt = rare.slice(0, 3).join(', ') + (rare.length > 3 ? ', and ' + (rare.length - 3) + ' more' : '');
      log += '<li><span class="n">' + (i + 1) + '</span><div>' +
        '<div class="q">' + esc(p ? p.prompt : r.promptId) + '</div>' +
        '<div class="a">' + (r.answer ? 'You said <strong>' + esc(r.answer) + '</strong>' : 'No answer in time') + '</div>' +
        (rare.length ? '<button class="reveal-btn" type="button" data-reveal>Show the rarest answer' + (rare.length > 1 ? 's' : '') + '</button><div class="reveal-text" hidden>Leviathan: ' + esc(rareTxt) + '</div>' : '') +
        '</div>' + badge(r.tier, r.tier ? ' <span class="pts">+' + r.points + '</span>' : '') + '</li>';
    });
    log += '</ol></section>';

    var stats = practice ? '' : '<section class="panel stats-panel">' + statsHtml() + '</section>';
    $('results-body').innerHTML = '<div class="screen-stack" style="display:flex;flex-direction:column;gap:16px">' + hero + log + stats + '</div>';
    showScreen('results');
    updateCountdowns();
    var h = $('results-heading');
    if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  /* ------------------------------------------------------------- stats */
  function statsHtml() {
    var st = store.stats;
    var avg = st.played ? Math.round(st.totalDepth / st.played / 10) * 10 : 0;
    var html = '<h3>Your dive log</h3>' +
      '<div class="stat-grid">' +
      '<div class="stat"><b>' + st.played + '</b><span>Dives</span></div>' +
      '<div class="stat"><b>' + displayedStreak() + '</b><span>Current streak</span></div>' +
      '<div class="stat"><b>' + st.bestStreak + '</b><span>Best streak</span></div>' +
      '<div class="stat"><b>' + fmtM(st.deepest) + '</b><span>Deepest (m)</span></div>' +
      '<div class="stat"><b>' + fmtM(avg) + '</b><span>Average (m)</span></div>' +
      '<div class="stat"><b>' + st.legendary + '</b><span>Leviathans</span></div>' +
      '</div>';
    html += '<p class="fine">Where your dives ended</p>' + histogram(st.zones);
    html += '<div class="tier-tally">' + Object.keys(TIERS).map(function (k) {
      return '<span><span class="swatch tier-' + k + '"></span>' + TIERS[k].name + ' ' + (st.tiers[k] || 0) + '</span>';
    }).join('') + '<span><span class="swatch tier-miss"></span>No answer ' + (st.tiers.miss || 0) + '</span></div>';
    return html;
  }

  function histogram(zones) {
    var keys = O.ZONES.map(function (z) { return z.key; });
    var labels = { sunlight: 'Sunlight', twilight: 'Twilight', midnight: 'Midnight', abyssal: 'Abyssal', hadal: 'Hadal' };
    var max = Math.max.apply(null, keys.map(function (k) { return zones[k] || 0; }).concat([1]));
    var W = 320, H = 130, top = 18, base = 104, bw = 44, gap = (W - bw * 5) / 6;
    var svg = '<svg class="hist" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Number of dives ending in each ocean zone">';
    svg += '<line x1="0" x2="' + W + '" y1="' + base + '" y2="' + base + '" stroke="currentColor" stroke-opacity=".2"/>';
    keys.forEach(function (k, i) {
      var v = zones[k] || 0;
      var h = Math.round((base - top) * v / max);
      var x = gap + i * (bw + gap);
      var z = O.ZONES[i];
      svg += '<rect x="' + x + '" y="' + (base - Math.max(h, 2)) + '" width="' + bw + '" height="' + Math.max(h, 2) + '" rx="6" fill="' + z.top + '" stroke="rgba(255,255,255,.35)"/>';
      svg += '<text class="val" x="' + (x + bw / 2) + '" y="' + (base - Math.max(h, 2) - 5) + '" text-anchor="middle">' + v + '</text>';
      svg += '<text x="' + (x + bw / 2) + '" y="' + (base + 17) + '" text-anchor="middle">' + labels[k] + '</text>';
    });
    return svg + '</svg>';
  }

  /* ------------------------------------------------------------- modals */
  var lastFocus = null;
  function openModal(id) {
    closeModals();
    lastFocus = document.activeElement;
    if (id === 'modal-stats') $('stats-body').innerHTML = store.stats.played ? statsHtml().replace('<h3>Your dive log</h3>', '') : '<p>No dives logged yet. Finish today’s dive to start your record.</p>' + statsHtml().replace('<h3>Your dive log</h3>', '');
    if (id === 'modal-settings') syncSettingsUI();
    var m = $(id);
    m.hidden = false;
    var f = m.querySelector('[data-close]');
    var first = m.querySelector('input, button:not(.modal-close)') || f;
    if (first) first.focus();
  }
  function closeModals() {
    var any = false;
    document.querySelectorAll('.modal-backdrop').forEach(function (m) { if (!m.hidden) any = true; m.hidden = true; });
    if (any) {
      if (S.phase === 'answering') $('answer-input').focus();
      else if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    return any;
  }

  function buildTierKey() {
    $('tier-key').innerHTML = Object.keys(TIERS).map(function (k) {
      return '<div><span class="swatch tier-' + k + '"></span>' + TIERS[k].name + '<b>+' + TIERS[k].points + '</b></div>';
    }).join('');
  }

  /* ------------------------------------------------------------- settings */
  function applySettings() {
    var s = store.settings;
    document.body.classList.toggle('hc', !!s.highContrast);
    var rm = reducedMotion();
    document.body.classList.toggle('rm', rm);
    O.setReducedMotion(rm);
    var sb = $('btn-sound');
    sb.setAttribute('aria-pressed', s.sound ? 'true' : 'false');
    sb.setAttribute('aria-label', s.sound ? 'Turn sound off' : 'Turn sound on');
  }
  function syncSettingsUI() {
    $('set-sound').checked = !!store.settings.sound;
    $('set-motion').checked = reducedMotion();
    $('set-speed').checked = !!store.settings.speedBonus;
    $('set-contrast').checked = !!store.settings.highContrast;
    $('storage-note').hidden = D.storageWorks();
  }
  function setSound(on) {
    store.settings.sound = !!on;
    var ok = A.setEnabled(on);
    if (on && !ok) store.settings.sound = false;
    if (on) A.setDepth(O.getTarget());
    save(); applySettings();
  }

  /* ------------------------------------------------------------- fx */
  function legendaryFx() {
    A.legendary();
    var fx = $('legendary-fx'), dim = $('dim');
    fx.innerHTML = '';
    if (!reducedMotion()) {
      for (var i = 0; i < 18; i++) {
        var s = document.createElement('span');
        s.className = 'sparkle';
        s.style.left = (30 + Math.random() * 40) + '%';
        s.style.top = (35 + Math.random() * 30) + '%';
        s.style.animationDelay = (Math.random() * 0.6) + 's';
        fx.appendChild(s);
      }
    }
    fx.classList.remove('on'); void fx.offsetWidth; fx.classList.add('on');
    dim.classList.add('on');
    setTimeout(function () { dim.classList.remove('on'); }, 1400);
    setTimeout(function () { fx.classList.remove('on'); fx.innerHTML = ''; }, 2500);
  }

  /* ------------------------------------------------------------- gauge */
  var gaugeMarker, gaugeLabel, depthNum, zoneName, lastZone = null, lastShown = -1, gaugeTicks = [];
  function buildGauge() {
    var bar = $('gauge-bar');
    bar.innerHTML = O.ZONES.map(function (z) {
      var pct = (z.max - z.min) / O.MAX_DEPTH * 100;
      return '<div class="band" style="height:' + pct + '%;background:linear-gradient(' + z.top + ',' + z.bottom + ')"></div>';
    }).join('');
    var g = $('gauge');
    [0, 1000, 4000, 6000, 7000].forEach(function (m) {
      var t = document.createElement('span');
      t.className = 'gauge-tick';
      t.style.top = (m / O.MAX_DEPTH * 100) + '%';
      t.textContent = fmtM(m) + ' m';
      g.appendChild(t);
      gaugeTicks.push({ el: t, m: m });
    });
    gaugeMarker = $('gauge-marker'); gaugeLabel = $('gauge-label');
    depthNum = $('depth-num'); zoneName = $('zone-name');
  }
  function onOceanFrame(d) {
    var shown = Math.round(d / 10) * 10;
    if (shown !== lastShown) {
      lastShown = shown;
      gaugeMarker.style.top = (d / O.MAX_DEPTH * 100) + '%';
      for (var ti = 0; ti < gaugeTicks.length; ti++) gaugeTicks[ti].el.classList.toggle('near', Math.abs(gaugeTicks[ti].m - d) < 260);
      gaugeLabel.textContent = fmtM(shown) + ' m';
      depthNum.textContent = fmtM(shown);
    }
    var z = O.zoneFor(d);
    if (z.key !== lastZone) {
      lastZone = z.key;
      document.body.setAttribute('data-zone', z.key);
      zoneName.textContent = z.name;
    }
  }

  /* ------------------------------------------------------------- countdown */
  function updateCountdowns() {
    var ms = D.msUntilNextDive(new Date());
    var txt = formatCountdown(ms);
    document.querySelectorAll('[data-countdown]').forEach(function (el) { el.textContent = txt; });
  }
  var lastDiveSeen = null;
  function everySecond() {
    updateCountdowns();
    var dive = currentDive();
    if (lastDiveSeen !== null && dive !== lastDiveSeen) {
      if (store.today && store.today.dive !== dive && S.mode !== 'daily') { store.today = null; save(); }
      if (document.body.getAttribute('data-screen') === 'title') renderTitle();
    }
    lastDiveSeen = dive;
  }

  /* ------------------------------------------------------------- viewport */
  function fitViewport() {
    var vv = window.visualViewport;
    var h = vv ? vv.height : window.innerHeight;
    document.documentElement.style.setProperty('--app-h', Math.round(h) + 'px');
  }

  /* ------------------------------------------------------------- debug */
  function buildDebug() {
    var el = $('debug-panel');
    el.hidden = false;
    el.innerHTML =
      '<h4>Undertow debug</h4>' +
      '<div class="row">Dive # <input type="number" id="dbg-dive" min="1" value="' + currentDive() + '"><button type="button" id="dbg-load">Load</button><button type="button" id="dbg-today">Today</button></div>' +
      '<div class="row"><label><input type="checkbox" id="dbg-skip"> Skip timers</label></div>' +
      '<div>Depth <span id="dbg-depth-v">0</span> m<input type="range" id="dbg-depth" min="0" max="7000" step="50" value="0"></div>' +
      '<div class="row"><button type="button" data-d="100">Sunlight</button><button type="button" data-d="600">Twilight</button><button type="button" data-d="2500">Midnight</button><button type="button" data-d="5000">Abyssal</button><button type="button" data-d="6500">Hadal</button><button type="button" data-d="7000">Floor</button></div>' +
      '<div class="row"><button type="button" id="dbg-legend">Leviathan FX</button><button type="button" id="dbg-answers">Show answers</button><button type="button" id="dbg-hide">Hide</button></div>' +
      '<div class="row"><button type="button" id="dbg-reset">Erase saved data</button></div>' +
      '<pre id="dbg-out"></pre>';
    $('dbg-load').onclick = function () { S.debugDive = Math.max(1, parseInt($('dbg-dive').value, 10) || 1); goTitleForce(); };
    $('dbg-today').onclick = function () { S.debugDive = null; $('dbg-dive').value = currentDive(); goTitleForce(); };
    $('dbg-skip').onchange = function (e) { S.skipTimers = e.target.checked; };
    $('dbg-depth').oninput = function (e) { var v = +e.target.value; $('dbg-depth-v').textContent = v; O.setDepth(v, { instant: true }); };
    el.querySelectorAll('[data-d]').forEach(function (b) { b.onclick = function () { var v = +b.getAttribute('data-d'); $('dbg-depth').value = v; $('dbg-depth-v').textContent = v; O.setDepth(v); }; });
    $('dbg-legend').onclick = legendaryFx;
    $('dbg-answers').onclick = function () {
      var p = S.prompts[S.idx];
      $('dbg-out').textContent = p && document.body.getAttribute('data-screen') === 'round'
        ? Object.keys(TIERS).map(function (t) { return t + ': ' + p.answers.filter(function (a) { return a.tier === t; }).map(function (a) { return a.text; }).join(', '); }).join('\n')
        : 'Start a round first.';
    };
    $('dbg-hide').onclick = function () { el.hidden = true; };
    $('dbg-reset').onclick = function () { store = D.clear(); applySettings(); goTitleForce(); $('dbg-out').textContent = 'Saved data erased.'; };
  }
  function goTitleForce() { S.phase = 'idle'; goTitle(); }

  /* ------------------------------------------------------------- events */
  function onAction(act, btn) {
    if (act === 'daily') startDaily();
    else if (act === 'practice') startPractice();
    else if (act === 'help') openModal('modal-help');
    else if (act === 'mp') { if (UT.mp) UT.mp.open(); }
    else if (act === 'title') goTitleForce();
    else if (act === 'view') { var r = store.results[currentDive()]; if (r) showResults(r, 'daily', currentDive()); }
    else if (act === 'share') {
      var res = S.result && S.mode === 'daily' ? S.result : store.results[currentDive()];
      if (res) share(res, btn);
    }
  }

  function bind() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-act]');
      if (t) { onAction(t.getAttribute('data-act'), t); return; }
      var rv = e.target.closest('[data-reveal]');
      if (rv) {
        var txt = rv.nextElementSibling;
        txt.hidden = !txt.hidden;
        rv.textContent = txt.hidden ? rv.textContent.replace('Hide', 'Show') : rv.textContent.replace('Show', 'Hide');
        return;
      }
      if (e.target.closest('[data-close]')) { closeModals(); return; }
      if (e.target.classList && e.target.classList.contains('modal-backdrop')) closeModals();
    });
    $('answer-form').addEventListener('submit', submit);
    $('answer-input').addEventListener('input', function () {
      var fb = $('feedback');
      if (fb.classList.contains('bad')) { fb.textContent = ''; fb.className = 'feedback'; }
    });
    $('answer-input').addEventListener('focus', function () {
      setTimeout(function () {
        var card = $('prompt-card');
        var r = card.getBoundingClientRect();
        if (r.bottom > window.innerHeight || r.top < 0) card.scrollIntoView({ block: 'end', behavior: reducedMotion() ? 'auto' : 'smooth' });
      }, 320);
    });
    $('btn-next').addEventListener('click', next);
    $('brand-btn').addEventListener('click', function () {
      var scr = document.body.getAttribute('data-screen');
      if (scr === 'title' || scr === 'results') goTitleForce();
    });
    $('btn-help').addEventListener('click', function () { openModal('modal-help'); });
    $('btn-stats').addEventListener('click', function () { openModal('modal-stats'); });
    $('btn-settings').addEventListener('click', function () { openModal('modal-settings'); });
    $('btn-sound').addEventListener('click', function () { setSound(!store.settings.sound); });

    $('set-sound').addEventListener('change', function (e) { setSound(e.target.checked); });
    $('set-motion').addEventListener('change', function (e) { store.settings.reducedMotion = e.target.checked; save(); applySettings(); });
    $('set-speed').addEventListener('change', function (e) { store.settings.speedBonus = e.target.checked; save(); });
    $('set-contrast').addEventListener('change', function (e) { store.settings.highContrast = e.target.checked; save(); applySettings(); });

    var resetArmed = false, resetTimer;
    $('btn-reset').addEventListener('click', function () {
      var note = $('reset-note');
      if (!resetArmed) {
        resetArmed = true;
        this.textContent = 'Tap again to erase everything';
        note.hidden = false; note.textContent = 'This removes your streak, stats, and today’s progress on this device.';
        var b = this;
        resetTimer = setTimeout(function () { resetArmed = false; b.textContent = 'Erase all saved dives'; note.hidden = true; }, 4000);
        return;
      }
      clearTimeout(resetTimer);
      resetArmed = false;
      store = D.clear();
      store.seenHelp = true;
      save();
      this.textContent = 'Erase all saved dives';
      note.textContent = 'Saved dives erased.';
      applySettings(); syncSettingsUI();
      if (S.phase === 'idle' || S.phase === 'done') goTitleForce();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (closeModals()) e.preventDefault(); return; }
      if (e.key === 'Enter' && S.phase === 'roundResult' && S.mode !== 'mp' && !document.querySelector('.modal-backdrop:not([hidden])')) {
        if (document.activeElement && document.activeElement.id === 'btn-next') return; // the button handles it
        e.preventDefault(); next();
      }
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', fitViewport);
      window.visualViewport.addEventListener('scroll', fitViewport);
    }
    window.addEventListener('resize', fitViewport);
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.addEventListener) mq.addEventListener('change', applySettings);
    }
  }

  /* ------------------------------------------------------------- boot */
  function boot() {
    srEl = $('sr-live'); toastEl = $('toast');
    fitViewport();
    buildGauge();
    buildTierKey();
    O.init($('ocean'));
    O.onFrame(onOceanFrame);
    applySettings();
    // Sound needs a user gesture; restore the saved choice on the first interaction.
    if (store.settings.sound) {
      store.settings.sound = false; applySettings();
      var resume = function () { document.removeEventListener('pointerdown', resume); document.removeEventListener('keydown', resume); setSound(true); };
      document.addEventListener('pointerdown', resume);
      document.addEventListener('keydown', resume);
    }
    var dive = currentDive();
    if (store.today && store.today.dive !== dive) { store.today = null; save(); }
    var done = store.results[dive];
    O.setDepth(done ? done.depth : 0, { instant: true });
    bind();
    renderTitle();
    showScreen('title');
    lastDiveSeen = dive;
    setInterval(tick, 100);
    setInterval(everySecond, 1000);
    if (UT.mp) UT.mp.init(bridge);
    if (DEBUG) buildDebug();
    if (!store.seenHelp) { store.seenHelp = true; save(); setTimeout(function () { openModal('modal-help'); }, 600); }
  }

  var bridge = {
    startMpRound: function (prompts, idx, rounds) {
      clearBeat();
      S.mode = 'mp';
      S.dive = 0;
      S.prompts = prompts;
      S.rounds = rounds.slice(0, idx);
      S.idx = idx;
      O.setDepth(depthFor(sumPoints(S.rounds)));
      startRound();
    },
    forceTimeout: function () { if (S.phase === 'reveal' || S.phase === 'answering') timeout(); },
    phaseActive: function () { return S.phase === 'reveal' || S.phase === 'answering'; },
    abort: function () { clearBeat(); S.phase = 'idle'; S.mode = null; goTitle(); },
    showScreen: showScreen,
    screen: function () { return document.body.getAttribute('data-screen'); },
    setDepth: function (m) { O.setDepth(m); A.setDepth(m); },
    toast: function (m, ms) { toast(m, ms); }
  };

  UT.game = { state: S, getStore: function () { return store; }, shareText: shareText };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.UT = window.UT || {});
