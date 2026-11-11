import { eq } from "drizzle-orm";
import { db } from "@/db";
import { bestPages, type NewBestPageRow } from "@/db/schema";

export async function listBestPages() {
  return db.select().from(bestPages).orderBy(bestPages.title);
}

export async function getBestPageById(id: string) {
  const rows = await db
    .select()
    .from(bestPages)
    .where(eq(bestPages.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getBestPageBySlug(slug: string) {
  const rows = await db
    .select()
    .from(bestPages)
    .where(eq(bestPages.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function insertBestPage(row: NewBestPageRow) {
  return (await db.insert(bestPages).values(row).returning())[0];
}

export async function updateBestPage(
  id: string,
  row: Partial<NewBestPageRow>,
) {
  return (
    (
      await db
        .update(bestPages)
        .set({ ...row, updatedAt: new Date() })
        .where(eq(bestPages.id, id))
        .returning()
    )[0] ?? null
  );
}

export async function deleteBestPage(id: string) {
  return (
    (await db.delete(bestPages).where(eq(bestPages.id, id)).returning())[0] ??
    null
  );
}
