import { db } from "@/db";
import { glasspads, iems, mousepads } from "@/db/schema";

/**
 * Slugs from both table-backed pad collections. The public catalog treats
 * mousepads and glasspads as one union, so editorial references must resolve
 * against the union as well.
 */
export async function getPadSlugs(): Promise<Set<string>> {
  const [soft, glass] = await Promise.all([
    db.select({ slug: mousepads.slug }).from(mousepads),
    db.select({ slug: glasspads.slug }).from(glasspads),
  ]);

  return new Set([
    ...soft.map((row) => row.slug),
    ...glass.map((row) => row.slug),
  ]);
}

export async function findMissingPadSlugs(slugs: readonly string[]) {
  const available = await getPadSlugs();
  return [...new Set(slugs)].filter((slug) => !available.has(slug));
}

export async function findMissingMousepadSlugs(slugs: readonly string[]) {
  const rows = await db.select({ slug: mousepads.slug }).from(mousepads);
  return findMissing(slugs, rows.map((row) => row.slug));
}

export async function findMissingGlasspadSlugs(slugs: readonly string[]) {
  const rows = await db.select({ slug: glasspads.slug }).from(glasspads);
  return findMissing(slugs, rows.map((row) => row.slug));
}

export async function findMissingIemSlugs(slugs: readonly string[]) {
  const rows = await db.select({ slug: iems.slug }).from(iems);
  return findMissing(slugs, rows.map((row) => row.slug));
}

function findMissing(slugs: readonly string[], available: readonly string[]) {
  const known = new Set(available);
  return [...new Set(slugs)].filter((slug) => !known.has(slug));
}
