# Fragbasic — Ownership Doc

> Phase 0 living document. Updated from owner answers (E1–E5) + filesystem check.
> Rule: if you cannot explain a row without opening the file, lower the “own level.”

---

## One-sentence product

Fragbasic is an FPS gear catalog that turns mousepads, glasspads, IEMs, and skates into structured **feel + specs** data so players can **browse, filter, and compare** faster than reading scattered reviews.

---

## Who uses it / why they care

- FPS players (Valorant, CS2, Apex, etc.) who waste time researching gear one product at a time.
- They want summarized, comparable attributes (speed/control, humidity, price, India availability) instead of only marketing specs.
- Traction: ~100+ visitors weekly.
- Owner gap: IEM judgments feel thinner than mousepads (less personal expertise → higher data-risk).

---

## Live URL

https://fragbasic.fun

---

## Stack (honest)

| Tech | Own level (0–5) | Proof / notes |
|------|-----------------|---------------|
| Next.js App Router | 2 | Weak platform knowledge; use `src/app/**` daily but cannot teach RSC/routing cold |
| React components | 3 | UI ~60% vibe-coded; can navigate structure better than every line |
| TypeScript domain types | 3 | `src/types/mousepad.ts` etc. — structured feel ratings, not free text only |
| Tailwind + design tokens | 3 | `src/app/globals.css` brand + shadcn tokens; consistency still weak in UI |
| Motion | 2–3 | Used on landing (`motion/react`); also `framer-motion` import in `rect-tip.tsx` — reconcile deps |
| shadcn / Radix-style UI | 3 | Primitives under `src/components/ui` |
| Recharts / custom charts | 2–3 | Compare / feel visualizations — need deeper ownership |
| SEO (metadata, JSON-LD, sitemap) | 3 | Worked on it; polish still needed |
| TanStack Query | 0 | **Later** — data is static imports today |
| Zod | 0 | **Later** — useful to validate static data shape |
| Supabase | 0 | **Later** — when CMS/auth/images pipeline needs a DB (~100 products is fine static) |

### UI authorship (honest)

| Source | Share |
|--------|--------|
| Vibe / AI-assisted UI | ~60% |
| shadcn / generated primitives | ~30% |
| Handwritten by owner | ~10% |

### Content authorship (honest)

Product **numbers and copy** come from community reviews, manufacturer specs, and internet sources — not personal lab measurements for the full catalog. That is normal for a catalog product; ownership means **schema, UI, compare logic, SEO**, not inventing every rating.

---

## Repo map (from filesystem)

### App routes (`src/app`)

```text
/                         home
/mousepads                browse
/mousepads/[slug]         detail
/mousepads/glasspads
/mousepads/compare
/mousepads/compare/[slug] published matchup
/mousepads/compare/universal
/mousepads/guides
/iems
/iems/[slug]
/iems/compare
/best
/best/[slug]
/accessories/mouse-skates
/accessories/mouse-skates/browse
/accessories/mouse-skates/compare
+ layout, globals.css, sitemap.ts, robots.ts, manifest.ts
```

### Data

```text
src/data/mousepads/     artisan, lgg, zowie, xraypad, steelseries, others, glasspads, related-alternatives
src/data/mousepads/mousepads.ts   barrel aggregate of all pads
src/data/iems/
src/data/accessories/
src/data/comparisons.ts
src/data/best-pages.ts
src/data/latest-added.ts
```

### Types

```text
src/types/mousepad.ts
src/types/iem.ts
src/types/accessory.ts
```

### Lib (domain — not “just shadcn”)

```text
src/lib/mousepads.ts              getAll / getBySlug / company helpers + format re-exports
src/lib/mousepads/filters.ts      selection filters
src/lib/mousepads/calibration.ts  speed-control calibration
src/lib/mousepads/similarity.ts
src/lib/mousepads/visuals.ts
src/lib/compare.ts
src/lib/comparisons.ts
src/lib/seo.ts
src/lib/utils.ts
src/lib/utils/format.ts
```

### Key UI

```text
src/features/landing/*            home sections
src/components/mousepads/*        browser, card, filters, charts, gallery, specs
src/components/compare/*          faceoff, universal compare, charts
src/components/iems/*
src/components/navbar.tsx
src/components/site-footer.tsx
src/components/ui/*               primitives
```

---

## Core user flows

### Happy path (from live use — E1)

1. **Home** → understand product via landing sections.
2. **Navbar** (or landing links / footer) → category page.
3. **Search / filter** products on browse UI.
4. Open **product detail**.
5. Go to **compare** vs other products.

