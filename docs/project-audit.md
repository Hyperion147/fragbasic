# FragBasic audit and remediation

Updated 14 November 2026. The requested dependency, catalog, performance/accessibility and editorial SEO changes are implemented locally. Deployment and account-level Search Console work remain pending authenticated access. No production catalog records were changed.

## Status

| Requested area | Result |
| --- | --- |
| Critical dependency remediation | Next.js and matching ESLint config upgraded to 16.4.6; Zod upgraded to 4.6.7; shadcn upgraded and moved to development dependencies. Production and full-tree npm audits report zero vulnerabilities. |
| Catalog integrity and input validation | Shared route-safe slugs and HTTP/HTTPS URL validation; reserved slugs protected; cross-catalog duplicate slugs rejected; reference and lifecycle guards execute in serialized database transactions. |
| Performance and accessibility | Responsive image delivery fixed, landing asset compressed, font preloads reduced, comparison layout shift fixed, keyboard/motion/contrast issues repaired, browser checks and CI added. |
| SEO content | Visible editorial policy and author identity, evidence labels and real record dates, updated guide schema, automatic year rollover removed, keyword meta payload removed, canonical and sitemap checks added. |
| Deployment and Search Console | Code and runbook ready. Vercel and Search Console access is not connected to this session. No deployment, sitemap submission or indexing request was made. |

Verification: 106 unit tests pass; lint has zero errors and warnings; 29 browser checks pass, with one inapplicable desktop/mobile-menu skip. Both authenticated write scenarios passed separately against disposable PostgreSQL. The default production build passes.

See [machine-readable evidence](audit-evidence.json) and the [deployment runbook](deployment.md).

## Dependency changes

The original production scan found 21 affected packages, including two critical findings. Both `npm audit` and `npm audit --omit=dev` now report zero. A clean `npm ci`, dependency-tree validation, TypeScript, unit tests, lint, default Turbopack production build, Drizzle migration checks and shadcn CLI startup were verified.

The lockfile was regenerated to resolve stale vulnerable nested packages. Temporary dependency overrides select deepmerge 4.1.1, minimatch 11.0.8 for its two affected parents, and esbuild 0.28.2. These avoid the registry's proposed breaking shadcn downgrade. Revisit these overrides when upstream packages release compatible fixes; repeat the checks before removing them. The shadcn stylesheet remains a build-time import, so Vercel's build must install development dependencies. Node 22 or newer is required; CI uses Node 24.

## Catalog and upload protections

- Mousepads, IEMs, skates and editorial records use shared kebab-case slug rules. Product slugs cannot take over routes such as `compare`, `guides`, `brand` or `browse`.
- All catalog API writes share a PostgreSQL advisory transaction lock. Cross-table slug checks and writes occur in that same transaction, preventing concurrent cloth/glass creates from taking the same public URL. Repositories use request-local transaction context; unrelated requests retain their normal database context.
- Published comparisons, buying guides and guides must reference published pads. Draft editorial work can reference drafts. Renaming or deleting a referenced pad is rejected until referring records are updated; unpublishing is rejected while published records still reference it. Draft references are also protected against deletion. Related-alternative links participate in these checks.
- Health checks now detect duplicate slugs across tables, column/JSON slug mismatches, unsafe links, missing targets and references to unpublished products. Direct database writers can bypass API guards; use the same publication rules and run `npm run db:check` after imports.
- Outbound source/store URLs accept only HTTP/HTTPS without embedded credentials. Renderers also guard old stored links.
- Uploads are bounded while streaming, before multipart parsing, to 4 MiB plus a small multipart allowance. Sharp validates actual raster contents, limits decoded pixels, rotates/resizes and emits WebP. Undecodable images are rejected instead of stored unchanged. Storage identifiers cannot contain path separators or traversal sequences. The 4 MiB file cap fits below Vercel's documented 4.5 MB function payload limit; larger uploads are rejected by the platform before the application can respond.

The real catalog still contains 84 records and passes the strengthened health checks with zero errors/warnings. Before/after snapshot checksums match. Migration, synthetic seeding, authenticated lifecycle writes, cross-table concurrent-create collisions and invalid upload rejection were tested separately against a disposable local PostgreSQL 17 container. No synthetic records were sent to the real database.

## Performance and accessibility

Cloudinary URLs retain direct CDN resizing through a per-image loader. Local files and unmigrated Supabase URLs use Next's default responsive optimizer, including when Cloudinary is configured. The used landing image `why-this-exist.png` was replaced in the page with a 1600 px WebP: approximately 1.96 MiB to 112 KiB. The old public asset remains available for existing links. Fonts preload only the Latin subset.

The universal comparison now renders its URL-dependent interface on the server with a stable default selection, instead of replacing a small static loading message after hydration. Closed comparison panels defer mounting their contents. Its measured cumulative layout shift fell from 0.351 to zero in the local mobile Lighthouse run. Request-time rendering adds database reads to that route; monitor production response time alongside browser metrics.

