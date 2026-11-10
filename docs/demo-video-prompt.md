# FragBasic — 20s Reels Demo Video: Production Prompt

> Paste everything below the line into the agent. It is written to be executed end-to-end with no further clarification.

---

## MISSION

Produce a **20.0-second, 1080×1920 (9:16), 60 fps, H.264** demo reel for **FragBasic** (`https://fragbasic.fun`), a database for FPS gear (mousepads, glasspads, IEMs, mouse skates) built with Next.js 16 / React 19 / Tailwind 4.

The reel has two halves that must feel like one piece:

1. **Website demo** — real, pixel-accurate UI captured from the running app with Playwright. No mockups.
2. **Product demo** — the actual gear imagery in `public/` composited as floating product cards around that UI.

It will be posted to a **new Instagram page** as a Reel. Most viewers watch muted, on a phone, for 3 seconds before deciding. The first 2 seconds decide whether the rest is watched.

Do not stop for approval. Make decisions, render, self-review, fix, deliver.

---

## NON-NEGOTIABLES

1. **The UI must be real.** Every screen shown must be a screenshot of `http://localhost:3000` (the actual repo) captured with Playwright. Never AI-generate UI, never rebuild a fake page in HTML, never invent a dashboard.
2. **Product imagery must be real files from `public/`.** No AI-generated products, no stock photos, no invented brand names.
3. **No fabricated facts.** No invented ratings, review counts, user numbers, prices, "trusted by N players", or testimonials. If a number is not in the repo or on the live page, it does not appear on screen. Marketing adjectives are allowed; statistics are not.
4. **No fake browser chrome.** No macOS dots, no address bar, no fake cursor arrow. Screens are presented as clean floating panels, not as a "browser".
5. **No hype voice.** No exclamation marks, no emoji, no "revolutionary", no "game-changing". Copy is declarative and short.
6. **60 fps means 60 fps.** 1200 unique frames. No 30 fps upscaled, no interpolated frames.
7. **Deliver a file that uploads cleanly to Instagram.** `yuv420p`, faststart, high profile, no alpha, no VFR.

---

## GROUND TRUTH (verified from this repo — do not re-invent)

### Brand system

| Token | Value |
|---|---|
| Page background | `#09090b` |
| Raised surface / card | `#101014` |
| Border | `rgba(255,255,255,0.07)` |
| Brand | `#8b5cf6` |
| Brand hover | `#a78bfa` |
| Brand glow | `#c084fc` |
| Text | `#fafafa` |
| Text secondary | `rgba(255,255,255,0.70)` |
| Text tertiary | `rgba(255,255,255,0.45)` |
| Headline font | **Sora** (600), tight tracking (`-0.03em` to `-0.045em`) |
| Body font | **Inter** |
| Meta / numbers | **Roboto Mono** (uppercase, letterspaced, 10–13px in UI) |
| Radius | 16–28px on cards; pills fully rounded |
| Signature look | near-black, purple accent, 1px white/7% hairlines, soft purple bloom, no gradients on text |

The brand voice is **quiet and technical**. Emulate that. Purple is an accent, not a wash — never let it cover more than ~15% of a frame.

### Routes you will capture

| Route | Use in reel | Notes |
|---|---|---|
| `/` | Beat 2 (hero + method) | Hero headline: "Research gear without the rabbit hole." Sub: "Compare how mousepads, glasspads, IEMs and skates actually differ by feel, use case, price and availability in India." |
| `/mousepads` | Beat 2 tail / Beat 5 | Catalog grid, filter chips |
| `/mousepads/compare/universal` | Beat 3 (hero feature) | Build a 3-pad comparison, let the radar render |
| `/mousepads/artisan-zero-soft` | Beat 4 (product demo) | Real product page; hero imagery is `public/mousepads/artisan/zero-black.png` (RGBA) |
| `/mousepads/glasspads` | Beat 5 | Hard-surface category |
| `/iems` + `/iems/dunu-titan-x` | Beat 5 | IEM catalog + product |
| `/best/valorant-mousepads` | Beat 5 | Curated guide |
| `/accessories/mouse-skates` | Beat 5 (optional) | Only if timing allows |

