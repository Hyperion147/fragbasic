import { eq } from "drizzle-orm";
import { db } from "@/db";
import { mouseSkates, type NewMouseSkateRow } from "@/db/schema";

export async function listMouseSkates() { return db.select().from(mouseSkates).orderBy(mouseSkates.brand); }
export async function getMouseSkateById(id: string) {
  const rows = await db.select().from(mouseSkates).where(eq(mouseSkates.id, id)).limit(1);
  return rows[0] ?? null;
}
export async function getMouseSkateBySlug(slug: string) {
  const rows = await db.select().from(mouseSkates).where(eq(mouseSkates.slug, slug)).limit(1);
  return rows[0] ?? null;
}
export async function insertMouseSkate(row: NewMouseSkateRow) { return (await db.insert(mouseSkates).values(row).returning())[0]; }
export async function updateMouseSkate(id: string, row: Partial<NewMouseSkateRow>) {
  return (await db.update(mouseSkates).set({ ...row, updatedAt: new Date() }).where(eq(mouseSkates.id, id)).returning())[0] ?? null;
}
export async function deleteMouseSkate(id: string) {
  return (await db.delete(mouseSkates).where(eq(mouseSkates.id, id)).returning())[0] ?? null;
}