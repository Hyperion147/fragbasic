import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { guides, type NewGuideRow } from "@/db/schema";

export async function listGuides() {
  return db.select().from(guides).orderBy(desc(guides.updatedAt));
}

export async function getGuideById(id: string) {
  const rows = await db
    .select()
    .from(guides)
    .where(eq(guides.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getGuideBySlug(slug: string) {
  const rows = await db
    .select()
    .from(guides)
    .where(eq(guides.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function insertGuide(row: NewGuideRow) {
  return (await db.insert(guides).values(row).returning())[0];
}

export async function updateGuide(id: string, row: Partial<NewGuideRow>) {
  return (
    (
      await db
        .update(guides)
        .set({ ...row, updatedAt: new Date() })
        .where(eq(guides.id, id))
        .returning()
    )[0] ?? null
  );
}

export async function deleteGuide(id: string) {
  return (
    (await db.delete(guides).where(eq(guides.id, id)).returning())[0] ?? null
  );
}
