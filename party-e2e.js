// Party-mode end-to-end test (needs Playwright).
//   Server path:   node server.js, then: node tests/party-e2e.js http://localhost:8080/ /tmp/shots
//   Artifact path: node tests/party-e2e.js file://$PWD/index.html /tmp/shots fake
// Party mode end-to-end: host (playing) + 2 players, each in its own browser context.
const { chromium } = require('playwright');
const URL = process.argv[2], OUT = process.argv[3], FAKE = process.argv[4] === 'fake';
// Fake claude.use('room') over BroadcastChannel, to exercise the artifact code path.
const fakeClaude = () => {
  const peerId = Math.random().toString(36).slice(2, 10);
  const rooms = {};
  function makeRoom(name) {
    const bc = new BroadcastChannel('fake-room-' + name);
    let me = {}; const others = new Map(); const fns = []; const connFns = [];
    function snapshot() {
      const peers = [{ peer: peerId, by: null, isMe: true, sameTab: true, kind: 'viewer', guest: false, presence: me, updatedAt: Date.now() }];
      for (const [id, p] of others) peers.push({ peer: id, by: null, isMe: false, sameTab: false, kind: 'viewer', guest: false, presence: p, updatedAt: Date.now() });
      return peers;
    }
    function emit() { const s = snapshot(); fns.forEach(f => f({ peers: s, joined: [], left: [], updated: [] })); }
    bc.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'p') { others.set(m.id, m.presence); emit(); }
      if (m.type === 'hello') bc.postMessage({ type: 'p', id: peerId, presence: me });
      if (m.type === 'bye') { others.delete(m.id); emit(); }
    };
    bc.postMessage({ type: 'hello' });
    addEventListener('pagehide', () => bc.postMessage({ type: 'bye', id: peerId }));
    return {
      name,
      presence(patch) { me = Object.assign({}, me, patch); bc.postMessage({ type: 'p', id: peerId, presence: me }); emit(); return Promise.resolve(); },
      onPeers(fn) { fns.push(fn); setTimeout(emit, 0); return () => {}; },
      onConnection(fn) { setTimeout(() => fn(true), 0); return () => {}; },
      leave() { bc.postMessage({ type: 'bye', id: peerId }); bc.close(); return Promise.resolve(); },
    };
  }
  const room = { join: (n) => Promise.resolve(rooms[n] || (rooms[n] = makeRoom(n))) };
  window.claude = { use: (name) => Promise.resolve(name === 'room' ? room : null) };
};

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  async function open(label, w, h) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    if (FAKE) await ctx.addInitScript(fakeClaude);
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(label + ': ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(label + ' console: ' + m.text()); });
    await page.goto(URL);
    await page.waitForTimeout(700);
    await page.keyboard.press('Escape');
    return page;
  }
  // FAKE mode uses one context so BroadcastChannel spans pages
  let host, p1, p2;
  if (FAKE) {
    const ctx = await browser.newContext({ viewport: { width: 1100, height: 820 }, deviceScaleFactor: 1 });
    await ctx.addInitScript(fakeClaude);
    const mk = async (l) => { const pg = await ctx.newPage(); pg.on('pageerror', e => errors.push(l + ': ' + e.message)); await pg.goto(URL); await pg.waitForTimeout(700); await pg.keyboard.press('Escape'); return pg; };
    host = await mk('host'); p1 = await mk('p1'); p2 = await mk('p2');
  } else {
    host = await open('host', 1100, 820); p1 = await open('p1', 390, 800); p2 = await open('p2', 390, 800);
  }
  async function setup(page, nick) {
    await page.click('[data-act="mp"]');
    await page.waitForSelector('#mp-setup:not([hidden])', { timeout: 8000 });
    await page.fill('#mp-nick', nick);
  }
  await setup(host, 'Ms. Rivera');
  await host.click('[data-mp="host"]');
  await host.waitForSelector('#mp-code-big');
  const code = await host.textContent('#mp-code-big');
  console.log('room code', code);
  for (const [pg, n] of [[p1, 'Ava'], [p2, 'Jordan']]) {
    await setup(pg, n);
    await pg.fill('#mp-code', code.toLowerCase());
    await pg.click('#mp-join-form button');
  }
  await host.waitForFunction(() => document.querySelectorAll('#mp-list .mp-row').length === 3, null, { timeout: 8000 });
  await p1.waitForSelector('#mp-wait-host');
  await host.screenshot({ path: OUT + '/mp-01-host-lobby.png' });
  await p1.screenshot({ path: OUT + '/mp-02-player-lobby.png' });
  await host.click('#mp-start');

  const plan = { host: ['legendary', 'common', 'rare', 'deep', 'legendary', 'common', 'uncommon'],
                 p1: ['rare', 'legendary', 'miss', 'common', 'deep', 'legendary', 'legendary'],
                 p2: ['common', 'common', 'common', 'common', 'common', 'common', 'common'] };
  const expectPts = { common: 10, uncommon: 35, rare: 60, deep: 85, legendary: 100, miss: 0 };
  async function answer(pg, tier) {
    await pg.waitForFunction(() => UT.game.state.mode === 'mp' && UT.game.state.phase === 'answering', null, { timeout: 15000 });
    if (tier === 'miss') return;
    const txt = await pg.evaluate((t) => { const p = UT.game.state.prompts[UT.game.state.idx]; return (p.answers.find(a => a.tier === t) || p.answers[0]).text; }, tier);
    await pg.fill('#answer-input', txt);
    await pg.press('#answer-input', 'Enter');
  }
  for (let r = 0; r < 7; r++) {
    await Promise.all([answer(host, plan.host[r]), answer(p1, plan.p1[r]), answer(p2, plan.p2[r])]);
    if (r === 0) { await p2.waitForTimeout(300); await p2.screenshot({ path: OUT + '/mp-03-player-waiting.png' }); }
    if (plan.p1[r] === 'miss') {
      // speed up p1's timeout
      await p1.evaluate(() => { UT.game.state.phaseStart -= 19500; });
    }
    await host.waitForSelector('[data-mp="next"]', { timeout: 30000 });
    await p1.waitForSelector('.mp-standings', { timeout: 10000 });
    if (r === 0) { await host.waitForTimeout(600); await host.screenshot({ path: OUT + '/mp-04-host-standings.png' }); await p1.screenshot({ path: OUT + '/mp-05-player-standings.png' }); }
    await host.click('[data-mp="next"]');
  }
  await host.waitForSelector('#mp-podium', { timeout: 10000 });
  await p1.waitForSelector('#mp-podium', { timeout: 10000 });
  await host.waitForTimeout(1500);
  await host.screenshot({ path: OUT + '/mp-06-host-final.png' });
  await p2.screenshot({ path: OUT + '/mp-07-player-final.png' });
  const lists = await Promise.all([host, p1, p2].map(pg => pg.$$eval('#mp-list .mp-row', rows => rows.map(r => r.querySelector('.mp-name').childNodes[0].textContent.trim() + '=' + r.querySelector('.mp-depth').textContent))));
  console.log('final standings per device:'); lists.forEach(l => console.log('  ', l.join(' | ')));
  const exp = Object.fromEntries(Object.entries(plan).map(([k, v]) => [k, v.reduce((n, t) => n + expectPts[t], 0) * 10]));
  console.log('expected depths', JSON.stringify(exp));

  // Play again, host-only (watching) mode, then a player leaves
  await host.click('[data-mp="again"]');
  await p1.waitForSelector('#mp-wait-host', { timeout: 8000 });
  await host.click('#mp-plays');
  await host.waitForTimeout(300);
  const lobbyCount = await host.textContent('#mp-count');
  console.log('after host stops playing:', lobbyCount);
  await host.click('#mp-start');
  await Promise.all([answer(p1, 'legendary'), answer(p2, 'deep')]);
  await host.waitForTimeout(200);
  await host.screenshot({ path: OUT + '/mp-08-host-only-round.png' });
  console.log('host-only mode stays off the round screen:', await host.evaluate(() => document.body.getAttribute('data-screen')));
  await p2.click('[data-mp="leave"]').catch(() => {});
  await p1.waitForSelector('.mp-standings', { timeout: 10000 });
  // player leaves via going back to title from standings
  await p1.click('[data-mp="leave"]');
  await p1.waitForTimeout(500);
  console.log('p1 after leaving:', await p1.evaluate(() => document.body.getAttribute('data-screen')));
  await host.waitForTimeout(1500);
  console.log('host divers after p1 left:', await host.$$eval('#mp-list .mp-row', r => r.length));
  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})().catch(e => { console.error('TEST FAILED', e); process.exit(1); });
