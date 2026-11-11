import { config } from "dotenv";
import { eq } from "drizzle-orm";

import {
  latestAddedGlasspadSlugs,
  latestAddedIemSlugs,
  latestAddedMousepadSlugs,
} from "@/data/latest-added";
import {
  LATEST_ADDED_KEY,
  latestAddedDataSchema,
  type LatestAddedDataInput,
} from "@/schemas/latest-added";
import { db } from "@/db";
import {
  assertSafeOptions,
  executeImports,
  parseImportOptions,
  planImports,
  printImportSummary,
  type ImportCandidate,
} from "@/db/import-utils";
import { siteSettings } from "@/db/schema";
import * as repo from "@/server/latest-added/repo";
import {
  findMissingGlasspadSlugs,
  findMissingIemSlugs,
  findMissingMousepadSlugs,
} from "@/server/references";

config({ path: ".env", quiet: true });

type LatestAddedCandidate = ImportCandidate & {
  brand: string;
  name: string;
  data: LatestAddedDataInput;
};

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    console.log(`Usage: npm run db:seed:latest-added -- [options]

Options:
  --dry-run             Show planned changes without writing to the database
  --mode=upsert         Write the document when it differs (default)
  --mode=insert-only    Skip when the document already exists
  --mode=replace        Delete the document first (requires --yes)
  --yes, -y             Confirm destructive --mode=replace
  --help, -h            Show this help

Examples:
  npm run db:seed:latest-added -- --dry-run
  npm run db:seed:latest-added
`);
    return;
  }

  assertSafeOptions(options);

  const parsed = latestAddedDataSchema.safeParse({
    mousepads: latestAddedMousepadSlugs,
    glasspads: latestAddedGlasspadSlugs,
    iems: latestAddedIemSlugs,
  });

  if (!parsed.success) {
    console.error(
      "Invalid latest-added data:",
      parsed.error.issues[0]?.message ?? parsed.error.message,
    );
    process.exit(1);
  }

  const data = parsed.data;
  const [missingMousepads, missingGlasspads, missingIems] = await Promise.all([
    findMissingMousepadSlugs(data.mousepads),
    findMissingGlasspadSlugs(data.glasspads),
    findMissingIemSlugs(data.iems),
  ]);

  if (
    missingMousepads.length > 0 ||
    missingGlasspads.length > 0 ||
    missingIems.length > 0
  ) {
    if (missingMousepads.length > 0) {
      console.error(`Missing mousepad slug(s): ${missingMousepads.join(", ")}`);
    }
    if (missingGlasspads.length > 0) {
      console.error(`Missing glasspad slug(s): ${missingGlasspads.join(", ")}`);
    }
    if (missingIems.length > 0) {
      console.error(`Missing IEM slug(s): ${missingIems.join(", ")}`);
    }
    console.error("Import the referenced catalog rows before latest-added.");
    process.exit(1);
  }

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(siteSettings).where(eq(siteSettings.key, LATEST_ADDED_KEY));
  }

  const existing =
    options.mode === "replace"
      ? []
      : await db
          .select()
          .from(siteSettings)
          .where(eq(siteSettings.key, LATEST_ADDED_KEY));

  const desired: LatestAddedCandidate = {
    id: LATEST_ADDED_KEY,
    slug: LATEST_ADDED_KEY,
    brand: "site",
    name: "Latest added",
    status: "published",
    data,
  };

  const rows: LatestAddedCandidate[] = [desired];
  const current: LatestAddedCandidate[] = existing.map((row) => ({
    id: row.key,
    slug: row.key,
    brand: "site",
    name: "Latest added",
    status: "published",
    data: row.data as LatestAddedDataInput,
  }));

  const plans = planImports(rows, current, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await repo.saveLatestAdded(row.data);
      },
      update: async (_id, row) => {
        await repo.saveLatestAdded(row.data);
      },
    },
    options,
  );

  printImportSummary("Latest added import", summary, plans, options);

  process.exit(summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
