# FragBasic

FragBasic is an FPS gear database for people who care how gear actually feels in-game. It tracks mousepads, glasspads, IEMs, mouse skates, best-pick guides, and side-by-side comparisons with practical notes for games like VALORANT, CS2, Apex, and general tracking-heavy FPS.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=111)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)

Live site: [https://fragbasic.fun](https://fragbasic.fun)

## What It Does

- Browse a structured mousepad database with speed, control, stopping power, texture, base, humidity resistance, price, and India availability.
- Explore a dedicated glasspad database for hard-surface pads and their tradeoffs.
- Compare published mousepad matchups or build a custom 2-3 pad comparison in Universal Compare.
- Browse gaming IEMs by imaging, clarity, soundstage, comfort, tuning, value, and buying notes.
- Compare and browse mouse skates by material, speed, stopping power, durability, and glasspad compatibility.
- Open curated `/best` guides for control pads, speed pads, glasspads, humid-room picks, and FPS-specific recommendations.

## Project Highlights

- App Router project on Next.js 16 with typed metadata routes.
- Central SEO helper for canonical URLs, Open Graph, Twitter cards, robots directives, and structured data.
- Generated `sitemap.xml`, `robots.txt`, and `manifest.webmanifest`.
- Static product data organized by domain under `src/data`.
- Reusable feature components for browsers, cards, comparison charts, radar charts, selectors, and landing sections.
- Vercel Analytics integration.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI and shadcn-style UI primitives
- Recharts and custom SVG charts
- Lucide icons
- Vercel Analytics

## Repository Map

```txt
src/app                 App Router pages, layouts, sitemap, robots, manifest
src/components          Shared UI, product cards, browsers, charts, compare tools
src/features/landing    Home page sections and landing experience
src/data                Mousepad, IEM, comparison, best-page, and accessory data
src/lib                 Data access helpers, formatting, comparison logic, SEO helpers
src/types               Domain types for mousepads, IEMs, and accessories
public                  Product images, brand assets, OG image, icons
```

## SEO

FragBasic uses the Next.js Metadata API and metadata file conventions:

- Canonical domain: `https://fragbasic.fun`
- Sitemap: `https://fragbasic.fun/sitemap.xml`
- Robots: `https://fragbasic.fun/robots.txt`
- Web manifest: `https://fragbasic.fun/manifest.webmanifest`
- Social preview image: `public/og-image.png`
- Structured data: WebSite, CollectionPage, and Product JSON-LD

Main SEO files:

- [`src/lib/seo.ts`](src/lib/seo.ts)
- [`src/components/json-ld.tsx`](src/components/json-ld.tsx)
- [`src/app/sitemap.ts`](src/app/sitemap.ts)
- [`src/app/robots.ts`](src/app/robots.ts)
- [`src/app/manifest.ts`](src/app/manifest.ts)

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## GitHub Upload Checklist

For the latest README and SEO polish, update these files on GitHub:

```txt
README.md
src/lib/seo.ts
src/components/json-ld.tsx
src/app/layout.tsx
src/app/page.tsx
src/app/manifest.ts
src/app/mousepads/page.tsx
src/app/mousepads/[slug]/page.tsx
src/app/mousepads/glasspads/page.tsx
src/app/iems/page.tsx
src/app/iems/[slug]/page.tsx
```

## Indexing Note

Submit this sitemap in Google Search Console:

```txt
https://fragbasic.fun/sitemap.xml
```