Product slugs that exist and are safe to use: `artisan-zero-soft`, `artisan-hayate-otsu-soft`, `artisan-raiden-soft`, `lgg-saturn-pro-soft`, `lgg-neptune-pro-soft`, `xraypad-aqua-control-pro-mid`, `dunu-titan-x`, `truthear-zero-red`, `simgot-ew200`, `moondrop-chu-ii`.

### Asset inventory (`public/` — 103 files, verified)

Use these exact paths:

| Asset | Role |
|---|---|
| `public/logo.png` (375×382, RGBA) | End-card mark only — never stretch past 180px |
| `public/hero-bg.webp` (1774×887, RGB) | Blurred backdrop at 8–12% opacity behind the hook; crop, do not letterbox |
| `public/og-image.png` (1903×956, RGBA) | Do not use full-screen (too wide); may appear as a small inset only |
| `public/teaser.png`, `public/iem-teaser.png`, `public/why-this-exist.png` | Section backdrops / texture layers at low opacity |
| `public/mousepads/**/*.png` with alpha (e.g. `artisan/zero-black.png` 720×576, `artisan/hayate-otsu-v2-red.png`, `lgg/saturn-black.png`) | Floating product cutouts — the "product demo" |
| `public/mousepads/**/*.jpg` and `.webp` without alpha | Product cards in a grid montage; mask into rounded cards |
| `public/iems/*.png` with alpha (`truthear-zero-red.png`, `tangzu-waner-sg-2-red-lion.png`) | IEM cutouts |
| `public/brands-logo/*.png` (Artisan, LGG, Pulsar, SteelSeries, Xraypad, Zowie) | Credibility strip at ~14s — grayscale 70%, reveal in colour on beat change |
| `public/games-icon/valo-icon.png`, `cs2-icon.png`, `apex-icon.png`, `speedometer.png`, `stability.png` | Small context chips in the hook and CTA |

Rules for imagery:
- **Never recolour, never add glow inside a product**, never crop a pad to the point its shape is unrecognisable.
- Preserve alpha. Cutouts sit on their own soft shadow (`0 40px 90px rgba(0,0,0,.6)`), not on a white box.
- If an image is < 600px wide, cap its on-screen size to 1.5× its native width. Do not "upscale" with AI.

---

## ENVIRONMENT

```bash
# verify tooling
node -v                 # expect v24.x
ffmpeg -version || sudo apt-get install -y ffmpeg
npx playwright --version || npx playwright install chromium --with-deps

# run the real site
npm ci                  # if node_modules is stale
npm run build && npm start -- -p 3000
# wait for http://localhost:3000 to return 200

# workspace — keep all artefacts out of the repo
W=/tmp/opencode/fragbasic-reel
mkdir -p "$W"/{captures,stage,frames,out,review}
```

Record the app's exact commit (`git rev-parse --short HEAD`) in the final report. Capture from the local build, not the live site, so the reel matches the repo.

---

## STEP 1 — CAPTURE THE WEBSITE (Playwright)

Write `$W/capture.cjs`. Requirements:

- Chromium, headless, `viewport: { width: 1080, height: 1920 }`, `deviceScaleFactor: 2` → 2160×3840 PNGs, downscaled in the stage to 1080×1920. Text must be razor sharp at 1:1.
- `page.emulateMedia({ colorScheme: 'dark' })`, `await page.evaluate(() => document.fonts.ready)`, then wait 500ms for spring/Recharts animations to settle.
- Inject CSS: hide scrollbars, disable caret, disable text selection, kill `:hover` by moving the mouse to `(1,1)`.
- **Fix time**: inject `Date.now` and `Math.random` shims so nothing changes between runs.
- Screenshot **viewport slices**, not giant full-page shots (full-page downscaling blurs UI text). Scroll to a set of Y offsets and capture each.
- Name files `captures/<route>__<state>.png`, e.g. `captures/home__y0000.png`.

