/**
 * Copies catalog images from Supabase Storage to Cloudinary and rewrites the
 * stored `data.images.main` URLs.
 *
 * Safe by default: without `--apply` this only prints what would happen.
 *
 *   npm run images:migrate              # dry run, every catalog table
 *   npm run images:migrate -- --apply   # upload + update the database
 *   npm run images:migrate -- --table=mousepads --limit=5
 *   npm run images:migrate -- --apply --table=iems
 *
 * Supabase originals are left untouched, so the old URLs stay valid while the
 * migration is verified. A JSON report is written to `output/` on apply.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { eq } from "drizzle-orm";
import sharp from "sharp";

import { db } from "@/db";
import { glasspads, iems, mousepads } from "@/db/schema";
import { isCloudinaryConfigured, uploadImageToCloudinary } from "@/lib/cloudinary";

const CLOUDINARY_PREFIX = "https://res.cloudinary.com/";
const DEFAULT_REPORT = "output/cloudinary-migration.json";

type TableName = "mousepads" | "glasspads" | "iems";

type CatalogRow = {
  id: string;
  slug: string;
  data: { images: { main: string } };
};

type MigrationEntry = {
  table: TableName;
  id: string;
  slug: string;
  from: string;
  to?: string;
  status: "migrated" | "skipped" | "failed";
  reason?: string;
};

type Options = {
  apply: boolean;
  table: TableName | null;
  limit: number | null;
  out: string;
  help: boolean;
};

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printUsage();
    return;
  }

  if (options.apply && !isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env, then retry.",
    );
  }

  const tables = options.table ? [options.table] : (["mousepads", "glasspads", "iems"] as const);
  const entries: MigrationEntry[] = [];

  console.log(
    options.apply
      ? "Migrating images to Cloudinary (database will be updated)."
      : "Dry run: no uploads and no database writes. Pass --apply to migrate.",
  );

  for (const table of tables) {
    entries.push(...(await migrateTable(table, options)));
  }

  report(entries);

  if (options.apply) {
    const outputPath = path.resolve(options.out);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(
      outputPath,
      `${JSON.stringify(
        { generatedAt: new Date().toISOString(), entries },
        null,
        2,
      )}\n`,
      "utf8",
    );
    console.log(`\nReport written: ${outputPath}`);
  }

  const failures = entries.filter((entry) => entry.status === "failed").length;

  // The shared db client keeps the pool open; exit explicitly like snapshot.ts.
  process.exit(failures > 0 ? 1 : 0);
}

async function migrateTable(table: TableName, options: Options) {
  switch (table) {
    case "mousepads":
      return migrateRows(table, await db.select().from(mousepads), options, saveMousepad);
    case "glasspads":
      return migrateRows(table, await db.select().from(glasspads), options, saveGlasspad);
    case "iems":
      return migrateRows(table, await db.select().from(iems), options, saveIem);
  }
}

async function migrateRows<T extends CatalogRow>(
  table: TableName,
  rows: T[],
  options: Options,
  save: (row: T, main: string) => Promise<void>,
) {
  const selected = options.limit === null ? rows : rows.slice(0, options.limit);

  console.log(`\n${table}: ${selected.length}/${rows.length} row(s)`);

  const entries: MigrationEntry[] = [];
  for (const row of selected) {
    entries.push(await migrateRow(table, row, options.apply, save));
  }

  return entries;
}

async function saveMousepad(
  row: typeof mousepads.$inferSelect,
  main: string,
) {
  await db
    .update(mousepads)
    .set({
      data: { ...row.data, images: { ...row.data.images, main } },
      updatedAt: new Date(),
    })
    .where(eq(mousepads.id, row.id));
}

async function saveGlasspad(
  row: typeof glasspads.$inferSelect,
  main: string,
) {
  await db
    .update(glasspads)
    .set({
      data: { ...row.data, images: { ...row.data.images, main } },
      updatedAt: new Date(),
    })
    .where(eq(glasspads.id, row.id));
}

async function saveIem(row: typeof iems.$inferSelect, main: string) {
  await db
    .update(iems)
    .set({
      data: { ...row.data, images: { ...row.data.images, main } },
      updatedAt: new Date(),
    })
    .where(eq(iems.id, row.id));
}

async function migrateRow<T extends CatalogRow>(
  table: TableName,
  row: T,
  apply: boolean,
  save: (row: T, main: string) => Promise<void>,
): Promise<MigrationEntry> {
  const from = row.data.images?.main?.trim();

  if (!from) {
    console.log(`  skip ${row.slug}: no main image`);
    return { table, id: row.id, slug: row.slug, from: "", status: "skipped", reason: "no main image" };
  }

  if (from.startsWith(CLOUDINARY_PREFIX)) {
    console.log(`  skip ${row.slug}: already on Cloudinary`);
    return { table, id: row.id, slug: row.slug, from, status: "skipped", reason: "already on Cloudinary" };
  }

  if (!/^https?:\/\//i.test(from)) {
    console.log(`  skip ${row.slug}: ${from} is not a remote URL`);
    return { table, id: row.id, slug: row.slug, from, status: "skipped", reason: "not a remote URL" };
  }

  if (!apply) {
    console.log(`  would migrate ${row.slug}: ${from}`);
    return { table, id: row.id, slug: row.slug, from, status: "skipped", reason: "dry run" };
  }

  try {
    const buffer = await downloadImage(from);
    const optimized = await optimize(buffer);
    const uploaded = await uploadImageToCloudinary({
      buffer: optimized,
      mimeType: "image/webp",
      folder: `fragbasic/${table}/${row.slug}`,
      publicId: publicIdFor(from),
      overwrite: true,
    });

    await save(row, uploaded.url);
    console.log(`  migrated ${row.slug}: ${uploaded.url}`);
    return { table, id: row.id, slug: row.slug, from, to: uploaded.url, status: "migrated" };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`  failed ${row.slug}: ${reason}`);
    return { table, id: row.id, slug: row.slug, from, status: "failed", reason };
  }
}

async function downloadImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`download failed (${response.status})`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`unexpected content type: ${contentType || "unknown"}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

/** Matches the upload path: cap the long edge and store a compact WebP master. */
async function optimize(buffer: Buffer) {
  return sharp(buffer)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84 })
    .toBuffer();
}

