/*
 * Undertow daily schedule and saved data.
 *
 * - A new dive opens at midnight America/New_York, whatever the player's time zone.
 * - Dive #1 was 2026-01-01. The dive number counts days since then.
 * - Today's 7 prompts come from one fixed seeded order of every prompt, read 7 a day
 *   and looped, so every player gets the same set without a server and no prompt
 *   comes back sooner than floor(pool / 7) days.
 * - Everything the game remembers lives in one localStorage key, and every access is
 *   wrapped so the game still runs when storage is blocked.
 */
(function (UT) {
  'use strict';

  var TZ = 'America/New_York';
  var LAUNCH = { y: 2026, m: 1, d: 1 };
  var STORAGE_KEY = 'undertow.v1';
  var ROUNDS = 7;

  var fmt = null;
  function nyParts(date) {
    date = date || new Date();
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
      });
    }
    var o = {};
    fmt.formatToParts(date).forEach(function (p) { if (p.type !== 'literal') o[p.type] = parseInt(p.value, 10); });
    if (o.hour === 24) o.hour = 0;
    return o;
  }

  function diveNumberFor(date) {
    var p = nyParts(date);
    var day = Date.UTC(p.year, p.month - 1, p.day);
    var launch = Date.UTC(LAUNCH.y, LAUNCH.m - 1, LAUNCH.d);
    return Math.floor((day - launch) / 86400000) + 1;
  }

  // Calendar date (in New York) of a dive number, for display.
  function dateForDive(n) {
    var t = Date.UTC(LAUNCH.y, LAUNCH.m - 1, LAUNCH.d) + (n - 1) * 86400000;
    return new Date(t + 12 * 3600000); // noon UTC keeps the same calendar day everywhere in the Americas
  }

  function formatDiveDate(n) {
    return dateForDive(n).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
  }

  function msUntilNextDive(date) {
    date = date || new Date();
    var p = nyParts(date);
    var secs = p.hour * 3600 + p.minute * 60 + p.second;
    return Math.max(0, (86400 - secs) * 1000 - date.getMilliseconds());
  }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rand) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // All prompt ids in one fixed seeded order, read 7 a day and looped forever.
  // A prompt at stream position x comes back at x + N, so it can't repeat
  // sooner than floor(N / 7) days (N = pool size; 210+ prompts gives 30+ days).
  function promptsForDive(dive, pool) {
    var ids = pool.map(function (p) { return p.id; }).sort();
    var order = shuffle(ids, mulberry32(0x5eed1e55));
    var n = order.length;
    var start = (((dive - 1) * ROUNDS) % n + n) % n;
    var byId = {};
    pool.forEach(function (p) { byId[p.id] = p; });
    var chosen = [];
    for (var i = 0; i < Math.min(ROUNDS, n); i++) chosen.push(byId[order[(start + i) % n]]);
    return chosen;
  }

  // Fewest days before any prompt can come back.
  function repeatGapDays(pool) { return Math.floor(pool.length / ROUNDS); }

  function randomPrompts(pool, n) {
    return shuffle(pool, Math.random).slice(0, n || ROUNDS);
  }

  /* ---------------------------------------------------------------- storage */

  function defaults() {
    return {
      settings: { sound: false, reducedMotion: null, speedBonus: false, highContrast: false },
      stats: {
        played: 0, streak: 0, bestStreak: 0, lastDive: 0, deepest: 0, totalDepth: 0,
        legendary: 0, tiers: { common: 0, uncommon: 0, rare: 0, deep: 0, legendary: 0, miss: 0 },
        zones: { sunlight: 0, twilight: 0, midnight: 0, abyssal: 0, hadal: 0 }
      },
      results: {},
      today: null,
      seenHelp: false
    };
  }

  function merge(base, saved) {
    if (!saved || typeof saved !== 'object') return base;
    Object.keys(saved).forEach(function (k) {
      if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && saved[k] && typeof saved[k] === 'object') {
        base[k] = merge(base[k], saved[k]);
      } else {
        base[k] = saved[k];
      }
    });
    return base;
  }

  var storageOk = true;
  function load() {
    var data = defaults();
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) data = merge(data, JSON.parse(raw));
    } catch (e) { storageOk = false; }
    return data;
  }

  function save(data) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); storageOk = true; }
    catch (e) { storageOk = false; }
  }

  function clear() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    return defaults();
  }

  UT.daily = {
    ROUNDS: ROUNDS,
    nyParts: nyParts,
    diveNumberFor: diveNumberFor,
    formatDiveDate: formatDiveDate,
    msUntilNextDive: msUntilNextDive,
    mulberry32: mulberry32,
    promptsForDive: promptsForDive,
    repeatGapDays: repeatGapDays,
    randomPrompts: randomPrompts,
    load: load,
    save: save,
    clear: clear,
    defaults: defaults,
    storageWorks: function () { return storageOk; }
  };
})(window.UT = window.UT || {});
