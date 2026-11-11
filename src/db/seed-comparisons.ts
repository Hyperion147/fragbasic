import { config } from "dotenv";
import { eq } from "drizzle-orm";

import { comparisons as catalog } from "@/data/comparisons";
import { comparisonWriteSchema, type ComparisonDataInput } from "@/schemas/comparison";
import { db } from "@/db";
import {
  assertSafeOptions,
  executeImports,
  parseImportOptions,
  planImports,
  printImportHelp,
  printImportSummary,
  type ImportCandidate,
} from "@/db/import-utils";
import {
  comparisons,
  glasspads,
  mousepads,
  type NewComparisonRow,
} from "@/db/schema";

config({ path: ".env", quiet: true });

type ComparisonCandidate = ImportCandidate & {
  title: string;
  leftSlug: string;
  rightSlug: string;
  data: ComparisonDataInput;
};

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    printImportHelp("npm run db:seed:comparisons --");
    return;
  }

  assertSafeOptions(options);

  const rows: ComparisonCandidate[] = [];
  let invalid = 0;

  for (const item of catalog) {
    const parsed = comparisonWriteSchema.safeParse({
      status: item.status,
      data: item,
    });
    if (!parsed.success) {
      invalid += 1;
      console.error(
        `Invalid comparison ${item.slug}:`,
        parsed.error.issues[0]?.message ?? parsed.error.message,
      );
      continue;
    }

    rows.push({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      leftSlug: item.leftSlug,
      rightSlug: item.rightSlug,
      status: item.status,
      data: parsed.data.data,
    });
  }

  const padSlugs = new Set<string>();
  for (const pad of await db.select({ slug: mousepads.slug }).from(mousepads)) {
    padSlugs.add(pad.slug);
  }
  for (const pad of await db.select({ slug: glasspads.slug }).from(glasspads)) {
    padSlugs.add(pad.slug);
  }

  for (const row of rows) {
    for (const slug of [row.leftSlug, row.rightSlug]) {
      if (!padSlugs.has(slug)) {
        console.warn(`Warning: comparison ${row.slug} references missing pad ${slug}.`);
      }
    }
  }

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(comparisons);
  }

  const existing =
    options.mode === "replace" ? [] : await db.select().from(comparisons);

  const plans = planImports(rows, existing, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await db.insert(comparisons).values(row as NewComparisonRow);
      },
      update: async (id, row) => {
        await db
          .update(comparisons)
          .set({
            slug: row.slug,
            title: row.title,
            leftSlug: row.leftSlug,
            rightSlug: row.rightSlug,
            status: row.status,
            data: row.data as NewComparisonRow["data"],
            updatedAt: new Date(),
          })
          .where(eq(comparisons.id, id));
      },
    },
    options,
  );

  printImportSummary("Comparison import", summary, plans, options);

  if (invalid > 0) {
    console.error(`Skipped ${invalid} invalid comparison(s).`);
  }

  process.exit(invalid > 0 || summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
