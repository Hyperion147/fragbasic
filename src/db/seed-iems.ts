import { config } from "dotenv";
import { eq } from "drizzle-orm";

import { iems as catalog } from "@/data/iems/iems";
import { iemSchema, type IemInput } from "@/schemas/iem";
import { db } from "@/db";
import {
  assertSafeOptions,
  executeImports,
  parseImportOptions,
  planImports,
  printImportHelp,
  printImportSummary,
} from "@/db/import-utils";
import { createImageUploader } from "@/db/import/images";
import { iems, type NewIemRow } from "@/db/schema";

config({ path: ".env" });

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    printImportHelp("npm run db:seed:iems --");
    return;
  }

  assertSafeOptions(options);

  const uploader = createImageUploader("iems", {
    skip: options.skipImages,
  });
  const upload = options.dryRun
    ? async (id: string, source: string) => uploader.resolve(id, source)
    : uploader.upload;

  const valid: IemInput[] = [];
  let invalid = 0;

  for (const item of catalog) {
    const parsed = iemSchema.safeParse(item);
    if (!parsed.success) {
      invalid += 1;
      console.error(
        `Invalid IEM ${item.slug}:`,
        parsed.error.issues[0]?.message ?? parsed.error.message,
      );
      continue;
    }

    valid.push(parsed.data);
  }

  const rows: NewIemRow[] = [];

  for (const data of valid) {
    rows.push({
      id: data.id,
      slug: data.slug,
      brand: data.brand,
      name: data.name,
      status: options.status,
      data: {
        ...data,
        images: {
          ...data.images,
          main: await upload(data.id, data.images.main),
        },
      },
    });
  }

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(iems);
  }

  const existing =
    options.mode === "replace" ? [] : await db.select().from(iems);

  const plans = planImports(rows, existing, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await db.insert(iems).values(row);
      },
      update: async (id, row) => {
        await db
          .update(iems)
          .set({
            slug: row.slug,
            brand: row.brand,
            name: row.name,
            status: row.status,
            data: row.data,
            updatedAt: new Date(),
          })
          .where(eq(iems.id, id));
      },
    },
    options,
  );

  printImportSummary("IEM import", summary, plans, options);

  if (invalid > 0) {
    console.error(`Skipped ${invalid} invalid IEM record(s).`);
  }

  process.exit(invalid > 0 || summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
