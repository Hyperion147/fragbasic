import { eq } from "drizzle-orm";
import { db } from "@/db";
import { iems, type NewIemRow } from "@/db/schema";

export async function listIems() { return db.select().from(iems).orderBy(iems.brand); }
export async function getIemById(id: string) {
  const rows = await db.select().from(iems).where(eq(iems.id, id)).limit(1);
  return rows[0] ?? null;
}
export async function getIemBySlug(slug: string) {
  const rows = await db.select().from(iems).where(eq(iems.slug, slug)).limit(1);
  return rows[0] ?? null;
}
export async function insertIem(row: NewIemRow) { return (await db.insert(iems).values(row).returning())[0]; }
export async function updateIem(id: string, row: Partial<NewIemRow>) {
  return (await db.update(iems).set({ ...row, updatedAt: new Date() }).where(eq(iems.id, id)).returning())[0] ?? null;
}
export async function deleteIem(id: string) {
  return (await db.delete(iems).where(eq(iems.id, id)).returning())[0] ?? null;
}