Capture set (minimum):

| Page | States |
|---|---|
| `/` | `y=0` (hero), `y=700` (method cards), `y=1400` (showcase) |
| `/mousepads` | `y=0`, `y=800`, plus one with a filter chip active |
| `/mousepads/compare/universal` | After selecting **Artisan Zero Soft**, **LGG Saturn Pro Soft**, **Xraypad Aqua Control Pro Mid**; capture `y=0` and the radar-chart viewport |
| `/mousepads/artisan-zero-soft` | `y=0` (hero image + name), `y=700` (specs / feel ratings) |
| `/mousepads/glasspads` | `y=0` |
| `/iems` | `y=0`; `/iems/dunu-titan-x` `y=0` |
| `/best/valorant-mousepads` | `y=0` |

For the compare page, drive the **real UI** — search fields, card selection, apply button — then wait for the chart. If a selector is ambiguous, inspect the DOM (`page.locator(...).count()`) and pick the visible one. Do not fabricate the selection state by editing the DOM.

Output a contact sheet (`review/captures.jpg`, 6 columns) and **look at it** before designing the stage. Reject frames that are loading states, skeletons, or cut mid-card.

---

## STEP 2 — STORYBOARD (locked timings, 60 fps → 1200 frames)

Frame numbers are authoritative. `f0 = 0.000s`, `f1199 = 19.983s`, duration exactly 20.000s.

| # | Frames | Time | Beat | On-screen copy (Sora 600, ≤ 6 words/line) | Visual |
|---|---|---|---|---|---|
| 1 | 0–119 | 0.0–2.0 | **Hook** | `Research gear` / `without the *rabbit hole*.` | Near-black. `hero-bg.webp` at 10% opacity, blurred 40px, slow 1.06→1.00 drift. Logo mark fades in at f6, 0.9→1.0 over 18f. Three product cutouts (Zero, Saturn, Titan X) flick through at f30/f45/f60, 6f each, 92% scale, no bounce. Headline builds line 1 at f24, line 2 at f40 (12f stagger, `power3.out`). Purple accent only on "rabbit hole". |
| 2 | 120–329 | 2.0–5.5 | **Website** | `One database.` / `Every trade-off.` | `home__y0000` slides in from `y=+60`, `scale 1.06→1.00`, 24px radius, hairline border, deep shadow. At f180 the panel scrolls internally to `home__y0700` (mask wipe, 10f feather). Headline sits in the top safe area, 72px. Small Roboto Mono label `01 / 05 — BROWSE` top-left at 28px, 60% opacity. |
| 3 | 330–569 | 5.5–9.5 | **Compare (hero feature)** | `Compare feel,` / `not spec sheets.` | Cut to `compare/universal` radar viewport, cards land at f336 (3 cards, 8f stagger, 12px rise). Radar chart draws — use 3 consecutive captures if the chart animates, or hold the final state and animate a 1.02 push. Floating chips: `SPEED`, `CONTROL`, `STOPPING POWER` in Roboto Mono 26px, purple dot. Label `02 / 05 — COMPARE`. At f520, a thin purple underline sweeps under "feel". |
| 4 | 570–779 | 9.5–13.0 | **Product demo** | `Specs meet` / `how it feels.` | `artisan-zero-soft` page as the base panel, dimmed to 55%. Real cutout `zero-black.png` lifts out of the card (f590, 24f, `power4.out`), floats at 1.0 scale with 2° tilt, soft shadow, gentle 6px bob (sine, 3s period). Spec chips rise beside it: `SPEED 8`, `CONTROL 9`, `STOPPING 7` — **only if those exact values exist on the page; otherwise use the real numbers or omit the chips entirely**. Label `03 / 05 — PRODUCT`. |
| 5 | 780–989 | 13.0–16.5 | **Breadth** | `Pads. Glass. IEMs. Skates.` | Three-pane montage: `glasspads`, `iems`, `best/valorant-mousepads`. Panes enter as a 3-up wall at 0.94 scale, 20px gaps, each 1080×640 crop, then one pane pushes forward per 40f (glass → IEM → best). Brand logo strip (`brands-logo/*`) slides along the bottom at 45% opacity, grayscale, 2 logos lighting up in colour. Label `04 / 05 — THE DATABASE`. Copy lands word-by-word (4 words, 5f apart). |
| 6 | 990–1199 | 16.5–20.0 | **CTA** | `Find your next pad.` / `fragbasic.fun` | Purple `#8b5cf6` circle wipe from bottom-right, 20f, covers frame at f1010. Logo appears at f1016 (0.85→1.0, 14f). Headline at f1030. URL in Roboto Mono at f1050. A real button shape (`#fafafa` fill, black text, 999px radius) labelled `Open FragBasic` at f1060 with a 6f press at f1120 + 2% scale. Hold clean from f1140 to f1199. |

