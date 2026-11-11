import { config } from "dotenv";
import { eq } from "drizzle-orm";

import { mouseSkates as catalog } from "@/data/accessories/mouse-skates";
import { mouseSkateSchema, type MouseSkateInput } from "@/schemas/accessory";
import { db } from "@/db";
import {
  assertSafeOptions,
  executeImports,
  parseImportOptions,
  planImports,
  printImportHelp,
  printImportSummary,
} from "@/db/import-utils";
import { mouseSkates, type NewMouseSkateRow } from "@/db/schema";

config({ path: ".env" });

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    printImportHelp("npm run db:seed:accessories --");
    return;
  }

  assertSafeOptions(options);

  const valid: MouseSkateInput[] = [];
  let invalid = 0;

  for (const item of catalog) {
    const parsed = mouseSkateSchema.safeParse(item);
    if (!parsed.success) {
      invalid += 1;
      console.error(
        `Invalid mouse skate ${item.slug}:`,
        parsed.error.issues[0]?.message ?? parsed.error.message,
      );
      continue;
    }

    valid.push(parsed.data);
  }

  const rows: NewMouseSkateRow[] = valid.map((data) => ({
    id: data.id,
    slug: data.slug,
    brand: data.brand,
    name: data.name,
    status: options.status,
    data,
  }));

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(mouseSkates);
  }

  const existing =
    options.mode === "replace" ? [] : await db.select().from(mouseSkates);

  const plans = planImports(rows, existing, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await db.insert(mouseSkates).values(row);
      },
      update: async (id, row) => {
        await db
          .update(mouseSkates)
          .set({
            slug: row.slug,
            brand: row.brand,
            name: row.name,
            status: row.status,
            data: row.data,
            updatedAt: new Date(),
          })
          .where(eq(mouseSkates.id, id));
      },
    },
    options,
  );

  printImportSummary("Mouse skate import", summary, plans, options);

  if (invalid > 0) {
    console.error(`Skipped ${invalid} invalid mouse skate record(s).`);
  }

  process.exit(invalid > 0 || summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
