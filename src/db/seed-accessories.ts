import { config } from "dotenv";
import { mouseSkates as catalog } from "@/data/accessories/mouse-skates";
import { mouseSkateSchema } from "@/schemas/accessory";
import { db } from "./index";
import { mouseSkates } from "./schema";

config({ path: ".env" });

async function main() {
  let inserted = 0;
  let skipped = 0;
  await db.delete(mouseSkates);
  for (const item of catalog) {
    const parsed = mouseSkateSchema.safeParse(item);
    if (!parsed.success) { console.error("Skip invalid:", item.slug, parsed.error); skipped += 1; continue; }
    const data = parsed.data;
    await db.insert(mouseSkates).values({ id: data.id, slug: data.slug, brand: data.brand, name: data.name, status: "published", data });
    inserted += 1;
  }
  console.log(`Accessory seed complete inserted=${inserted} skipped=${skipped}`);
  process.exit(skipped > 0 ? 1 : 0);
}

main().catch((error) => { console.error(error); process.exit(1); });