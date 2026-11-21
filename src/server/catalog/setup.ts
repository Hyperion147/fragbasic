import { eq } from "drizzle-orm";
import { db } from "@/db";
import { glasspads, iems, mousepads } from "@/db/schema";
import { buildSetupCatalog } from "@/features/setup-catalog/catalog";

function listSetupModels(table: typeof mousepads | typeof glasspads | typeof iems) {
  return db.select({ id: table.id, slug: table.slug, brand: table.brand, name: table.name })
    .from(table)
    .where(eq(table.status, "published"))
    .orderBy(table.brand, table.name, table.id);
}

export async function getSetupCatalog() {
  const [cloth, glass, audio] = await Promise.all([
    listSetupModels(mousepads), listSetupModels(glasspads), listSetupModels(iems),
  ]);
  return buildSetupCatalog([...cloth, ...glass], audio);
}