function publicIdFor(url: string) {
  const fileName = new URL(url).pathname.split("/").pop() ?? "";
  const stem = fileName.replace(/\.[^.]+$/, "");
  return stem.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/^-+|-+$/g, "") || "main";
}

function report(entries: MigrationEntry[]) {
  const counts = entries.reduce(
    (acc, entry) => {
      acc[entry.status] += 1;
      return acc;
    },
    { migrated: 0, skipped: 0, failed: 0 } satisfies Record<MigrationEntry["status"], number>,
  );

  console.log(
    `\nDone: ${counts.migrated} migrated, ${counts.skipped} skipped, ${counts.failed} failed.`,
  );
}

function parseArgs(argv: readonly string[]): Options {
  const options: Options = {
    apply: false,
    table: null,
    limit: null,
    out: DEFAULT_REPORT,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--apply") {
      options.apply = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg.startsWith("--table=")) {
      const value = arg.slice("--table=".length).trim();
      if (value !== "mousepads" && value !== "glasspads" && value !== "iems") {
        throw new Error("--table must be one of: mousepads, glasspads, iems.");
      }
      options.table = value;
      continue;
    }

    if (arg.startsWith("--limit=")) {
      const value = Number(arg.slice("--limit=".length));
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--limit must be a positive integer.");
      }
      options.limit = value;
      continue;
    }

    if (arg.startsWith("--out=")) {
      const value = arg.slice("--out=".length).trim();
      if (!value) {
        throw new Error("--out requires a file path.");
      }
      options.out = value;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printUsage() {
  console.log(`Usage: npm run images:migrate -- [options]

Copies catalog images to Cloudinary and rewrites data.images.main.

Options:
  --apply            Upload images and update the database (default: dry run)
  --table=<name>     Only migrate mousepads, glasspads, or iems
  --limit=<n>        Migrate at most n rows per table
  --out=<path>       Report path for --apply (default: ${DEFAULT_REPORT})
  -h, --help         Show this help

Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET
for --apply. Supabase originals are never deleted.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});