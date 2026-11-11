import { config } from "dotenv";
import { eq } from "drizzle-orm";

import { glassMousepads as catalog } from "@/data/mousepads/glasspads";
import { mousepadSchema, type MousepadInput } from "@/schemas/mousepad";
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
import { glasspads, type NewGlasspadRow } from "@/db/schema";

config({ path: ".env" });

async function main() {
  const options = parseImportOptions();

  if (options.help) {
    printImportHelp("npm run db:seed:glasspads --");
    return;
  }

  assertSafeOptions(options);

  const uploader = createImageUploader("glasspads", {
    skip: options.skipImages,
  });
  const upload = options.dryRun
    ? async (id: string, source: string) => uploader.resolve(id, source)
    : uploader.upload;

  const valid: MousepadInput[] = [];
  let invalid = 0;

  for (const item of catalog) {
    const parsed = mousepadSchema.safeParse(item);

    if (
      !parsed.success ||
      parsed.data.category !== "glass" ||
      parsed.data.surface !== "glass"
    ) {
      invalid += 1;
      console.error(
        `Invalid glasspad ${item.slug}:`,
        parsed.success
          ? "record is not a glasspad"
          : (parsed.error.issues[0]?.message ?? parsed.error.message),
      );
      continue;
    }

    valid.push(parsed.data);
  }

  const rows: NewGlasspadRow[] = [];

  for (const data of valid) {
    const images = {
      ...data.images,
      main: await upload(data.id, data.images.main),
    };
    const colorways = await Promise.all(
      data.visuals.colorways.map(async (colorway) => ({
        ...colorway,
        ...(colorway.image
          ? { image: await upload(data.id, colorway.image) }
          : {}),
      })),
    );

    rows.push({
      id: data.id,
      slug: data.slug,
      brand: data.brand,
      name: data.name,
      status: options.status,
      data: {
        ...data,
        images,
        visuals: { ...data.visuals, colorways },
      },
    });
  }

  if (options.mode === "replace" && !options.dryRun) {
    await db.delete(glasspads);
  }

  const existing =
    options.mode === "replace" ? [] : await db.select().from(glasspads);

  const plans = planImports(rows, existing, options);

  const summary = await executeImports(
    plans,
    {
      insert: async (row) => {
        await db.insert(glasspads).values(row);
      },
      update: async (id, row) => {
        await db
          .update(glasspads)
          .set({
            slug: row.slug,
            brand: row.brand,
            name: row.name,
            status: row.status,
            data: row.data,
            updatedAt: new Date(),
          })
          .where(eq(glasspads.id, id));
      },
    },
    options,
  );

  printImportSummary("Glasspad import", summary, plans, options);

  if (invalid > 0) {
    console.error(`Skipped ${invalid} invalid glasspad record(s).`);
  }

  process.exit(invalid > 0 || summary.conflict > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