**Hard cuts are allowed and encouraged at 2.0s and 16.5s.** Everything else uses mask wipes or 8–10 frame crossfades. Never a spinning transition, never a zoom blur.

### Motion system

- Easings: `power3.out` for entrances, `power2.inOut` for wipes, `sine.inOut` for idle drift.
- Global drift: every held panel moves 1.00→1.03 scale or ±12px over its full beat. Nothing is ever static for more than 30 frames.
- Parallax: background glow at 0.35× panel movement.
- Text: 12f stagger between lines, 8f between words in beat 5, `y +24px` → 0, opacity 0 → 1. Never letter-by-letter typing.
- Cursor: **no cursor at all**. Tap/press is implied by a 120ms ripple ring, not a drawn mouse.
- Grain: 3% monochrome noise overlay on the whole timeline to kill banding; vignette at 8%.
- Do **not** exceed 1.15× scale on any screenshot. Do not rotate screenshots more than 3°. No 3D perspective flips.

### Typography rules

- Headline: 72–92px, Sora 600, line-height 0.98, tracking −0.03em, max 2 lines.
- Sub/label: 28–36px, Roboto Mono 400, uppercase, letter-spacing 0.12em, 55% white.
- URL: 40px Roboto Mono, 80% white.
- Keep all critical text inside **x: 64–1016, y: 240–1480**. Reels UI eats the top ~220px and bottom ~420px.
- Every caption must survive a 25% scale-down. If you have to squint, it's too small.

---

## STEP 3 — BUILD THE STAGE

Create `$W/stage/index.html` — a single 1080×1920 page with:

- `window.DURATION = 20`, `window.ready` (resolves after fonts + images), `window.seek(frame)` that sets the GSAP timeline to `frame / 60` and returns a promise after two `requestAnimationFrame`s.
- A paused `gsap.timeline({ paused: true })` so rendering is deterministic. No `Date.now()`, no CSS animations, no video elements.
- Images referenced relatively (`../captures/home__y0000.png`), sized in CSS pixels matching 1080×1920 output.
- The product cutouts from `public/` copied into `$W/stage/assets/` at their native resolution.

Self-check the stage at 1080×1920 in a normal browser before rendering frames.

---

## STEP 4 — RENDER 1200 FRAMES

`$W/render.cjs`:

```js
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file:///tmp/opencode/fragbasic-reel/stage/index.html');
  await page.evaluate(() => window.ready);
  for (let f = 0; f < 1200; f++) {
    await page.evaluate((n) => window.seek(n), f);
    await page.screenshot({ path: `frames/${String(f).padStart(5, '0')}.png` });
  }
  await browser.close();
})();
```

Expect 10–25 minutes. If it's slower, split into 4 ranges across 4 pages and merge — determinism makes that safe.

Encode:

