#!/usr/bin/env node
/*
 * Undertow party server. No dependencies: needs only Node.js 18 or newer.
 *
 *   node server.js            # serves on port 8080
 *   PORT=3000 node server.js  # another port
 *
 * Open the printed address on every device (they must be on the same network,
 * or the server must be reachable from the internet). It serves the game files
 * and relays each device's small "presence" object to everyone in the same room
 * using Server-Sent Events. It keeps nothing on disk.
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;
const MAX_BODY = 6 * 1024;
const MAX_PEERS_PER_ROOM = 120;
const MAX_ROOMS = 500;
const ROOM_RE = /^[a-z0-9][a-z0-9_.-]{0,47}$/;
const ID_RE = /^[a-z0-9]{8,32}$/;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.md': 'text/plain; charset=utf-8'
};

// room name -> Map(id -> { presence, res (SSE response) | null, seen })
const rooms = new Map();
const pending = new Map();

function roomOf(name, create) {
  let r = rooms.get(name);
  if (!r && create) {
    if (rooms.size >= MAX_ROOMS) return null;
    r = new Map(); rooms.set(name, r);
  }
  return r || null;
}

function broadcast(name) {
  if (pending.has(name)) return;
  pending.set(name, setTimeout(() => {
    pending.delete(name);
    const r = rooms.get(name);
    if (!r) return;
    const peers = [];
    for (const [id, c] of r) if (c.presence) peers.push({ id, presence: c.presence });
    const msg = 'event: peers\ndata: ' + JSON.stringify(peers) + '\n\n';
    for (const c of r.values()) if (c.res) c.res.write(msg);
  }, 40));
}

function drop(name, id) {
  const r = rooms.get(name);
  if (!r) return;
  r.delete(id);
  if (r.size === 0) rooms.delete(name);
  else broadcast(name);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type || 'application/json', 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const file = path.normalize(path.join(ROOT, rel));
  const ext = path.extname(file).toLowerCase();
  if (!file.startsWith(ROOT + path.sep) || rel.split('/').some((s) => s.startsWith('.')) || !MIME[ext] || path.basename(file) === 'server.js') {
    return send(res, 404, 'Not found', 'text/plain');
  }
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not found', 'text/plain');
    res.writeHead(200, { 'Content-Type': MIME[ext], 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;

  if (p === '/api/ping') return send(res, 200, { ok: true, app: 'undertow' });

  if (p === '/api/events' && req.method === 'GET') {
    const name = url.searchParams.get('room') || '';
    const id = url.searchParams.get('id') || '';
    if (!ROOM_RE.test(name) || !ID_RE.test(id)) return send(res, 400, { error: 'bad room or id' });
    const r = roomOf(name, true);
    if (!r) return send(res, 503, { error: 'server full' });
    if (!r.has(id) && r.size >= MAX_PEERS_PER_ROOM) return send(res, 503, { error: 'room full' });
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 2000\n\n');
    const entry = r.get(id) || { presence: null, res: null };
    entry.res = res;
    r.set(id, entry);
    broadcast(name);
    const beat = setInterval(() => res.write(': keepalive\n\n'), 20000);
    req.on('close', () => {
      clearInterval(beat);
      const cur = rooms.get(name) && rooms.get(name).get(id);
      if (cur && cur.res === res) drop(name, id);
    });
    return;
  }

  if ((p === '/api/presence' || p === '/api/leave') && req.method === 'POST') {
    let body;
    try { body = await readJson(req); } catch (e) { return send(res, 400, { error: 'bad body' }); }
    const name = body && body.room, id = body && body.id;
    if (!ROOM_RE.test(String(name)) || !ID_RE.test(String(id))) return send(res, 400, { error: 'bad room or id' });
    if (p === '/api/leave') { drop(name, id); return send(res, 200, { ok: true }); }
    const presence = body.presence;
    if (!presence || typeof presence !== 'object' || Array.isArray(presence)) return send(res, 400, { error: 'bad presence' });
    const r = roomOf(name, false);
    const entry = r && r.get(id);
    if (!entry) return send(res, 409, { error: 'open the event stream first' });
    entry.presence = presence;
    broadcast(name);
    return send(res, 200, { ok: true });
  }

  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res, p);
  send(res, 405, { error: 'method not allowed' });
});

server.listen(PORT, '0.0.0.0', () => {
  const addrs = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list || []) if (a.family === 'IPv4' && !a.internal) addrs.push(a.address);
  }
  console.log('\nUndertow is running.\n');
  console.log('  On this computer:   http://localhost:' + PORT);
  addrs.forEach((a) => console.log('  On other devices:   http://' + a + ':' + PORT));
  console.log('\nEveryone opens the same address, taps "Play with friends", and joins with the host\'s room code.');
  console.log('Press Ctrl+C to stop.\n');
});
