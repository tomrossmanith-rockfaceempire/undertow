# Undertow

A daily trivia game where rare answers pull you deeper into the ocean.

Every day, everyone gets the same 7 open-ended prompts ("Name a U.S. state that borders Canada").
Any correct answer is accepted, but the rarer it is, the more points it scores, and every point
sinks your submersible 10 meters. The background darkens from the sunlit surface down to the
trench floor at 7,000 m, with glowing creatures appearing as you go. At the end you get a
spoiler-free result to share.

## Run it

No install or build step. Pick one:

- **Open `index.html`** in a browser (double-click it). Everything works from the file system.
- **Serve the folder** with any static host, such as GitHub Pages, Netlify, or `python3 -m http.server`.
- **Single file:** run `python3 build.py` to write `dist/undertow.html`, one self-contained page
  you can upload or email. (`python3 build.py --fragment` writes a version without the
  `<html>`/`<head>`/`<body>` wrapper, for hosts that add their own.)

Fonts load from Google Fonts. Offline, the game falls back to system fonts.

## Party mode (play together, each on your own device)

**Play with friends** lets one person host a room and everyone else join with a 4-character code.
Everyone answers the same 7 prompts at the same time on their own phone, tablet, or laptop. After
each prompt, every screen shows the standings, what each person answered, and the Leviathan answers.
At the end there's a podium and **Play again with this room**.

- The host can play too, or turn off **I'm playing too** and use their screen (say, a projector)
  as a big leaderboard that shows the prompt, a countdown, and who has answered.
- A prompt ends when everyone has answered (after a short pause) or when the 20 seconds run out.
  Standings stay up for 10 seconds; the host can skip ahead or end a prompt early.
- People can join mid-game. They start at the current prompt with zero for the ones they missed.
- Other divers appear as colored dots on the depth gauge.
- Party games don't count toward your daily streak or stats.
- Each device reports its own score, so this is for friendly games, not anything high-stakes.

Devices need a way to reach each other. There are two:

1. **The published claude.ai link.** It uses claude.ai's built-in live rooms, so there's no server
   to run. Every player must be signed in to claude.ai and have access to the page (people in your
   organization, or people you invite). Anyone opening it through a public link can play solo but
   can't join rooms.
2. **Your own server.** No accounts needed. On one computer with Node.js 18+, run:

   ```
   node server.js
   ```

   It prints addresses like `http://192.168.1.20:8080`. Everyone on the same Wi-Fi opens that address.
   (Some school or guest networks block device-to-device traffic. If phones can't load the page,
   host it somewhere public instead, such as any Node host.) `PORT=3000 node server.js` changes the port.
   The server has no dependencies and stores nothing.

### Free hosting on Render (one permanent link, any network)

