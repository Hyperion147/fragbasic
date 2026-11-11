import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { glasspads, type NewGlasspadRow } from "@/db/schema";

export async function listGlasspads() {
  return db.select().from(glasspads).orderBy(glasspads.brand);
}

export async function listLatestGlasspadSlugs(limit = 3) {
  const rows = await db
    .select({ slug: glasspads.slug })
    .from(glasspads)
    .where(eq(glasspads.status, "published"))
    .orderBy(desc(glasspads.createdAt), desc(glasspads.updatedAt), glasspads.slug)
    .limit(limit);
  return rows.map((row) => row.slug);
}

export async function getGlasspadById(id: string) {
  const rows = await db.select().from(glasspads).where(eq(glasspads.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getGlasspadBySlug(slug: string) {
  const rows = await db.select().from(glasspads).where(eq(glasspads.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function insertGlasspad(row: NewGlasspadRow) {
  return (await db.insert(glasspads).values(row).returning())[0];
}

export async function updateGlasspad(id: string, row: Partial<NewGlasspadRow>) {
  return (await db.update(glasspads).set({ ...row, updatedAt: new Date() }).where(eq(glasspads.id, id)).returning())[0] ?? null;
}

export async function deleteGlasspad(id: string) {
  return (await db.delete(glasspads).where(eq(glasspads.id, id)).returning())[0] ?? null;
}