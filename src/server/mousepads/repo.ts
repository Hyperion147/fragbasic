import { eq } from "drizzle-orm";
import { db } from "@/db";
import { mousepads, type NewMousepadRow } from "@/db/schema";

export async function listMousepads() {
  return db.select().from(mousepads).orderBy(mousepads.brand);
}

export async function getMousepadById(id: string) {
  const rows = await db
    .select()
    .from(mousepads)
    .where(eq(mousepads.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getMousepadBySlug(slug: string) {
  const rows = await db
    .select()
    .from(mousepads)
    .where(eq(mousepads.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function insertMousepad(row: NewMousepadRow) {
  const rows = await db.insert(mousepads).values(row).returning();
  return rows[0];
}

export async function updateMousepad(id: string, row: Partial<NewMousepadRow>) {
  const rows = await db
    .update(mousepads)
    .set({ ...row, updatedAt: new Date() })
    .where(eq(mousepads.id, id))
    .returning();
  return rows[0] ?? null;
}

export async function deleteMousepad(id: string) {
  const rows = await db
    .delete(mousepads)
    .where(eq(mousepads.id, id))
    .returning();
  return rows[0] ?? null;
}