Pain: **navbar is crowded for mousepads** (too many entries / cognitive load).

### Mousepad vertical (engineering path to own)

```text
URL /mousepads
  → src/app/mousepads/page.tsx
  → mousepad browser UI (src/components/mousepads/mousepad-browser.tsx + filters)
  → data via src/lib/mousepads.ts → src/data/mousepads/mousepads.ts (aggregates brand files)
  → types src/types/mousepad.ts
  → filters src/lib/mousepads/filters.ts
  → card → navigate /mousepads/[slug]
  → detail page uses full schema fields
  → compare: published (/mousepads/compare/...) or universal (/mousepads/compare/universal)
```

### Other flows (brief)

- **Glasspads:** under mousepads glass surface category / dedicated glass route.
- **IEMs:** browse + compare; data thinner / owner less confident.
- **Skates:** accessories routes; material/speed/stopping style attributes.
- **Best guides:** curated `/best/[slug]` lists (owner editorial).

---

## Data model (today)

### Where a mousepad lives

- Brand slices: `src/data/mousepads/{artisan,lgg,...}.ts`
- Aggregated list: `src/data/mousepads/mousepads.ts` (spread + related alternatives merge)
- Access API: `getAllMousepads()`, `getMousepadBySlug()` in `src/lib/mousepads.ts`

### Fields that drive UI

| Surface | Fields (owner summary) |
|---------|-------------------------|
| **Card** | image, name, descrip tion, type/category, control / glide(speed) / stopping power |
| **Detail** | full schema (feel, environment, texture, price, availability, notes, sources, visuals, …) |
| **Compare** | comparable feel + spec fields used by compare components |
| **Filters** | companies/brands, speed/control/mud-style categories, price, etc. |
| **IEMs** | tuning and related scoring (separate type module) |

### Feel vs specs

| | Meaning in product | Meaning in code |
|--|--------------------|-----------------|
| **Feel** | How it plays (community + structured ratings) | `MousepadFeelRating`: speed, control, stoppingPower, frictions, microAdjustments, `ratingConfidence` |
| **Specs** | Manufacturer / physical facts | surface, base, softness, sizes, price, availability, texture, environment, … |

### If `feel.speed` is missing

Owner assessment: **breaks** — treated as required on `MousepadFeelRating` (all numbers required in the type). Any pad object that omits it is a type/data bug; UI that assumes `.speed` will fail or show empty/NaN.

---

## Auth / backend

| Today | Static TS data, no auth |
|-------|-------------------------|
| Future DB trigger | Editing without deploy, user accounts, large image pipeline, community submissions — **not** merely “>100 rows” |
| Candidate | Supabase DB + storage bucket for images |
| Not this phase | Full migration |

---

## What I did not write or cannot explain well

- Much of the **UI** (vibe-coded).
- Full **Next.js** mental model (routing, server/client boundaries, caching).
- Every **compare/chart** implementation detail.
- **IEM** legitimacy of ratings (domain expertise gap).
- Individual **data rows** sourced externally (by design).

---

## Top risks

| Risk | Notes |
|------|--------|
| Wrong community ratings | Trust / product quality |
| IEM data thin / less expert | Higher chance of “feels wrong” |
| Mobile less responsive | Demo risk |
| SEO needs polish | Despite existing metadata/JSON-LD/sitemap work |
| Navbar overload (mousepads) | Discoverability / UX |
| Tables everywhere | Visual monotony; consistency issues across pages |
| Design: boxy `rounded-none`, typography complaints | Design-engineer focus |
| Motion dependency split | `motion/react` vs `framer-motion` import — verify package honesty |

---

## 90-second demo script

```text
0:00–0:15  Problem: FPS players burn hours comparing pads/IEMs across Reddit and stores.
0:15–0:30  Home: Fragbasic structures feel + specs for gear decisions (live site).
0:30–0:50  Navbar → Mousepads → filter (brand / control-speed style) → open one pad detail.
0:50–0:75  Compare: show 2 pads side-by-side (published or universal) — decision edge.
0:75–0:90  Close: next work = design system (type/space) + own mousepad code path; backend later.
```

---

## Design audit notes

### From users / owner

- Improve **typography** (hierarchy, too many size variants).
- Too much **box** UI (`rounded-none` feel).
- **Tables** on many pages — make consistent or replace denser patterns where better.
- Product-specific pages need same layout language.

### E1 live