`render.yaml` and `package.json` set the game up for [Render](https://render.com)'s free plan.

1. Put this folder in a GitHub repository (on github.com: **New repository**, then
   **uploading an existing file**, and drag in everything inside this folder).
2. Sign in to Render with GitHub, choose **New → Blueprint**, pick the repository, and click **Apply**.
3. When the service shows **Live**, its address (`https://undertow-….onrender.com`) is your link.

Free services sleep after about 15 minutes without visitors and take about a minute to wake up,
so open the link a minute before you need it. Uploading changed files to GitHub redeploys automatically.

Opening `index.html` directly from disk still plays solo; **Play with friends** then explains how to
start the server.

## How it plays

| Phase | Time |
|---|---|
| Reveal: the prompt fades in, the input is locked | 3 s |
| Answer: type and press Enter; wrong guesses are free | 20 s |
| Round result: tier, points, the canonical answer, a fun fact | 2.5 s (6.5 s if there's something to read), or press Next/Enter |

| Tier | Points | Depth | Share emoji |
|---|---:|---:|---|
| Shallows | 10 | 100 m | 🟨 |
| Kelp Line | 35 | 350 m | 🟩 |
| Twilight Find | 60 | 600 m | 🟪 |
| Abyssal Pull | 85 | 850 m | 🔷 |
| Leviathan | 100 | 1,000 m | ⬜ |
| No answer | 0 | 0 m | ⬛ |

Ocean zones: Sunlight (0–200 m), Twilight (200–1,000 m), Midnight (1,000–4,000 m),
Abyssal (4,000–6,000 m), Hadal Trench (6,000–7,000 m).

The optional speed bonus (Settings) adds 1 point per second left, up to 10, shown separately.
It never changes depth.

## Files

| File | What it does |
|---|---|
| `index.html` | Page structure: screens, modals, gauge |
| `styles.css` | All styling; colors follow the current zone through `body[data-zone]` |
| `js/prompts.js` | The original prompt bank and the `P()` helper |
| `js/prompts-*.js` | More prompts by theme: geography, science, nature-food, culture, everyday |
| `js/validate.js` | Answer matching: normalization, aliases, plurals, typo tolerance, near-miss messages |
| `js/daily.js` | New York midnight rollover, dive numbers, seeded prompt order, saved data |
| `js/audio.js` | Generated sound (Web Audio API, no files), muted by default |
| `js/ocean.js` | Canvas ocean: gradient, particles, creatures, trench walls, seafloor, submersible |
| `js/game.js` | State machine, timers, screens, results, sharing, stats, settings, debug panel |
| `js/multiplayer.js` | Party mode: rooms, host referee, lobby, standings, podium, both connection types |
| `server.js` | Optional zero-dependency server for party mode outside claude.ai |
| `tests.html` | Validator tests that run in the browser |
| `tests/run-node.js` | Data-integrity, validator, and schedule tests: `node tests/run-node.js` |
| `tests/party-e2e.js` | Plays a full 3-device party game in headless browsers (needs Playwright) |
| `build.py` | Bundles everything into `dist/undertow.html` |

## Adding prompts

Prompts live in `js/prompts.js` and the themed `js/prompts-*.js` files. Each one is a `P({...})` call
(the themed files use `var P = UT.P;`). A new themed file also needs a `<script>` tag in `index.html`
and `tests.html`, right after `js/prompts.js`:

```js
P({
  id: 'noble-gases',                 // unique, never reuse
  category: 'Science',
  prompt: 'Name a noble gas',
  common:    ['Helium', 'Neon'],
  uncommon:  ['Argon'],
  rare:      ['Krypton', 'Xenon'],
  deep:      ['Radon'],
  legendary: ['Oganesson'],
  notes: { 'Oganesson': 'Element 118. Only a handful of atoms have ever been made.' },
  reject: [['kryptonite', 'That is Superman’s weakness. The real element is krypton!']],
  strip: [],          // optional trailing words to ignore, e.g. ['cheese'] or ['national park']
  lengthRule: 0       // optional: require exactly N letters
});
```

- Write aliases after a pipe: `'Myanmar|burma'`, `'Tyrannosaurus rex|t rex|trex'`.
- Every prompt needs answers in at least 3 tiers and at least one `legendary` answer.
- `reject` gives a friendly message for tempting wrong answers (octopus for "eight legs").
- After editing, run `node tests/run-node.js` (or `node tests/run-node.js js/prompts-science.js` to check one file). It checks that every answer and alias is accepted,
  no alias belongs to two answers, every note points at a real answer, and reject words aren't
  accidentally accepted. It also checks known list sizes (50 capitals, 88 constellations, and so on).

The prompt shape matches the JSON format in the original spec, so `UT.PROMPTS` can be exported
to `prompts.json` if you ever move to a server. The file is JavaScript rather than JSON so the
game runs straight from `index.html` without a web server.

## How the daily dive works

- The day rolls over at **midnight America/New_York**, using `Intl.DateTimeFormat`, not the
  player's own clock zone.
- **Dive #1 was January 1, 2026.** The dive number counts days since then.
- Every prompt is placed in **one fixed seeded order** (mulberry32 over the sorted prompt IDs).
  Each day reads the next 7 from that order, looping back to the start at the end. Every player
  gets the same set without a server, and a prompt can't come back sooner than
  `floor(prompts / 7)` days. With 227 prompts that's 32 days. The test suite plays out
  three years of dives to confirm it. Adding prompts reshuffles the order, which is fine because
  past dives aren't replayed.
- Progress saves after every round in `localStorage` (key `undertow.v1`). Refreshing mid-dive
  resumes at the next unanswered prompt; that round's timer restarts. A finished dive can't be
  replayed for score. If storage is blocked, the game still plays; it just forgets.
- The round timer is based on timestamps, so it keeps running if you switch tabs.

## Debug panel

Add `?debug=1` to the URL (or `#debug`) for a panel that can jump to any dive number, skip timers,
set the depth or preview each zone and the seafloor, replay the Leviathan effect, show the current
prompt's answers, and erase saved data.

## Accessibility

- Fully keyboard-playable: Enter submits and advances, Esc closes dialogs, focus is always visible.
- Screen readers hear the prompt, the 10 and 5 second warnings, and each accepted or rejected answer.
- Reduce motion (system setting or the in-game toggle) stops particles, parallax, shaking, and creatures.
- High-contrast mode swaps frosted panels for solid ones.
- Works from 360 px wide; the layout follows the on-screen keyboard via `visualViewport`.