```bash
ffmpeg -y -framerate 60 -i frames/%05d.png \
  -vf "scale=1080:1920:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 16 -maxrate 18M -bufsize 36M \
  -profile:v high -level 4.2 -g 120 -keyint_min 60 \
  -movflags +faststart \
  out/fragbasic-demo-reel-9x16-60fps-v1.mp4
```

Verify and paste the raw output into the report:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,nb_frames,pix_fmt,profile,level \
  -show_entries format=duration,bit_rate -of default=nw=1 \
  out/fragbasic-demo-reel-9x16-60fps-v1.mp4
```

Must read: `1080`, `1920`, `60/1`, `1200`, `yuv420p`, duration `20.0`.

---

## STEP 5 — AUDIO

- Export a **silent** master (Instagram will attach trending audio, which boosts reach).
- Also produce `out/bed-20s.m4a`: optional licensed ambient bed, −14 LUFS integrated, true peak ≤ −1 dB, fade out over the last 0.6s. Do not pick a copyrighted track. Do not add a voiceover.
- Optional sound design at 2.0s / 5.5s / 16.5s: 80–120ms filtered whoosh, −18 dB. Subtle; if in doubt, omit.

---

## STEP 6 — SELF-REVIEW (do this before declaring done)

Extract and **visually inspect** a contact sheet at:

`0.2, 1.0, 1.9, 2.1, 3.8, 5.4, 5.6, 7.5, 9.4, 9.6, 11.5, 12.9, 13.1, 15.0, 16.4, 17.6, 18.4, 19.9`

```bash
ffmpeg -i out/fragbasic-demo-reel-9x16-60fps-v1.mp4 -vf "fps=1,scale=270:-1,tile=6x3" -frames:v 1 review/contact.jpg
```

Then check, in this order:

1. **3-second test** — muted, at 25% size, can you tell it's an FPS gear comparison site? If not, fix the hook.
2. **Text collisions** — no headline overlapping UI, no label under the Reels UI zone, no line breaking mid-word.
3. **Legibility** — every caption readable at 270px wide.
4. **Truth** — every number on screen traces to the page it came from. Remove anything you can't source.
5. **Assets** — no placeholders, no broken images, no stretched logos, no cut-off products, no duplicate product twice side by side.
6. **Motion** — no dead frames longer than 30, no snap at loop point, no sub-pixel shimmer on 1px borders.
7. **Encode** — play the file, not the frames. Check the first and last second in a real player.

Fix anything that fails and re-render. Up to 2 fix-and-render cycles; then ship with notes.

---

## DELIVERABLES

```
/tmp/opencode/fragbasic-reel/out/
  fragbasic-demo-reel-9x16-60fps-v1.mp4     # silent master, 20.0s
  bed-20s.m4a                              # optional
  stills/
    cover-01.png                           # 1080×1920, frame at t=11.5 or the CTA frame
    cover-02.png
    cover-03.png
  storyboard.md                            # beat table + exact copy
  sources.md                               # commit hash, every route captured, every asset used
```

Do not commit anything into the repo. Do not overwrite a previous `v1` — bump to `v2`.

## FINAL REPORT (exact format)

1. File path + ffprobe line.
2. Beat-by-beat copy, with the timestamp each line appears.
3. Which captures and which `public/` assets each beat used.
4. Any claim you removed because it wasn't verifiable.
5. Known softness / cropping / compression caveats.
6. One line: what you'd change if this were v2.

---

# WHY THIS CUT (context for the operator)

- **Real UI beats AI video for a product like this.** Seedance/Veo will hallucinate product names, prices, and chart values. A screenshot never lies, and at 1080×1920 with DPR 2 it's sharper than any generated frame.
- **9:16 is a composition constraint, not a crop.** The site is desktop-first; the reel should present desktop screens as floating panels inside a portrait canvas, not as a shrunken browser.
- **The compare tool is the product.** That's the beat people should remember, so it gets 4 of the 20 seconds and the only multi-layer motion.
- **Muted-first.** Burned-in captions and 6-word lines are non-negotiable; the audio is a bonus, not the message.
