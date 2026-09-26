# FragBasic: Portfolio Project Brief

Use this document as the source for the FragBasic project section in a portfolio, resume, or case study. Product details below are based on the current repository. Add verified analytics and personal-contribution details before publishing.

## Portfolio Card

**FragBasic** is an FPS gear database that helps players compare mousepads, glasspads, gaming IEMs, and mouse skates using structured performance and buying information.

- **Live:** [fragbasic.fun](https://fragbasic.fun)
- **Category:** Product research / gaming gear
- **Audience:** FPS players choosing gear for VALORANT, CS2, Apex Legends, and other shooters
- **Built with:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Drizzle ORM, PostgreSQL

## Short Project Description

FragBasic turns scattered FPS gear research into a searchable catalog. Instead of relying only on manufacturer descriptions or comparing products one review at a time, players can browse structured feel profiles, specifications, buying notes, and side-by-side comparisons. The site covers cloth mousepads, glasspads, gaming IEMs, and mouse skates, with curated recommendations for different play styles and games.

## Problem and Approach

FPS players often have to piece together gear decisions from reviews, product listings, and community discussions. Those sources can describe the same product differently and rarely make it easy to compare practical traits such as glide, stopping power, humidity resistance, comfort, or local availability.

FragBasic organizes those traits into domain-specific product profiles and reusable browsing and comparison experiences. The goal is to make trade-offs easier to scan, not to present every product as a universal recommendation.

## Main Features

- **Mousepad catalog:** Browse product profiles with structured feel ratings and practical specifications, including speed, control, stopping power, surface, texture, base, humidity resistance, size, price, and availability.
- **Glasspad catalog:** Explore hard-surface pads as a dedicated category, with their own product data and trade-offs.
- **Product detail pages:** Review product imagery, specifications, feel notes, strengths and weaknesses, buying information, and related alternatives where available.
- **Mousepad comparisons:** Read published matchups or build a custom comparison of two or three pads in Universal Compare.
- **Gaming IEM catalog:** Browse and compare IEMs using attributes such as imaging, clarity, soundstage, comfort, tuning, driver type, price, and FPS-game suitability.
- **Mouse skate catalog:** Browse and compare skates using attributes such as material, speed, stopping power, durability, and glasspad compatibility.
- **Curated recommendations:** Explore `/best` guides for use cases such as control, speed, glasspads, humid rooms, and FPS-specific picks.
- **Search and discovery:** Move from landing-page and navigation entry points into category browsing, product details, and comparisons.
- **Content for search and AI discovery:** Product and collection metadata, canonical URLs, structured data, sitemap and robots routes, plus a machine-readable content bundle.

## Core User Journey

1. Start on the home page and choose a gear category or recommendation guide.
2. Browse and narrow down products using the available category tools.
3. Open a product profile to inspect its feel, specifications, and buying notes.
4. Compare shortlisted products side by side, using a published matchup or a custom mousepad comparison.

## Public Site Map

| Area | Routes | Purpose |
|---|---|---|
| Home | `/` | Landing experience with category entry points, recent additions, guides, and featured comparisons. |
| Mousepads | `/mousepads`, `/mousepads/[slug]` | Browse the catalog and view individual products. |
| Glasspads | `/mousepads/glasspads` | Browse glass-surface mousepads. |
| Mousepad guides | `/mousepads/guides` | Find supporting mousepad guidance. |
| Mousepad comparisons | `/mousepads/compare`, `/mousepads/compare/[slug]`, `/mousepads/compare/universal` | Comparison hub, published matchups, and custom two-to-three-product comparison. |
| IEMs | `/iems`, `/iems/[slug]`, `/iems/compare` | Browse, inspect, and compare gaming IEMs. |
| Mouse skates | `/accessories/mouse-skates`, `/accessories/mouse-skates/browse`, `/accessories/mouse-skates/compare` | Browse and compare skate accessories. |
| Best guides | `/best`, `/best/[slug]` | Browse curated recommendation lists. |
| Discovery metadata | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt`, `/okf/*`, `/pricing.md` | Search-engine metadata, install metadata, and machine-readable site content. |

## Technical Implementation

- **Application:** Next.js App Router with React 19 and TypeScript.
- **UI:** Tailwind CSS 4, Radix UI/shadcn-style primitives, Lucide icons, and Motion-based interactions. Recharts and custom SVG visualizations support comparison and feel displays.
- **Product domains:** Separate TypeScript types and data modules model mousepads, IEMs, and accessories. Shared helpers provide domain-level lookups, formatting, filtering, and comparison behavior.
- **Public catalog data:** Current public mousepad and IEM pages read from TypeScript data modules. This provides a direct, typed data path for the live catalog.
- **Admin data layer:** A separate CMS area uses PostgreSQL through Drizzle ORM. Database tables cover mousepads, glasspads, IEMs, and mouse skates, with draft/published status fields.
- **Admin access and API:** The CMS includes a login/dashboard flow, protected admin API routes, validation with Zod, password-hash verification with bcrypt, and image-upload endpoints for catalog categories.
- **Important architecture note:** The database-backed CMS and the TypeScript-backed public catalog are separate data paths in the current code. Do not describe CMS edits as automatically updating public product pages unless that publishing integration is verified or implemented.
- **SEO and measurement:** Centralized metadata helpers, canonical URLs, Open Graph/Twitter metadata, JSON-LD, sitemap and robots routes, and Vercel Analytics integration.

## Data Model and Editorial Approach

Product records distinguish **how gear feels in use** from **physical and buying specifications**. Mousepad profiles use structured dimensions such as speed, control, stopping power, friction, and micro-adjustments alongside surface, base, softness, sizes, price, availability, and environmental considerations. IEM and skate records use their own domain-specific fields rather than forcing every category into one generic schema.

Ratings and buying notes are editorial summaries informed by product specifications and community/review sources; they are not claims of standardized laboratory testing across the entire catalog. Any portfolio copy should preserve that distinction.

## Search and Content Discoverability

The site uses Next.js metadata conventions and centralized SEO helpers for page titles, descriptions, canonical URLs, and social previews. It generates a sitemap from catalog and guide routes, exposes a robots policy, and adds structured data for the site and collection/product pages. The `/llms.txt` and `/okf/` resources provide a machine-readable index of the public catalog and guides.

## Suggested Portfolio Copy

### One-paragraph version

I built FragBasic, a searchable FPS gear database designed to make equipment research more practical. It brings mousepads, glasspads, gaming IEMs, and mouse skates into structured product profiles with performance traits, buying details, curated guides, and side-by-side comparisons. The application is built with Next.js, React, and TypeScript, with domain-specific catalog models, SEO-focused metadata and structured data, and a separate authenticated database-backed CMS.

### Short version

FragBasic is a searchable database for FPS gear. It helps players evaluate mousepads, glasspads, IEMs, and mouse skates through structured feel profiles, curated recommendations, and product comparisons.

### Resume bullet options

- Built a searchable FPS gear catalog covering mousepads, glasspads, gaming IEMs, and mouse skates, with domain-specific product profiles, buying notes, and curated guides.
- Implemented product browsing and comparison experiences, including published mousepad matchups and a custom two-to-three-product comparison flow.
- Added centralized metadata, canonical URLs, JSON-LD, sitemap and robots routes, and machine-readable catalog resources to support discoverability.
- Developed a protected CMS/API foundation with PostgreSQL, Drizzle ORM, Zod validation, and category-specific catalog management.

Use only bullets that accurately reflect your own contribution. In particular, explain the CMS as a separate data path unless its connection to public catalog publishing has changed.

## Impact and Metrics to Add

No verified usage or business metrics are included here. Fill these from analytics or deployment records before making quantitative claims:

- Launch date or active development period: **[add verified dates]**
- Monthly users or sessions: **[add analytics result and date range]**
- Catalog size by category: **[count current published records]**
- Search traffic or indexed pages: **[add Search Console data and date range]**
- Performance/accessibility results: **[add measured Lighthouse or other audit results]**

## Current Edges and Next Improvements

- Connect CMS publishing to the public catalog, or clearly maintain the current independent data workflows.
- Continue improving navigation and consistency across dense catalog and comparison pages.
- Keep product ratings, source notes, and update dates clear so visitors can judge confidence and freshness.
- Add measured outcomes from analytics and audits once they are available.

## Suggested Project Links

- Live site: https://fragbasic.fun
- Mousepad catalog: https://fragbasic.fun/mousepads
- IEM catalog: https://fragbasic.fun/iems
- Mouse skate catalog: https://fragbasic.fun/accessories/mouse-skates
- Best guides: https://fragbasic.fun/best
- Machine-readable overview: https://fragbasic.fun/llms.txt