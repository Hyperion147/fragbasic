import { config } from "dotenv";
import { eq } from "drizzle-orm";

import { bestPages as catalog } from "@/data/best-pages";
import { bestPageDataSchema, bestPageWriteSchema, type BestPageDataInput } from "@/schemas/best-page";
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
  bestPages,
  glasspads,
  mousepads,
  type NewBestPageRow,
} from "@/db/schema";

config({ path: ".env", quiet: true });

type BestPageCandidate = ImportCandidate & {
  title: string;
  data: BestPageDataInput;
};

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    printImportHelp("npm run db:seed:best-pages --");
    return;
  }

  assertSafeOptions(options);

  const rows: BestPageCandidate[] = [];
  let invalid = 0;

  for (const item of catalog) {
    const parsed = bestPageWriteSchema.safeParse({
      status: "published",
      data: item,
    });

    if (!parsed.success) {
      invalid += 1;
      console.error(
        `Invalid best page ${item.slug}:`,
        parsed.error.issues[0]?.message ?? parsed.error.message,
      );
      continue;
    }

    rows.push({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      status: "published",
      data: bestPageDataSchema.parse(item),
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
    for (const pick of row.data.pickSlugs) {
      if (!padSlugs.has(pick.slug)) {
        console.warn(`Warning: best page ${row.slug} references missing pad ${pick.slug}.`);
      }
    }
  }

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(bestPages);
  }

  const existing =
    options.mode === "replace" ? [] : await db.select().from(bestPages);

  const plans = planImports(rows, existing, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await db.insert(bestPages).values(row as NewBestPageRow);
      },
      update: async (id, row) => {
        await db
          .update(bestPages)
          .set({
            slug: row.slug,
            title: row.title,
            status: row.status,
            data: row.data as NewBestPageRow["data"],
            updatedAt: new Date(),
          })
          .where(eq(bestPages.id, id));
      },
    },
    options,
  );

  printImportSummary("Best page import", summary, plans, options);

  if (invalid > 0) {
    console.error(`Skipped ${invalid} invalid best page(s).`);
  }

  process.exit(invalid > 0 || summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
