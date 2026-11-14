# Catalog Runbook

Postgres is the source of truth for the catalog. The site reads catalog and
editorial content directly from the database; there is no bundled static
catalog or per-module source switch.

## Prerequisites

`.env` must define:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Supabase Postgres connection string (use the pooler host). |
| `SUPABASE_URL` | Project URL, e.g. `https://<ref>.supabase.co`. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used for storage uploads. |
| `SUPABASE_STORAGE_BUCKET` | Bucket name, currently `mousepads`. |

The storage bucket must exist **and be public** so product images render on the
public site. Verify with:

```bash
curl -I "$SUPABASE_URL/storage/v1/object/public/$SUPABASE_STORAGE_BUCKET/mousepads/artisan-zero-soft/<file>"
```

A private bucket returns `400 {"error":"Bucket not found"}` on public URLs even
though the bucket exists. Mark it public in the Supabase dashboard (Storage →
bucket → Settings) or via the Storage API `PUT /storage/v1/bucket/:id` with
`{"public":true}`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run db:generate` | Generate a migration from `src/db/schema.ts`. |
| `npm run db:migrate` | Apply pending migrations. |
| `npm run db:push` | Push the schema directly (development only). |
| `npm run db:studio` | Open Drizzle Studio. |
| `npm run db:check` | Validate schemas, images, and editorial references. |
| `npm run db:snapshot` | Write the current database catalog to `output/catalog-snapshot.json`. |

## Catalog health

Run the read-only integrity check after schema changes and before a deploy:

```bash
npm run db:check
npm run db:check -- --json
```

It validates every row against its Zod schema, requires absolute public
`images.main` URLs, resolves comparison/best-page/guide references, and exits
non-zero when errors are found. The same report is available in the CMS at
`/cms67/health` and as a compact card on the dashboard.

## Images

CMS image uploads go to Supabase Storage. Glasspads use the `glasspadId` form
field and the `glasspads/<id>/` folder, while mousepads use `mousepadId` and
`mousepads/<id>/`. Uploads use `x-upsert: true`, so re-runs are idempotent.

## CMS editors

Catalog rows are edited at `/cms67/mousepads`, `/cms67/glasspads`, `/cms67/iems`,
and `/cms67/mouse-skates`. The forms are generated from the same Zod schemas used
by the APIs, so fields, enum options, required markers, and numeric limits stay
in sync with validation.

Each editor also has an **Advanced JSON** panel for the complete record. Changes
made there are only applied after pressing **Apply JSON**; otherwise saving is
blocked to avoid losing unapplied edits.

## Editorial content

Comparisons, best pages, and guides live in the `comparisons`, `best_pages`, and
`guides` tables and are edited under `/cms67/comparisons`, `/cms67/best-pages`,
and `/cms67/guides`.

All three use structured forms rather than raw JSON. References are validated
before writing:

- A comparison must point at two different pad slugs.
- Every best-page pick must point at a pad slug.
- Every guide `relatedPadSlugs` entry must point at a pad slug.

"Pad slug" means the union of `mousepads` and `glasspads`, matching how the
public catalog resolves pads. Deleting or renaming a referenced pad does not
cascade; fix the editorial record and the CMS will reject unknown slugs on the
next save.

Latest-added is derived automatically. Each catalog module exposes its three
newest published rows by `created_at` (with `updated_at` as a tiebreaker). Adding
a row makes it eligible immediately; there is no curated list to maintain and no
CMS editor or `site_settings` document.

## Public reads

Public readers live in `src/server/catalog/**` and only return rows with status
`published`, so drafts stay hidden in the CMS. `getPublicPads()` unions
mousepads and glasspads, so pad detail pages, comparisons, best guides, the home
page, the sitemap, and the search index all resolve the full catalog.

Every module is database-backed:

- IEMs: `/iems`, `/iems/[slug]`, `/iems/compare`
- Mousepads and glasspads: `/mousepads`, `/mousepads/glasspads`,
  `/mousepads/[slug]`, the compare hub, universal compare
- Mouse skates: `/accessories/mouse-skates`, `/browse`, `/compare`
- Comparisons: `/mousepads/compare`, `/mousepads/compare/[slug]`, related
  comparison links on pad detail pages
- Best pages: `/best`, `/best/[slug]`
- Guides: `/mousepads/guides`, `/mousepads/guides/[slug]`

The home page, sitemap, and live search index use the same public readers.

## Revalidation

CMS writes trigger on-demand revalidation for the affected module. This covers
list/detail/compare pages, the home page, the sitemap, the search index, and
editorial pages that reference the changed rows. The five-minute route interval
remains a fallback for direct database changes made outside the CMS.

## Backup and rollback

`npm run db:snapshot` writes every catalog row (including status and timestamps)
to `output/catalog-snapshot.json`. The snapshot is a generated artifact and is
gitignored; take one before large migrations or bulk edits.

To restore a specific row, edit it in the CMS or apply the migration that
introduced the change.
