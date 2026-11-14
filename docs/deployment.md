# Deploying the audited changes

The site uses the existing Vercel project serving `fragbasic.fun`. Keep that project and its current PostgreSQL/storage environment. Do not create a replacement project or run the synthetic test seed against its database.

## Verify before release

Use Node 24 and install all build dependencies with `npm ci`. Check the deployment environment with `npm run env:check`; it reports configuration status without printing credential values. Next.js loads environment variables itself; the standalone configuration checker uses the same Next environment parser, and database scripts use their explicit `--env-file` option. Then run:

```sh
npm audit
npm run db:check
npm run release:check
npm run test:e2e
```

`test:e2e` starts the production server on port 3100 if one is not already running. Its authenticated mutation scenarios are skipped unless `E2E_DATABASE=1` and `DATABASE_URL` identifies a local disposable database. The GitHub workflow shows how to provision that environment. `scripts/seed-e2e.ts` contains synthetic fixtures solely for that environment.

No new production database migration is required for these application guards. Existing migrations were successfully applied to a fresh disposable PostgreSQL database. Database edits made outside the application's serialized mutation handlers bypass reference guards and need health validation.

## Vercel release

1. Install/connect the Vercel app for this session, or publish the tested changes through the existing project's Git integration. The repository is `Hyperion147/fragbasic`; use its already-linked Vercel project, not a new site. This session has not deployed or pushed these changes.
2. Review a preview deployment with the correct existing environment configuration. Keep `DATABASE_URL`, Auth.js secrets, admin credentials and storage credentials server-side. Do not expose secrets under `NEXT_PUBLIC_`.
3. Confirm both `fragbasic.fun` and `www.fragbasic.fun` point to this same project. The application permanently redirects www to `https://fragbasic.fun` while retaining the request path and query. In Vercel, use apex as the primary domain and ensure an upstream redirect does not send it back to www.
4. Promote the reviewed version. Check `/`, a product, a comparison, a guide, `/editorial-policy`, `/robots.txt` and `/sitemap.xml`. Check an unknown product returns 404 and `/cms67` contains noindex. Test admin login with your normal credentials.
5. Enable Speed Insights in the Vercel project dashboard. The SDK is installed; telemetry renders only when Vercel sets `VERCEL=1`. Check the dashboard after visitor traffic arrives. Keep normal build installation of dev dependencies because shadcn supplies a stylesheet during compilation.

For rollback, redeploy the preceding Vercel version. This patch makes no production schema/data changes requiring a reverse migration.

## Existing Google Search Console property

1. Use the existing property covering apex. A domain property for `fragbasic.fun` covers both apex and www; do not create a redundant property merely for this release.
2. After deployment, submit `https://fragbasic.fun/sitemap.xml` under Sitemaps. The local build currently emits 117 URLs; compare with the deployed result rather than assuming the old sitemap was updated.
3. Inspect the homepage, one mousepad, one IEM, one skate, a brand page, a published comparison, a guide and `/editorial-policy`. Check Google's selected canonical and live-test rendering, then request indexing for materially changed pages where the UI permits it.
4. Run Google's Rich Results Test on deployed product and guide URLs. Basic Product markup without an actual qualifying price/review is intentionally not guaranteed to produce a rich result. Do not invent ratings or offers to remove eligibility warnings.
5. Inspect any previously indexed `/cms67` URL after Google can recrawl its noindex directive. Do not re-block CMS crawling in robots.txt while expecting Google to read noindex. Use temporary removals only if an already-indexed URL needs urgent hiding; authentication still protects admin data.
6. Monitor Pages, Enhancements and Core Web Vitals after recrawling. Keep the new catalog edit dates distinct from testing dates. Field metrics aggregate real traffic and are not immediately replaced by a deployment or a local Lighthouse score.

Search Console ownership is confirmed by the user, but it is not authenticated in this session. OpenSEO can provide connected Search Console reporting when installed/connected; sitemap submission and indexing requests require a capability that supports those actions or the Search Console UI. Never treat an unauthenticated field-data request as a successful Search Console inspection.

## Repeatable local reports

```sh
npm run start -- --port 3100
# In another terminal:
npm run audit:performance
AUDIT_CANONICAL_BASE=https://fragbasic.fun python3 scripts/audit-seo.py http://127.0.0.1:3100
```

`lighthouse-results/summary.json` records simulated mobile metrics. Full HTML/JSON reports and browser traces are ignored by Git. Compact verification evidence is kept in `docs/audit-evidence.json`.

Production cleanup removes obsolete auth probes, generated test reports and an unused image package. `npm run release:check` runs lint, TypeScript, unit tests and a fresh production build. Test, audit and migration tools remain development dependencies; retain them for the Vercel build stage. Existing catalog backups are retained and ignored by Git.