1. Happy path: home → navbar → browse → detail → compare.
2. Navbar too heavy for mousepads area.
3. Tables dominate exploration UI.
4. Motion helps on landing + navbar; not overused elsewhere (owner claim).
5. IEM data feels thin.

### E4 tokens / type (owner observation — verify in CSS as Week 1)

| Role | Intended family |
|------|-----------------|
| Sans / default | `font-sans` widely |
| Heading | Inter (`--font-inter`) |
| Body | Sora (`--font-sora`) — **confirm body actually applies Sora** (variables exist on `<html>`; check computed styles) |
| Mono | Roboto Mono |

Section title example observed: ~1.5rem, line-height ~1.12, weight ~650, Inter.

Problem: **too much font-size differentiation** without a named scale → inconsistency.

### Concrete issues (for Week 1+)

| Location | Issue | Why it hurts | Later fix direction |
|----------|--------|--------------|---------------------|
| Global / mousepads | Mixed title sizes | Weak hierarchy | Named type scale (`text-display`, `text-title`, `text-body`, `text-meta`) |
| Global | Boxy cards / `rounded-none` | Dated, harsh | Radius tokens + selective softness |
| Browse pages | Table-heavy | Dense, same look everywhere | Shared table/spec primitive OR card/list density rules |
| Navbar | Too many mousepad entries | Overload | IA: group under Mousepads |
| Product pages | Inconsistent sections | Feels half-baked | One product page template |
| Landing | Motion present | OK if purposeful | Document motion rules + `prefers-reduced-motion` (already partially used) |

---

## File responsibilities (E2 — owner + accuracy pass)

| File | Responsibility |
|------|----------------|
| `src/app/layout.tsx` | Fonts (CSS variables), root shell, JSON-LD, Analytics, TooltipProvider, Navbar + Footer wrap all pages |
| `src/app/page.tsx` | Home metadata + composes landing feature sections (split for structure) |
| `src/data/mousepads/mousepads.ts` | Aggregates brand mousepad arrays + related alternatives; re-exports brand lists |
| `src/types/mousepad.ts` | Domain types for mousepad data |
| `src/lib/mousepads/filters.ts` | Filter selection logic for mousepads |
| `src/components/mousepads/mousepad-browser.tsx` | Explore UI: filter/search and navigate to product pages (table-structured exploration) |
| `src/app/globals.css` | Design tokens (shadcn-style + brand) for consistency |

**Correction vs earlier draft:** `src/lib/mousepads.ts` is **domain API** (getAll, getBySlug, company naming), not “only shadcn.”

---

## Libraries: now / later / vanity (E5)

| Library | Verdict | Why |
|---------|---------|-----|
| Motion | **Now** (improve, own) | Already on landing; design-engineer skill |
| Recharts | **Now** (own existing) | Compare/feel charts already depend on chart stack |
| TanStack Query | **Later** | No async server catalog yet |
| Zod | **Later** | Validate static data / future API payloads |
| Supabase | **Later** | When editing/images/auth need a backend |

---

## Ownership % (split, honest)

| Layer | % | Why |
|-------|---|-----|
| Product vision | 75 | Clear problem, live users, roadmap instincts |
| Domain (mousepads) | 55 | Stronger than IEMs; data still external |
| Domain (IEMs) | 30 | Thin expertise / thinner confidence |
| Code — UI | 30 | 60% vibe-coded |
| Code — data/lib/types | 45 | Schema awareness growing; not every helper owned |
| Next.js platform | 25 | Admitted weak |
| Design system discipline | 25 | Tokens exist; scale/hierarchy not owned |
| **Weighted gut (engineering presentable)** | **~35–40%** | Not 50% code ownership yet |

---

## Phase 0 status

| Item | Status |
|------|--------|
| Product one-liner | Done |
| Honest stack | Done |
| Real routes | Done |
| Mousepad vertical sketch | Done |
| Demo script | Done |
| Design issues list | Done |
| Split ownership % | Done |
| Cold explain of filter/compare math | **Not yet** |
| Confirmed font application on `body` | **Verify Week 1** |
| Motion usage map (every file) | **Partial** |

---

## Next (Week 1) — do not start backend

1. **Own mousepad vertical:** read page → browser → filters → card → detail with notes (no AI rewrite).
2. **Design:** propose a type scale + spacing scale (on paper), then apply **only** to `/mousepads` browse + one detail.
3. **Navbar IA:** sketch reduced mousepad navigation (design only or small change).
4. Still no Query/Supabase until static ownership is real.
