import { eq } from "drizzle-orm";
import { db } from "@/db";
import { comparisons, type NewComparisonRow } from "@/db/schema";

export async function listComparisons() {
  return db.select().from(comparisons).orderBy(comparisons.title);
}

export async function getComparisonById(id: string) {
  const rows = await db
    .select()
    .from(comparisons)
    .where(eq(comparisons.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getComparisonBySlug(slug: string) {
  const rows = await db
    .select()
    .from(comparisons)
    .where(eq(comparisons.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function insertComparison(row: NewComparisonRow) {
  return (await db.insert(comparisons).values(row).returning())[0];
}

export async function updateComparison(
  id: string,
  row: Partial<NewComparisonRow>,
) {
  return (
    (
      await db
        .update(comparisons)
        .set({ ...row, updatedAt: new Date() })
        .where(eq(comparisons.id, id))
        .returning()
    )[0] ?? null
  );
}

export async function deleteComparison(id: string) {
  return (
    (await db.delete(comparisons).where(eq(comparisons.id, id)).returning())[0] ??
    null
  );
}
