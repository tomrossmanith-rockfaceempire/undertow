// Runs the data checks and validator tests in Node: node tests/run-node.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { window: {}, console, Intl, Date, Math };
ctx.window = ctx;
vm.createContext(ctx);
const extra = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(path.join(root, 'js')).filter(f => /^prompts-.+\.js$/.test(f)).sort().map(f => 'js/' + f);
for (const f of ['js/prompts.js', ...extra, 'js/validate.js', 'js/daily.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
const UT = ctx.UT;
let failures = 0, passes = 0;
function ok(cond, msg) { if (cond) passes++; else { failures++; console.log('FAIL', msg); } }

/* ---------- data integrity ---------- */
const ids = new Set();
const promptTexts = new Map();
for (const p of UT.PROMPTS) {
  const norm = p.prompt.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  ok(!promptTexts.has(norm), 'duplicate prompt text: ' + p.prompt + ' (' + p.id + ' and ' + promptTexts.get(norm) + ')');
  promptTexts.set(norm, p.id);
  ok(typeof p.category === 'string' && p.category.length > 0, p.id + ' needs a category');
  ok(p.answers.length >= 6, p.id + ' has only ' + p.answers.length + ' answers');
  ok(!ids.has(p.id), 'duplicate id ' + p.id); ids.add(p.id);
  const tiers = new Set(p.answers.map(a => a.tier));
  ok(tiers.has('legendary'), p.id + ' has no legendary answer');
  ok(tiers.size >= 3, p.id + ' has fewer than 3 tiers');
  // every note key must name a real answer
  for (const k of Object.keys(p._notes)) ok(p.answers.some(a => a.text === k), p.id + ': note for unknown answer "' + k + '"');
  // no normalized form should belong to two answers
  const seen = new Map();
  for (const a of p.answers) {
    for (const f of [a.text, ...a.aliases]) {
      const k = UT.validate.key(f, p);
      if (seen.has(k) && seen.get(k) !== a.text) ok(false, p.id + ': "' + k + '" used by "' + seen.get(k) + '" and "' + a.text + '"');
      seen.set(k, a.text);
    }
  }
  // every answer must accept its own text
  for (const a of p.answers) {
    const r = UT.validate.check(p, a.text);
    ok(r.status === 'accepted' && r.answer.text === a.text, p.id + ': "' + a.text + '" does not accept itself (' + r.status + (r.answer ? ' as ' + r.answer.text : '') + ')');
    for (const al of a.aliases) {
      const r2 = UT.validate.check(p, al);
      ok(r2.status === 'accepted' && r2.answer.text === a.text, p.id + ': alias "' + al + '" -> ' + (r2.answer ? r2.answer.text : r2.status));
    }
  }
  // no reject word should be shadowed by an answer
  for (const rj of p.reject) for (const w of rj.words) {
    const r = UT.validate.check(p, w);
    ok(r.status === 'rejected', p.id + ': reject word "' + w + '" is accepted as ' + (r.answer && r.answer.text));
  }
}
const byId = Object.fromEntries(UT.PROMPTS.map(p => [p.id, p]));
const count = id => byId[id].answers.length;
ok(UT.PROMPTS.length >= 40, 'need 40+ prompts, have ' + UT.PROMPTS.length);
ok(count('us-states-canada') === 13, 'Canada border states should be 13');
ok(count('state-capitals') === 50, 'state capitals should be 50, got ' + count('state-capitals'));
ok(count('africa') === 54, 'African countries should be 54, got ' + count('africa'));
ok(count('constellations') === 88, 'constellations should be 88, got ' + count('constellations'));
ok(count('national-parks') === 63, 'national parks should be 63, got ' + count('national-parks'));
ok(count('presidents') === 45, 'presidents should be 45 people, got ' + count('presidents'));
ok(count('mohs') === 10, 'Mohs should be 10');
ok(count('single-letter-elements') === 14, 'single-letter elements should be 14');
ok(count('ancient-wonders') === 7, 'ancient wonders should be 7');
ok(count('greek-letters') >= 24, 'greek letters');
ok(count('south-america') === 12, 'South America should be 12');
ok(count('caribbean') === 13, 'Caribbean should be 13');
ok(count('borders-china') === 14, 'China neighbors should be 14');
ok(count('borders-germany') === 9, 'Germany neighbors should be 9');
ok(count('euro') === 27, 'euro users (21 eurozone + 6 others) should be 27, got ' + count('euro'));

/* ---------- validator behaviour ---------- */
const V = UT.validate;
const acc = (id, input, expect) => {
  const r = V.check(byId[id], input);
  ok(r.status === 'accepted' && r.answer.text === expect, `[${id}] "${input}" -> expected ${expect}, got ${r.status}${r.answer ? ' ' + r.answer.text : ''} ${r.message || ''}`);
};
const rej = (id, input, msgPart) => {
  const r = V.check(byId[id], input);
  ok(r.status === 'rejected' && (!msgPart || (r.message || '').includes(msgPart)), `[${id}] "${input}" should be rejected${msgPart ? ' with "' + msgPart + '"' : ''}, got ${r.status} ${r.answer ? r.answer.text : ''} ${r.message || ''}`);
};

acc('us-states-canada', '  new   YORK ', 'New York');
acc('us-states-canada', 'Pensylvania', 'Pennsylvania');            // typo
acc('us-states-canada', 'the state of ohio'.replace('the state of ', ''), 'Ohio');
acc('countries-m', 'Burma', 'Myanmar');
rej('countries-m', 'malt', 'more than one');                       // close to Mali and Malta
acc('countries-m', 'Mali', 'Mali');
acc('single-letter-elements', 'W', 'Tungsten');
acc('single-letter-elements', 'sulphur', 'Sulfur');
acc('eight-legs', 'spiders', 'Spider');                            // plural
rej('eight-legs', 'octopus', 'arms, not legs');
rej('eight-legs', 'Octopi', 'arms, not legs');
rej('eight-legs', 'octapus', 'arms, not legs');                    // misspelled near-miss
acc('cheese', 'Gruyère', 'Gruyère');                          // accents
acc('cheese', 'gruyere cheese', 'Gruyère');                   // strip word
acc('cheese', 'blue', 'Blue cheese');
acc('cheese', 'mozarella', 'Mozzarella');
acc('shakespeare', 'Romeo & Juliet', 'Romeo and Juliet');
acc('shakespeare', "a midsummer night's dream", 'A Midsummer Night’s Dream');
acc('shakespeare', 'Henry V', 'Henry V');
acc('shakespeare', 'henry the fifth', 'Henry V');
acc('shakespeare', 'The Tempest', 'The Tempest');
rej('presidents', 'Roosevelt', 'Which Roosevelt');
rej('presidents', 'george bush', 'Which Bush');
acc('presidents', 'FDR', 'Franklin D. Roosevelt');
acc('presidents', 'John F. Kennedy', 'John F. Kennedy');
acc('presidents', 'john adams', 'John Adams');
acc('presidents', 'john quincy adams', 'John Quincy Adams');
acc('dinosaurs', 'T. rex', 'Tyrannosaurus rex');
rej('dinosaurs', 'pterodactyl', 'not dinosaurs');
acc('africa', "Côte d'Ivoire", 'Ivory Coast');
acc('africa', 'niger', 'Niger');
acc('africa', 'nigeria', 'Nigeria');
rej('africa', 'nigeri', 'more than one');
acc('seas', 'Pacific', 'Pacific Ocean');
acc('seas', 'the red sea', 'Red Sea');
acc('national-parks', 'Yellowstone National Park', 'Yellowstone');
acc('national-parks', 'haleakala', 'Haleakalā');
rej('three-letter-body', 'hand', 'exactly 3 letters');
acc('three-letter-body', 'EYE', 'Eye');
rej('state-capitals', 'state', 'part of the question');
rej('constellations', 'Big Dipper', 'asterism');
acc('constellations', 'scorpio', 'Scorpius');
acc('polygons', 'nine-sided nonagon'.split(' ')[1], 'Nonagon');
rej('polygons', 'circle', 'Curves');
acc('collective-nouns', 'murder', 'Murder');
ok(V.check(byId['us-states-canada'], '   ').status === 'empty', 'blank input is empty');
ok(V.distance('kitten', 'sitting') === 3, 'distance kitten/sitting');
ok(V.distance('ab', 'ba') === 1, 'transposition counts as 1');
acc('pasta', 'Bow ties', 'Farfalle');
acc('pasta', 'shell', 'Shells');
acc('cell-parts', 'mitochondrion', 'Mitochondria');
acc('greek-gods', 'Athene', 'Athena');
rej('greek-gods', 'Jupiter', 'Roman name');
acc('sea-invertebrates', "man o' war", 'Portuguese man o’ war');
rej('sea-invertebrates', 'shark', 'backbone');

/* ---------- daily schedule ---------- */
const D = UT.daily;
ok(D.diveNumberFor(new Date('2026-01-01T12:00:00Z')) === 1, 'Jan 1 2026 is dive 1');
ok(D.diveNumberFor(new Date('2026-01-02T04:59:00Z')) === 1, 'still dive 1 before NY midnight');
ok(D.diveNumberFor(new Date('2026-01-02T05:00:00Z')) === 2, 'dive 2 at NY midnight (EST)');
ok(D.diveNumberFor(new Date('2026-07-02T03:59:00Z')) === D.diveNumberFor(new Date('2026-07-01T12:00:00Z')), 'summer: still same dive before EDT midnight');
ok(D.diveNumberFor(new Date('2026-07-02T04:00:00Z')) === D.diveNumberFor(new Date('2026-07-01T12:00:00Z')) + 1, 'summer: next dive at EDT midnight');
const a = D.promptsForDive(42, UT.PROMPTS).map(p => p.id).join();
const b = D.promptsForDive(42, UT.PROMPTS.slice().reverse()).map(p => p.id).join();
ok(a === b, 'same dive gives same prompts regardless of pool order');
ok(new Set(D.promptsForDive(42, UT.PROMPTS).map(p => p.id)).size === 7, '7 distinct prompts');
// no prompt comes back sooner than floor(N / 7) days, checked over 3 years of dives
const gap = D.repeatGapDays(UT.PROMPTS);
const lastSeen = new Map();
let minGap = Infinity;
for (let d = 1; d <= 1100; d++) {
  const todays = D.promptsForDive(d, UT.PROMPTS);
  ok(new Set(todays.map(p => p.id)).size === 7, 'dive ' + d + ' has a duplicate prompt');
  for (const p of todays) {
    if (lastSeen.has(p.id)) minGap = Math.min(minGap, d - lastSeen.get(p.id));
    lastSeen.set(p.id, d);
  }
}
ok(minGap >= gap, 'a prompt repeated after ' + minGap + ' days; expected at least ' + gap);
if (UT.PROMPTS.length >= 210) ok(minGap >= 30, 'prompts repeat within 30 days (' + minGap + ')');
console.log('shortest gap before a prompt repeats: ' + minGap + ' days');

console.log(`\n${passes} passed, ${failures} failed · ${UT.PROMPTS.length} prompts · ${UT.PROMPTS.reduce((n, p) => n + p.answers.length, 0)} answers`);
process.exit(failures ? 1 : 0);
