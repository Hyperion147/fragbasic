import { config } from "dotenv";
import { eq } from "drizzle-orm";

import { guides as catalog } from "@/data/guides";
import {
  guideDataSchema,
  guideWriteSchema,
  type GuideDataInput,
} from "@/schemas/guide";
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
import { glasspads, guides, mousepads, type NewGuideRow } from "@/db/schema";

config({ path: ".env", quiet: true });

type GuideCandidate = ImportCandidate & {
  title: string;
  data: GuideDataInput;
};

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    printImportHelp("npm run db:seed:guides --");
    return;
  }

  assertSafeOptions(options);

  const rows: GuideCandidate[] = [];
  let invalid = 0;

  for (const item of catalog) {
    const parsed = guideWriteSchema.safeParse({
      status: "published",
      data: item,
    });

    if (!parsed.success) {
      invalid += 1;
      console.error(
        `Invalid guide ${item.slug}:`,
        parsed.error.issues[0]?.message ?? parsed.error.message,
      );
      continue;
    }

    rows.push({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      status: "published",
      data: guideDataSchema.parse(item),
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
    for (const slug of row.data.relatedPadSlugs) {
      if (!padSlugs.has(slug)) {
        console.warn(`Warning: guide ${row.slug} references missing pad ${slug}.`);
      }
    }
  }

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(guides);
  }

  const existing = options.mode === "replace" ? [] : await db.select().from(guides);

  const plans = planImports(rows, existing, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await db.insert(guides).values(row as NewGuideRow);
      },
      update: async (id, row) => {
        await db
          .update(guides)
          .set({
            slug: row.slug,
            title: row.title,
            status: row.status,
            data: row.data as NewGuideRow["data"],
            updatedAt: new Date(),
          })
          .where(eq(guides.id, id));
      },
    },
    options,
  );

  printImportSummary("Guide import", summary, plans, options);

  if (invalid > 0) {
    console.error(`Skipped ${invalid} invalid guide(s).`);
  }

  process.exit(invalid > 0 || summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