Accessibility fixes include a working skip link, visible keyboard focus, uniquely labeled footer navigation, contrast on purple comparison links and footer labels, a CMS login H1, focusable scroll regions, a consistent chart heading hierarchy, and reduced-motion handling for CSS, radar animations and chart tooltips. Decorative footer lettering uses an SVG logo. Desktop and mobile layouts were checked with Playwright/axe, keyboard interactions and screenshot inspection. These checks do not certify every screen-reader/browser combination or full WCAG conformance.

The latest local mobile Lighthouse scores are 99 performance for the homepage, 99 for the mousepad catalog and 91 for universal comparison; all three score 100 in accessibility, best practices and SEO, with zero measured layout shift. Full metrics are recorded in the evidence file. Reproduce with `npm run audit:performance` while the production server runs on port 3100. Reports are written to `lighthouse-results/`. These are simulated mobile lab results, not production field Core Web Vitals, and scores can vary with machine load. The public PageSpeed field-data request returned HTTP 429, so no field assessment is claimed. Vercel Speed Insights is integrated and loads only on Vercel; dashboard enablement and real visitor data are still needed after deployment.

## Editorial SEO and crawlability

`/editorial-policy` explains who maintains the site, how official/store/community evidence differs from personal testing, what relative scores mean, source corrections and commercial disclosure rules. Product pages show the recorded confidence and personal-testing flag instead of implying every listing was tested. Author links point to the policy and the site's existing public maintainer profiles. Prices and stock remain reference information requiring seller verification; no product specifications, ratings, stock or prices were invented or rewritten.

Record creation and update dates come from database timestamps, labeled as catalog edits rather than retests. Guides use the real modification timestamp in Article JSON-LD and Open Graph. Buying-guide titles no longer change year automatically. Bulk keyword metadata and redundant crawler-specific robot groups were removed. The policy is linked from the footer, product/editorial notes, discovery file and sitemap.

The earlier improvements remain: CMS noindex and no inherited homepage canonical; publication-filtered sitemap with real dates; invalid comparison references excluded from discovery; missing products return 404 during metadata generation; complete brand/skate invalidation; safe JSON-LD serialization, valid collection count placement and no fabricated overall skate rating.

A local HTTP crawl checked all 117 sitemap URLs with no detected issues or duplicate titles/descriptions. Browser checks verify the www-to-apex permanent redirect, private indexing directives, missing-record 404s, public schema parsing and anonymous admin rejection. Reproduce the crawl against the local build with:

```sh
AUDIT_CANONICAL_BASE=https://fragbasic.fun python3 scripts/audit-seo.py http://127.0.0.1:3100
```

## Automated checks and remaining boundaries

CI uses immutable commit pins for the official checkout, setup-node and upload-artifact actions. It provisions disposable PostgreSQL, applies migrations, seeds clearly synthetic fixtures, audits dependencies, runs health/lint/unit/build checks, installs Chromium, and executes desktop/mobile accessibility and API integration checks. Seeding refuses remote database hosts. Authenticated mutating browser tests require `E2E_DATABASE=1` with a local database and local target URL; ordinary checks against the real catalog remain read-only. CI will run in GitHub after these local changes are committed/pushed through the project's normal workflow; no cloud CI run is claimed here.

Account actions still needed: deploy to the existing Vercel project, enable Speed Insights there, submit the sitemap in the existing Search Console property, run Google's Rich Results Test on deployed representative URLs, inspect canonical/indexing decisions and request recrawls where appropriate. Future field metrics require actual visitor data and time. The separately identified login rate-limiting finding was outside the four selected remediation sections and remains an open security follow-up.

## Sources

- [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google product snippet requirements](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)
- [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Vercel function limits](https://vercel.com/docs/functions/limitations)
- [Vercel Speed Insights setup](https://vercel.com/docs/speed-insights/quickstart)

The installed Next.js 16.4.6 metadata, image, production-checklist and connection API guides were consulted before framework changes.

Official CI action references: [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [upload-artifact](https://github.com/actions/upload-artifact). The pinned v7 commits were verified against their official Git tags.

## Production cleanup

Removed the unused `next-cloudinary` dependency and six installed packages; the existing per-image Cloudinary loader remains. Removed duplicate authentication calls within the already-guarded write handlers and duplicate dotenv loading from the database runtime. Next's normal environment handling now supplies server configuration without repetitive dotenv messages.

Replaced the two legacy auth probes with `npm run env:check`, which uses Next's environment parser and reports status without credential values. Corrected `.env.example` comments and documented the preferred base64 bcrypt setting. Added `npm run release:check` for lint, TypeScript, unit tests and production build. The default catalog snapshot output is now ignored as well.

Stale build/test reports and Python cache were removed, then a fresh production build was generated. Existing catalog backups and source tests are retained. Cleanup validation repeated 106 unit tests, 29 browser checks and both authenticated write scenarios against disposable PostgreSQL. Dependency audit reports zero vulnerabilities. Cleanup does not deploy the release.
