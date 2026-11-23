/*
 * Undertow ocean renderer (canvas).
 *
 * Draws the water column behind the interface: depth-blended gradient, god rays,
 * bubbles, marine snow, bioluminescent sparks, drifting creatures, trench walls,
 * the seafloor, and the little bathysphere. All art is drawn in code.
 *
 * Public API (UT.ocean):
 *   init(canvas)              start rendering
 *   setDepth(m, {instant})    descend/ascend to a depth in meters (animated)
 *   getDepth()                current visual depth
 *   onFrame(fn)               fn(visualDepth) every frame
 *   setReducedMotion(bool)
 *   ZONES, zoneFor(m), MAX_DEPTH
 */
(function (UT) {
  'use strict';

  var MAX_DEPTH = 7000;
  var PX_PER_M = 0.55;

  var ZONES = [
    { key: 'sunlight', name: 'Sunlight Zone', min: 0, max: 200, top: '#7FE3F0', bottom: '#1BA6C9' },
    { key: 'twilight', name: 'Twilight Zone', min: 200, max: 1000, top: '#1477A8', bottom: '#0B3D6B' },
    { key: 'midnight', name: 'Midnight Zone', min: 1000, max: 4000, top: '#08254A', bottom: '#041530' },
    { key: 'abyssal', name: 'Abyssal Zone', min: 4000, max: 6000, top: '#030C1F', bottom: '#020713' },
    { key: 'hadal', name: 'Hadal Trench', min: 6000, max: 7000, top: '#01040C', bottom: '#000000' }
  ];

  function zoneFor(d) {
    for (var i = ZONES.length - 1; i >= 0; i--) if (d >= ZONES[i].min) return ZONES[i];
    return ZONES[0];
  }

  /* ------------------------------------------------------- OKLab blending */
  function hexToRgb(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
  function toLin(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function toSrgb(c) { return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; }
  function rgbToOklab(rgb) {
    var r = toLin(rgb[0]), g = toLin(rgb[1]), b = toLin(rgb[2]);
    var l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    var m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    var s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  function oklabToCss(lab) {
    var L = lab[0], a = lab[1], b = lab[2];
    var l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
    var m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
    var s = Math.pow(L - 0.0894841775 * a - 1.2914855480 * b, 3);
    var rgb = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s];
    return 'rgb(' + rgb.map(function (c) { return Math.round(Math.min(1, Math.max(0, toSrgb(Math.max(0, c)))) * 255); }).join(',') + ')';
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  // Color stops sit inside each zone so the blend happens across the boundaries.
  var STOPS = [
    [0, 0], [150, 0], [420, 1], [880, 1], [1700, 2], [3600, 2], [4500, 3], [5700, 3], [6300, 4], [7000, 4]
  ].map(function (s) {
    var z = ZONES[s[1]];
    return { d: s[0], top: rgbToOklab(hexToRgb(z.top)), bottom: rgbToOklab(hexToRgb(z.bottom)) };
  });

  function colorsAt(d) {
    d = clamp(d, 0, MAX_DEPTH);
    for (var i = 0; i < STOPS.length - 1; i++) {
      var a = STOPS[i], b = STOPS[i + 1];
      if (d <= b.d) {
        var t = (d - a.d) / ((b.d - a.d) || 1);
        t = t * t * (3 - 2 * t);
        return {
          top: oklabToCss([lerp(a.top[0], b.top[0], t), lerp(a.top[1], b.top[1], t), lerp(a.top[2], b.top[2], t)]),
          bottom: oklabToCss([lerp(a.bottom[0], b.bottom[0], t), lerp(a.bottom[1], b.bottom[1], t), lerp(a.bottom[2], b.bottom[2], t)])
        };
      }
    }
    var last = STOPS[STOPS.length - 1];
    return { top: oklabToCss(last.top), bottom: oklabToCss(last.bottom) };
  }

  /* ------------------------------------------------------------- state */
  var canvas, ctx, W = 0, H = 0, DPR = 1;
  var running = false, lastT = 0, time = 0;
  var reduced = false;
  var depth = 0, anim = null;
  var camY = 0;                // world scroll in px, follows depth
  var frameCbs = [];
  var particles = [];
  var creatures = [];
  var spawnTimer = 2;
  var walls = null;
  var puffs = [];
  var floorCelebrated = false;
  var sub = { x: -100, y: -100, r: 26, vy: 0, tilt: 0, init: false, alpha: 0 };
  var anchorEls = [];

  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    seedParticles();
    seedWalls();
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function seedParticles() {
    particles = [];
    var area = W * H;
    var nSnow = Math.round(area / 7000);
    var nBubble = Math.round(area / 26000);
    var nGlow = Math.round(area / 16000);
    for (var i = 0; i < nSnow; i++) particles.push({ kind: 'snow', x: rand(0, W), y: rand(0, H), r: rand(0.6, 1.8), layer: Math.floor(rand(0, 3)), ph: rand(0, 6.28), sp: rand(4, 12) });
    for (i = 0; i < nBubble; i++) particles.push({ kind: 'bubble', x: rand(0, W), y: rand(0, H), r: rand(1.5, 5), layer: Math.floor(rand(0, 3)), ph: rand(0, 6.28), sp: rand(18, 46) });
    for (i = 0; i < nGlow; i++) particles.push({ kind: 'glow', x: rand(0, W), y: rand(0, H), r: rand(1, 2.6), layer: Math.floor(rand(0, 3)), ph: rand(0, 6.28), sp: rand(2, 7), hue: [185, 170, 265, 195][i % 4] });
  }

  function seedWalls() {
    var n = 40;
    walls = { left: [], right: [], seg: Math.max(H / 10, 40) };
    for (var i = 0; i < n; i++) {
      walls.left.push(rand(0.55, 1));
      walls.right.push(rand(0.55, 1));
    }
  }

  var PARALLAX = [0.35, 0.65, 1];

  /* ---------------------------------------------------------- creatures */
  var TYPES = {
    fish: { zones: ['sunlight', 'twilight'], w: 3 },
    jelly: { zones: ['sunlight', 'twilight', 'midnight'], w: 2 },
    squid: { zones: ['twilight'], w: 2 },
    lantern: { zones: ['midnight', 'abyssal'], w: 3 },
    siphon: { zones: ['midnight', 'abyssal', 'hadal'], w: 1.5 },
    angler: { zones: ['abyssal', 'hadal'], w: 3 },
    giant: { zones: ['hadal'], w: 0.7 }
  };

  function spawnCreature(forceType) {
    var zk = zoneFor(depth).key;
    var type = forceType;
    if (!type) {
      var pool = [], total = 0;
      Object.keys(TYPES).forEach(function (k) {
        if (TYPES[k].zones.indexOf(zk) >= 0) { pool.push(k); total += TYPES[k].w; }
      });
      if (!pool.length) return;
      var r = Math.random() * total;
      for (var i = 0; i < pool.length; i++) { r -= TYPES[pool[i]].w; if (r <= 0) { type = pool[i]; break; } }
      type = type || pool[0];
    }
    if (type === 'giant' && creatures.some(function (c) { return c.type === 'giant'; })) return;
    var dir = Math.random() < 0.5 ? 1 : -1;
    var s = type === 'giant' ? rand(1.6, 2.2) : rand(0.7, 1.3) * Math.min(1.2, Math.max(0.75, W / 900));
    var margin = type === 'giant' ? 420 * s : 160 * s;
    var c = {
      type: type, dir: dir, s: s,
      x: dir > 0 ? -margin : W + margin,
      y: rand(H * 0.12, H * 0.88),
      vx: dir * (type === 'giant' ? rand(10, 16) : type === 'fish' ? rand(30, 55) : rand(10, 26)),
      ph: rand(0, 6.28), margin: margin,
      fish: null
    };
    if (type === 'fish') {
      c.fish = [];
      var n = Math.floor(rand(7, 14));
      for (var k = 0; k < n; k++) c.fish.push({ dx: rand(-60, 60), dy: rand(-28, 28), ph: rand(0, 6.28), sz: rand(0.7, 1.15) });
    }
    creatures.push(c);
  }

  function inkFor() {
    // Silhouette ink: a little darker than the water at this depth.
    var k = clamp(depth / 1200, 0, 1);
    return 'rgba(' + Math.round(lerp(10, 2, k)) + ',' + Math.round(lerp(52, 10, k)) + ',' + Math.round(lerp(78, 22, k)) + ',';
  }

  function glowDot(x, y, r, color, a) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    g.addColorStop(0, 'rgba(' + color + ',' + a + ')');
    g.addColorStop(0.35, 'rgba(' + color + ',' + a * 0.35 + ')');
    g.addColorStop(1, 'rgba(' + color + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 4, 0, Math.PI * 2); ctx.fill();
  }

  function drawFishShape(len, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, len, len * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-len * 0.85, 0);
    ctx.lineTo(-len * 1.55, -len * 0.42);
    ctx.lineTo(-len * 1.45, 0);
    ctx.lineTo(-len * 1.55, len * 0.42);
    ctx.closePath();
    ctx.fill();
  }

  function drawCreature(c, t) {
    var ink = inkFor();
    var deep = depth > 900;
    ctx.save();
    ctx.translate(c.x, c.y + Math.sin(t * 0.6 + c.ph) * 6);
    if (c.dir < 0 && c.type !== 'jelly' && c.type !== 'siphon') ctx.scale(-1, 1);
    ctx.scale(c.s, c.s);

    if (c.type === 'fish') {
      c.fish.forEach(function (f) {
        ctx.save();
        ctx.translate(f.dx + Math.sin(t * 1.3 + f.ph) * 3, f.dy + Math.cos(t * 1.1 + f.ph) * 2);
        ctx.rotate(Math.sin(t * 2 + f.ph) * 0.06);
        drawFishShape(9 * f.sz, ink + (deep ? 0.5 : 0.32) + ')');
        ctx.restore();
      });
    } else if (c.type === 'jelly') {
      var pulse = 1 + Math.sin(t * 2 + c.ph) * 0.08;
      var col = deep ? '170,140,255' : '255,190,230';
      ctx.globalAlpha = deep ? 0.75 : 0.5;
      if (deep) { ctx.globalCompositeOperation = 'lighter'; glowDot(0, 0, 6, col, 0.35); }
      ctx.fillStyle = 'rgba(' + col + ',0.35)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18 * pulse, 14 / pulse, 0, Math.PI, 0);
      ctx.quadraticCurveTo(10, 4, 0, 2);
      ctx.quadraticCurveTo(-10, 4, -18 * pulse, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(' + col + ',0.45)';
      ctx.lineWidth = 1.2;
      for (var i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 6, 2);
        for (var y = 0; y <= 40; y += 8) ctx.lineTo(i * 6 + Math.sin(t * 2.4 + y * 0.15 + i + c.ph) * 3, 2 + y);
        ctx.stroke();
      }
    } else if (c.type === 'squid') {
      ctx.fillStyle = 'rgba(232,128,128,0.32)';
      ctx.beginPath(); ctx.ellipse(0, 0, 26, 8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(34, -10); ctx.lineTo(34, 10); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(232,128,128,0.35)'; ctx.lineWidth = 1.4;
      for (var k = -3; k <= 3; k++) {
        ctx.beginPath(); ctx.moveTo(-24, k * 1.5);
        ctx.quadraticCurveTo(-38, k * 3 + Math.sin(t * 3 + k) * 3, -52 - Math.abs(k) * 2, k * 4 + Math.sin(t * 2 + k) * 4);
        ctx.stroke();
      }
    } else if (c.type === 'lantern') {
      drawFishShape(11, ink + '0.75)');
      ctx.globalCompositeOperation = 'lighter';
      for (var d = 0; d < 4; d++) {
        var tw = 0.5 + 0.5 * Math.sin(t * 3 + d + c.ph);
        glowDot(-6 + d * 4.5, 3, 0.9, '120,240,255', 0.5 + tw * 0.4);
      }
    } else if (c.type === 'angler') {
      ctx.fillStyle = 'rgba(3,8,16,0.92)';
      ctx.strokeStyle = 'rgba(80,140,170,0.22)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(0, 0, 26, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-40, -12); ctx.lineTo(-36, 0); ctx.lineTo(-40, 12); ctx.closePath(); ctx.fill(); ctx.stroke();
      // jaw and teeth
      ctx.strokeStyle = 'rgba(200,230,240,0.35)';
      ctx.beginPath(); ctx.moveTo(12, 6); ctx.lineTo(26, 4); ctx.stroke();
      for (var tt = 0; tt < 4; tt++) { ctx.beginPath(); ctx.moveTo(14 + tt * 3.2, 5.5); ctx.lineTo(15 + tt * 3.2, 9); ctx.stroke(); }
      // lure
      var lx = 34 + Math.sin(t * 1.4 + c.ph) * 3, ly = -30 + Math.cos(t * 1.1 + c.ph) * 3;
      ctx.strokeStyle = 'rgba(80,140,170,0.35)';
      ctx.beginPath(); ctx.moveTo(6, -18); ctx.quadraticCurveTo(22, -40, lx, ly); ctx.stroke();
      ctx.globalCompositeOperation = 'lighter';
      var fl = 0.75 + 0.25 * Math.sin(t * 4 + c.ph);
      glowDot(lx, ly, 3.2, '150,255,240', fl);
      glowDot(lx, ly, 1.2, '255,255,255', 0.9);
    } else if (c.type === 'siphon') {
      ctx.globalCompositeOperation = 'lighter';
      for (var b = 0; b < 16; b++) {
        var bx = b * 11 * c.dir * -1;
        var by = Math.sin(t * 1.5 + b * 0.5 + c.ph) * 10;
        var tw2 = 0.5 + 0.5 * Math.sin(t * 2.5 - b * 0.6);
        glowDot(bx, by, 1.6, b % 3 ? '120,220,255' : '190,140,255', 0.25 + tw2 * 0.5);
      }
    } else if (c.type === 'giant') {
      // A huge, very faint eel-like shape with a soft rim light.
      ctx.fillStyle = 'rgba(14,30,46,0.55)';
      ctx.beginPath();
      ctx.moveTo(120, 0);
      ctx.bezierCurveTo(90, -46, -40, -40, -140, -14 + Math.sin(t * 0.8) * 8);
      ctx.bezierCurveTo(-220, 0 + Math.sin(t * 0.8 + 1) * 14, -300, 10, -380, Math.sin(t * 0.7 + 2) * 20);
      ctx.bezierCurveTo(-300, 24, -220, 26, -140, 18 + Math.sin(t * 0.8) * 8);
      ctx.bezierCurveTo(-40, 42, 90, 40, 120, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(90,160,200,0.12)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.globalCompositeOperation = 'lighter';
      glowDot(92, -8, 2.2, '255,220,160', 0.55);
    }
    ctx.restore();
  }

  /* --------------------------------------------------------------- sub */
  function drawSub(x, y, R, t, lamp, tilt, alpha) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(tilt);

    // headlamp cone
    if (lamp > 0.01) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      var ox = R * 0.92, oy = R * 0.32, len = R * 8, dir = 0.55, spread = 0.42;
      var g = ctx.createRadialGradient(ox, oy, 2, ox, oy, len);
      g.addColorStop(0, 'rgba(255,240,190,' + 0.42 * lamp + ')');
      g.addColorStop(0.5, 'rgba(255,240,190,' + 0.12 * lamp + ')');
      g.addColorStop(1, 'rgba(255,240,190,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + Math.cos(dir - spread) * len, oy + Math.sin(dir - spread) * len);
      ctx.quadraticCurveTo(ox + Math.cos(dir) * len * 1.12, oy + Math.sin(dir) * len * 1.12, ox + Math.cos(dir + spread) * len, oy + Math.sin(dir + spread) * len);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // propeller
    var spin = Math.abs(Math.sin(t * 18));
    ctx.fillStyle = '#C26A2C';
    ctx.beginPath(); ctx.rect(-R * 1.18, -R * 0.06, R * 0.24, R * 0.12); ctx.fill();
    ctx.fillStyle = 'rgba(70,40,20,0.85)';
    ctx.beginPath(); ctx.ellipse(-R * 1.22, 0, R * 0.08, R * 0.42 * (0.25 + spin * 0.75), 0, 0, Math.PI * 2); ctx.fill();

    // tail fins
    ctx.fillStyle = '#E8892F';
    ctx.beginPath(); ctx.moveTo(-R * 0.7, -R * 0.55); ctx.lineTo(-R * 1.08, -R * 0.82); ctx.lineTo(-R * 0.98, -R * 0.3); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-R * 0.7, R * 0.55); ctx.lineTo(-R * 1.08, R * 0.82); ctx.lineTo(-R * 0.98, R * 0.3); ctx.closePath(); ctx.fill();

    // hatch + antenna
    ctx.fillStyle = '#E8892F';
    roundRect(-R * 0.32, -R * 1.18, R * 0.64, R * 0.3, R * 0.1); ctx.fill();
    ctx.strokeStyle = '#7A4318'; ctx.lineWidth = Math.max(1, R * 0.06);
    ctx.beginPath(); ctx.moveTo(R * 0.18, -R * 1.18); ctx.lineTo(R * 0.3, -R * 1.62); ctx.stroke();
    var blink = (Math.floor(t * 1.4) % 2) === 0;
    ctx.fillStyle = blink ? '#FF6B5E' : '#7A2B25';
    ctx.beginPath(); ctx.arc(R * 0.3, -R * 1.66, R * 0.09, 0, Math.PI * 2); ctx.fill();
    if (blink) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowDot(R * 0.3, -R * 1.66, R * 0.12, '255,110,90', 0.5); ctx.restore(); }

    // body
    var bg = ctx.createRadialGradient(-R * 0.35, -R * 0.4, R * 0.1, 0, 0, R * 1.05);
    bg.addColorStop(0, '#FFE08A');
    bg.addColorStop(0.55, '#FFC24A');
    bg.addColorStop(1, '#E8892F');
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(122,67,24,0.85)'; ctx.lineWidth = Math.max(1.2, R * 0.07); ctx.stroke();

    // seam
    ctx.strokeStyle = 'rgba(122,67,24,0.35)'; ctx.lineWidth = Math.max(1, R * 0.045);
    ctx.beginPath(); ctx.arc(0, 0, R * 0.98, Math.PI * 0.62, Math.PI * 1.38); ctx.stroke();

    // rivets
    ctx.fillStyle = 'rgba(122,67,24,0.6)';
    for (var i = 0; i < 8; i++) {
      var a = i / 8 * Math.PI * 2;
      ctx.beginPath(); ctx.arc(R * 0.3 + Math.cos(a) * R * 0.62, -R * 0.05 + Math.sin(a) * R * 0.62, R * 0.045, 0, Math.PI * 2); ctx.fill();
    }

    // porthole
    var px = R * 0.3, py = -R * 0.05, pr = R * 0.46;
    ctx.fillStyle = '#EDEFF2';
    ctx.beginPath(); ctx.arc(px, py, pr + R * 0.09, 0, Math.PI * 2); ctx.fill();
    var gg = ctx.createRadialGradient(px - pr * 0.35, py - pr * 0.35, pr * 0.1, px, py, pr);
    gg.addColorStop(0, lamp > 0.2 ? '#FFF6CF' : '#BFF3FF');
    gg.addColorStop(0.6, lamp > 0.2 ? '#FFC768' : '#3CB8D8');
    gg.addColorStop(1, lamp > 0.2 ? '#C9761F' : '#106A8C');
    ctx.fillStyle = gg;
    ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.beginPath(); ctx.ellipse(px - pr * 0.35, py - pr * 0.38, pr * 0.28, pr * 0.14, -0.6, 0, Math.PI * 2); ctx.fill();
    if (lamp > 0.05) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      glowDot(px, py, pr * 0.5, '255,200,110', 0.35 * lamp);
      ctx.restore();
    }

    // lamp housing
    ctx.fillStyle = '#5B6670';
    roundRect(R * 0.72, R * 0.18, R * 0.32, R * 0.26, R * 0.06); ctx.fill();
    ctx.fillStyle = lamp > 0.05 ? '#FFF4C2' : '#9AA6AF';
    ctx.beginPath(); ctx.arc(R * 0.98, R * 0.31, R * 0.09, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ----------------------------------------------------- scene pieces */
  function drawRays(t) {
    var a = clamp(1 - depth / 480, 0, 1) * 0.28;
    if (a <= 0.005) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < 6; i++) {
      var sway = reduced ? 0 : Math.sin(t * 0.25 + i * 1.7) * 30;
      var x = W * (0.08 + i * 0.17) + sway;
      var g = ctx.createLinearGradient(0, 0, 0, H * 0.85);
      g.addColorStop(0, 'rgba(255,255,240,' + a + ')');
      g.addColorStop(1, 'rgba(255,255,240,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(x - 18, 0); ctx.lineTo(x + 26, 0);
      ctx.lineTo(x + 120 + sway, H * 0.85); ctx.lineTo(x + 40 + sway, H * 0.85);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }

  function drawParticles(layer, dt, dcam, t) {
    var snowA = clamp((depth - 60) / 500, 0, 1) * 0.55;
    var bubA = clamp(1 - depth / 650, 0, 1) * 0.55;
    var glowA = clamp((depth - 850) / 1500, 0, 1);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (p.layer !== layer) continue;
      if (!reduced) {
        p.y -= dcam * PARALLAX[p.layer];
        if (p.kind === 'bubble') p.y -= p.sp * dt * (0.6 + p.layer * 0.25);
        else if (p.kind === 'snow') { p.y += p.sp * dt * 0.5; p.x += Math.sin(t * 0.4 + p.ph) * 0.12; }
        else { p.y += Math.sin(t * 0.3 + p.ph) * 0.08; p.x += Math.cos(t * 0.25 + p.ph) * 0.1; }
        if (p.y < -10) { p.y += H + 20; p.x = rand(0, W); }
        if (p.y > H + 10) { p.y -= H + 20; p.x = rand(0, W); }
        if (p.x < -10) p.x += W + 20; else if (p.x > W + 10) p.x -= W + 20;
      }
      var scale = 0.6 + p.layer * 0.35;
      if (p.kind === 'snow' && snowA > 0.01) {
        ctx.fillStyle = 'rgba(225,240,255,' + (snowA * (0.4 + p.layer * 0.3)) + ')';
        ctx.fillRect(p.x, p.y, p.r * scale, p.r * scale);
      } else if (p.kind === 'bubble' && bubA > 0.01) {
        ctx.strokeStyle = 'rgba(255,255,255,' + (bubA * (0.45 + p.layer * 0.2)) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(p.x + (reduced ? 0 : Math.sin(t * 2 + p.ph) * 1.5), p.y, p.r * scale, 0, Math.PI * 2); ctx.stroke();
      } else if (p.kind === 'glow' && glowA > 0.01) {
        var tw = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(t * (1.2 + p.layer * 0.4) + p.ph);
        if (tw < 0.25) continue;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        glowDot(p.x, p.y, p.r * scale, hslToRgbStr(p.hue, 90, 65), glowA * tw * 0.75);
        ctx.restore();
      }
    }
  }

  var hslCache = {};
  function hslToRgbStr(h, s, l) {
    var k = h + '_' + s + '_' + l;
    if (hslCache[k]) return hslCache[k];
    s /= 100; l /= 100;
    var a = s * Math.min(l, 1 - l);
    var f = function (n) { var kk = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(kk - 3, 9 - kk, 1)); };
    return (hslCache[k] = Math.round(f(0) * 255) + ',' + Math.round(f(8) * 255) + ',' + Math.round(f(4) * 255));
  }

  function drawWalls() {
    var a = clamp((depth - 5600) / 1000, 0, 1);
    if (a <= 0.01) return;
    var seg = walls.seg, n = walls.left.length;
    var span = seg * n;
    var off = ((camY * 0.9) % span + span) % span;
    var maxW = Math.min(W * 0.16, 170) * a;
    ['left', 'right'].forEach(function (side) {
      var pts = walls[side];
      ctx.beginPath();
      var edge = side === 'left' ? 0 : W;
      ctx.moveTo(edge, -seg);
      var start = Math.floor(off / seg);
      for (var i = -1; i <= Math.ceil(H / seg) + 1; i++) {
        var y = i * seg - (off % seg);
        var w = pts[((start + i) % n + n) % n] * maxW;
        ctx.lineTo(side === 'left' ? w : W - w, y);
      }
      ctx.lineTo(edge, H + seg);
      ctx.closePath();
      ctx.fillStyle = 'rgba(2,6,13,' + (0.95 * a) + ')';
      ctx.fill();
      ctx.strokeStyle = 'rgba(70,130,170,' + (0.22 * a) + ')';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  function floorY() {
    var k = clamp((depth - 6820) / 180, 0, 1);
    return H - k * Math.min(130, H * 0.16);
  }

  function drawFloor(dt) {
    var k = clamp((depth - 6820) / 180, 0, 1);
    if (k <= 0) return;
    var fy = floorY();
    var g = ctx.createLinearGradient(0, fy - 20, 0, H);
    g.addColorStop(0, 'rgba(26,34,44,' + k + ')');
    g.addColorStop(1, 'rgba(6,8,12,' + k + ')');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, fy + 12);
    for (var x = 0; x <= W; x += 40) {
      ctx.lineTo(x, fy + Math.sin(x * 0.012) * 10 + Math.sin(x * 0.031 + 1) * 5);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,170,200,' + 0.18 * k + ')';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // a few glowing specks on the floor
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < 9; i++) {
      var sx = (i * 137.5 % 1) * W + (i * 97 % W);
      glowDot(sx % W, fy + 18 + (i % 3) * 14, 1.1, '140,240,220', 0.35 * k * (0.5 + 0.5 * Math.sin(time * 1.5 + i)));
    }
    ctx.restore();

    if (k >= 0.99 && !floorCelebrated) {
      floorCelebrated = true;
      for (var j = 0; j < 46; j++) {
        puffs.push({ x: W * 0.5 + rand(-W * 0.3, W * 0.3), y: fy + rand(-4, 8), vx: rand(-30, 30), vy: rand(-40, -8), life: rand(1.8, 3.4), age: 0, r: rand(6, 18) });
      }
      spawnCreature('siphon');
    }
    if (k < 0.5) floorCelebrated = false;

    for (var p = puffs.length - 1; p >= 0; p--) {
      var pf = puffs[p];
      pf.age += dt;
      if (pf.age > pf.life) { puffs.splice(p, 1); continue; }
      pf.x += pf.vx * dt; pf.y += pf.vy * dt; pf.vy *= 0.985; pf.vx *= 0.985;
      var al = (1 - pf.age / pf.life) * 0.22;
      ctx.fillStyle = 'rgba(120,130,140,' + al + ')';
      ctx.beginPath(); ctx.arc(pf.x, pf.y, pf.r * (1 + pf.age * 0.5), 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawVignette() {
    var a = clamp(depth / 5000, 0, 1) * 0.55;
    if (a <= 0.01) return;
    var g = ctx.createRadialGradient(W / 2, H * 0.45, Math.min(W, H) * 0.35, W / 2, H * 0.45, Math.max(W, H) * 0.8);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,' + a + ')');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  /* --------------------------------------------------------- sub anchor */
  function findAnchor() {
    for (var i = 0; i < anchorEls.length; i++) {
      var el = anchorEls[i];
      if (!el.isConnected) continue;
      var r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return { x: r.left + r.width / 2, y: r.top + r.height / 2, size: parseFloat(el.getAttribute('data-size') || '26'), rect: r };
    }
    return null;
  }

  /* -------------------------------------------------------------- frame */
  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - (lastT || now)) / 1000);
    lastT = now;
    time += dt;

    // depth animation
    if (anim) {
      var k = Math.min(1, (now - anim.start) / anim.dur);
      depth = anim.from + (anim.to - anim.from) * ease(k);
      if (k >= 1) anim = null;
    }
    var newCam = depth * PX_PER_M;
    var dcam = newCam - camY;
    camY = newCam;

    var col = colorsAt(depth);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, col.top);
    g.addColorStop(1, col.bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    drawRays(time);
    drawParticles(0, dt, dcam, time);

    // creatures
    if (!reduced) {
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        if (creatures.length < 4) spawnCreature();
        spawnTimer = rand(3.5, 8);
      }
    }
    for (var i = creatures.length - 1; i >= 0; i--) {
      var c = creatures[i];
      if (!reduced) { c.x += c.vx * dt; c.y -= dcam * 0.6; }
      if (c.x < -c.margin - 20 || c.x > W + c.margin + 20 || c.y < -c.margin - 100 || c.y > H + c.margin + 100) { creatures.splice(i, 1); continue; }
      drawCreature(c, time);
    }

    drawParticles(1, dt, dcam, time);
    drawWalls();
    drawFloor(dt);

    // sub
    var anchor = findAnchor();
    if (anchor) {
      if (!sub.init) { sub.x = anchor.x; sub.y = anchor.y; sub.r = anchor.size; sub.init = true; }
      var follow = reduced ? 1 : 0.12;
      sub.x += (anchor.x - sub.x) * follow;
      sub.y += (anchor.y - sub.y) * follow;
      sub.r += (anchor.size - sub.r) * 0.12;
      sub.alpha += (1 - sub.alpha) * 0.1;
    } else {
      sub.alpha += (0 - sub.alpha) * 0.15;
    }
    var bob = reduced ? 0 : Math.sin(time * 1.6) * 4;
    var targetTilt = reduced ? 0 : clamp(dcam / Math.max(dt, 0.001) / 900, -0.35, 0.35);
    sub.tilt += (targetTilt - sub.tilt) * 0.08;
    var lamp = clamp((depth - 150) / 300, 0, 1);
    drawSub(sub.x, sub.y + bob, sub.r, time, lamp, sub.tilt + (reduced ? 0 : Math.sin(time * 1.1) * 0.03), sub.alpha);

    drawParticles(2, dt, dcam, time);
    drawVignette();

    for (var f = 0; f < frameCbs.length; f++) frameCbs[f](depth);
    requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true; lastT = 0;
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  UT.ocean = {
    MAX_DEPTH: MAX_DEPTH,
    ZONES: ZONES,
    zoneFor: zoneFor,
    colorsAt: colorsAt,
    init: function (el) {
      canvas = el;
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
      anchorEls = Array.prototype.slice.call(document.querySelectorAll('[data-sub-anchor]'));
      for (var i = 0; i < 2; i++) spawnCreature();
      start();
    },
    refreshAnchors: function () {
      anchorEls = Array.prototype.slice.call(document.querySelectorAll('[data-sub-anchor]'));
    },
    setDepth: function (m, opts) {
      m = clamp(m, 0, MAX_DEPTH);
      if ((opts && opts.instant) || reduced) {
        var dur = reduced && !(opts && opts.instant) ? 500 : 0;
        if (!dur) { anim = null; depth = m; return 0; }
        anim = { from: depth, to: m, start: performance.now(), dur: dur };
        return dur;
      }
      var dist = Math.abs(m - depth);
      var d = clamp(900 + dist * 0.6, 1000, 2400);
      anim = { from: depth, to: m, start: performance.now(), dur: d };
      return d;
    },
    getDepth: function () { return depth; },
    getTarget: function () { return anim ? anim.to : depth; },
    onFrame: function (fn) { frameCbs.push(fn); },
    setReducedMotion: function (b) { reduced = !!b; if (reduced) creatures = []; },
    spawn: spawnCreature
  };
})(window.UT = window.UT || {});
