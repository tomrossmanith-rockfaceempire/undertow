/*
 * Undertow sound: everything is synthesized with the Web Audio API, no files.
 * Muted by default. The audio context is created on the first user gesture that
 * turns sound on, since browsers block audio before an interaction.
 */
(function (UT) {
  'use strict';

  var ctx = null, master = null, sfx = null, drone = null;
  var enabled = false, depth = 0;

  function ensure() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { return null; }
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    sfx = ctx.createGain();
    sfx.gain.value = 0.8;
    sfx.connect(master);
    buildDrone();
    return ctx;
  }

  function buildDrone() {
    var out = ctx.createGain();
    out.gain.value = 0.05;
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.6;

    var o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = 55;
    var o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = 82.4;
    var g2 = ctx.createGain(); g2.gain.value = 0.3;
    o1.connect(filter);
    o2.connect(g2); g2.connect(filter);

    // Soft filtered noise for the wash of water.
    var len = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    var last = 0;
    for (var i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; data[i] = last * 3.5; }
    var noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
    var ng = ctx.createGain(); ng.gain.value = 0.6;
    noise.connect(ng); ng.connect(filter);

    // Slow swell on the filter, like a current.
    var lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    var lfoGain = ctx.createGain(); lfoGain.gain.value = 140;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency);

    filter.connect(out); out.connect(master);
    o1.start(); o2.start(); noise.start(); lfo.start();
    drone = { o1: o1, o2: o2, filter: filter };
    applyDepth();
  }

  function applyDepth() {
    if (!drone) return;
    var k = Math.min(1, Math.max(0, depth / 7000));
    var t = ctx.currentTime;
    drone.o1.frequency.setTargetAtTime(55 - 22 * k, t, 1.2);
    drone.o2.frequency.setTargetAtTime(82.4 - 33 * k, t, 1.2);
    drone.filter.frequency.setTargetAtTime(950 - 760 * k, t, 1.2);
  }

  function tone(opts) {
    if (!enabled || !ctx) return;
    var t0 = ctx.currentTime + (opts.delay || 0);
    var osc = ctx.createOscillator();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t0 + (opts.sweep || opts.dur * 0.6));
    var g = ctx.createGain();
    var peak = opts.gain || 0.2;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + (opts.attack || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur);
    osc.connect(g); g.connect(sfx);
    osc.start(t0); osc.stop(t0 + opts.dur + 0.05);
  }

  var TIER_BASE = { common: 700, uncommon: 560, rare: 440, deep: 330, legendary: 220 };

  var api = {
    setEnabled: function (on) {
      enabled = !!on;
      if (enabled) {
        if (!ensure()) { enabled = false; return false; }
        if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
        master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.4);
      } else if (ctx) {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
      }
      return enabled;
    },
    isEnabled: function () { return enabled; },
    setDepth: function (d) { depth = d; if (ctx) applyDepth(); },

    // Accepted answer: a bubble whose pitch drops as the tier gets rarer.
    bloop: function (tier) {
      var f = TIER_BASE[tier] || 600;
      tone({ freq: f, to: f * 1.7, dur: 0.28, sweep: 0.12, gain: 0.22 });
      tone({ freq: f * 1.25, to: f * 2.1, dur: 0.22, sweep: 0.1, gain: 0.12, delay: 0.09 });
      if (tier === 'deep' || tier === 'legendary') tone({ freq: f / 2, dur: 0.9, gain: 0.12, attack: 0.04 });
    },
    // Rejected answer: a soft muffled thud.
    thud: function () {
      tone({ freq: 150, to: 60, dur: 0.22, sweep: 0.18, gain: 0.3 });
    },
    // Last five seconds.
    tick: function () {
      tone({ freq: 1500, dur: 0.05, type: 'triangle', gain: 0.05 });
    },
    // New zone: a sonar ping with an echo.
    ping: function () {
      tone({ freq: 1320, dur: 1.4, gain: 0.12, attack: 0.005 });
      tone({ freq: 1320, dur: 1.2, gain: 0.04, attack: 0.005, delay: 0.38 });
    },
    // Leviathan: a slow, low chord with a shimmer on top.
    legendary: function () {
      [110, 164.8, 220, 277.2].forEach(function (f, i) {
        tone({ freq: f, dur: 2.6, gain: 0.08, attack: 0.25, delay: i * 0.06 });
      });
      [1760, 2217, 2637].forEach(function (f, i) {
        tone({ freq: f, dur: 0.9, gain: 0.025, attack: 0.02, delay: 0.3 + i * 0.12, type: 'triangle' });
      });
    },
    timeout: function () {
      tone({ freq: 330, to: 165, dur: 0.6, sweep: 0.5, gain: 0.15, type: 'triangle' });
    }
  };

  UT.audio = api;
})(window.UT = window.UT || {});
