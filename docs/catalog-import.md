# Catalog Import Runbook

The static catalog under `src/data/**` is the source of truth for the initial CMS
content. The scripts in `src/db/` import that data into Postgres without wiping
CMS edits.

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

| Command | Imports |
| --- | --- |
| `npm run db:seed` | Soft mousepads (skips `category: "glass"`) |
| `npm run db:seed:glasspads` | Glasspads |
| `npm run db:seed:iems` | IEMs |
| `npm run db:seed:accessories` | Mouse skates |
| `npm run db:seed:comparisons` | Head-to-head comparisons |
| `npm run db:seed:best-pages` | Buying-guide best pages |
| `npm run db:seed:all` | All of the above, sequentially |
| `npm run db:snapshot` | Writes `output/static-catalog-snapshot.json` |

## Safe workflow

Always dry-run first. A dry-run performs the full parse, image URL resolution,
and diff against the database without writing.

```bash
npm run db:seed -- --dry-run
npm run db:seed:glasspads -- --dry-run
npm run db:seed:iems -- --dry-run
npm run db:seed:accessories -- --dry-run
npm run db:seed:comparisons -- --dry-run
npm run db:seed:best-pages -- --dry-run
```

Expected output for an in-sync database:

```
[dry-run] Mousepad import (upsert): create=0 update=0 unchanged=33 skip=0 conflict=0 total=33
[dry-run] Glasspad import (upsert): create=0 update=0 unchanged=12 skip=0 conflict=0 total=12
[dry-run] IEM import (upsert): create=0 update=0 unchanged=10 skip=0 conflict=0 total=10
[dry-run] Mouse skate import (upsert): create=0 update=0 unchanged=12 skip=0 conflict=0 total=12
[dry-run] Comparison import (upsert): create=0 update=0 unchanged=8 skip=0 conflict=0 total=8
[dry-run] Best page import (upsert): create=0 update=0 unchanged=6 skip=0 conflict=0 total=6
```

Then apply:

```bash
npm run db:seed:all
```

### Options

| Flag | Behaviour |
| --- | --- |
| `--dry-run` | Plan only; no writes. |
| `--mode=upsert` | Default. Insert new rows, update changed rows by `id`. |
| `--mode=insert-only` | Insert new rows only; existing rows are skipped. |
| `--mode=replace` | Delete every row in the table, then insert. Requires `--yes`. |
| `--only=slug-a,slug-b` | Limit to specific slugs. |
| `--status=draft` | Status for newly inserted rows (default `published`). |
| `--force-status` | Also overwrite the status of existing rows. |
| `--skip-images` | Keep local image paths; do not upload to Supabase. |
| `--yes`, `-y` | Confirm `--mode=replace`. |
| `--help`, `-h` | Show usage. |

### Status preservation

By default an import never changes the status of an existing row. This prevents
re-imports from unpublishing a record that an editor demoted to `draft`. Use
`--force-status` only for deliberate corrections.

### Conflicts

If an incoming slug already belongs to a different row `id`, the plan reports a
`conflict` and skips that record instead of overwriting it. Resolve the slug
collision in the source data or the database, then re-run.

## Images

On a real run, each local path (`/mousepads/...`) is uploaded to
`$SUPABASE_STORAGE_BUCKET/<collection>/<id>/<file>` and replaced in the row with
the public URL. Uploads use `x-upsert: true`, so re-runs are idempotent.

Use `--skip-images` when storage is unavailable or when you only want to update
text fields.

## CMS editors

Catalog rows are edited at `/cms67/mousepads`, `/cms67/glasspads`, `/cms67/iems`,
and `/cms67/mouse-skates`. The forms are generated from the same Zod schemas used
by the APIs, so fields, enum options, required markers, and numeric limits stay
in sync with validation.

Each editor also has an **Advanced JSON** panel for the complete record. Changes
made there are only applied after pressing **Apply JSON**; otherwise saving is
blocked to avoid losing unapplied edits.

Image uploads go to Supabase Storage. Glasspads use the `glasspadId` form field
and the `glasspads/<id>/` folder, while mousepads use `mousepadId` and
`mousepads/<id>/`.

## Editorial content

Comparisons and best pages live in the `comparisons` and `best_pages` tables.
They are imported by `db:seed:comparisons` and `db:seed:best-pages`, and edited
under `/cms67/comparisons` and `/cms67/best-pages`.

Both use structured forms rather than raw JSON. References are validated before
writing:

- A comparison must point at two different pad slugs.
- Every best-page pick must point at a pad slug.

"Pad slug" means the union of `mousepads` and `glasspads`, matching how the
public catalog resolves pads. Deleting or renaming a referenced pad does not
cascade; fix the editorial record and the CMS will reject unknown slugs on the
next save.

## Rollback

The static data lives in git, so it is always possible to regenerate the
snapshot. For a point-in-time copy before a large import:

```bash
npm run db:snapshot
```

The snapshot is a generated artifact and is gitignored. To restore a specific
row, edit it in the CMS or re-run the importer after reverting the source file.
