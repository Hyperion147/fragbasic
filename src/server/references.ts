import { findPadDependents } from "@/server/catalog/reference-checks";
import { db } from "@/db";
import { bestPages, comparisons, glasspads, guides, iems, mousepads } from "@/db/schema";

/**
 * Slugs from both table-backed pad collections. The public catalog treats
 * mousepads and glasspads as one union, so editorial references must resolve
 * against the union as well.
 */
export async function getPadSlugs(publishedOnly = false): Promise<Set<string>> {
  const [soft, glass] = await Promise.all([
    db.select({ slug: mousepads.slug, status: mousepads.status }).from(mousepads),
    db.select({ slug: glasspads.slug, status: glasspads.status }).from(glasspads),
  ]);

  return new Set([
    ...soft.filter((row) => !publishedOnly || row.status === "published").map((row) => row.slug),
    ...glass.filter((row) => !publishedOnly || row.status === "published").map((row) => row.slug),
  ]);
}

export async function findMissingPadSlugs(slugs: readonly string[], publishedOnly = false) {
  const available = await getPadSlugs(publishedOnly);
  return [...new Set(slugs)].filter((slug) => !available.has(slug));
}

export async function findMissingMousepadSlugs(slugs: readonly string[]) {
  const rows = await db.select({ slug: mousepads.slug, status: mousepads.status }).from(mousepads);
  return findMissing(slugs, rows.map((row) => row.slug));
}

export async function findMissingGlasspadSlugs(slugs: readonly string[]) {
  const rows = await db.select({ slug: glasspads.slug, status: glasspads.status }).from(glasspads);
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

export async function getPadDependents(slug: string, publishedOnly = false) {
  const [soft, glass, comparisonRows, bestPageRows, guideRows] = await Promise.all([
    db.select().from(mousepads), db.select().from(glasspads),
    db.select().from(comparisons), db.select().from(bestPages), db.select().from(guides),
  ]);
  return findPadDependents({ pads: [...soft, ...glass], comparisons: comparisonRows, bestPages: bestPageRows, guides: guideRows }, slug, publishedOnly);
}
