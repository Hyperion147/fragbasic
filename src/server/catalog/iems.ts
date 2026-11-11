import * as repo from "@/server/iems/repo";
import type { Iem } from "@/types/iem";

/**
 * Public IEM reads. Draft rows stay in the CMS and are never exposed here.
 */
export async function getPublicIems(): Promise<Iem[]> {
  const rows = await repo.listIems();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => row.data as Iem);
}

export async function getPublicIemBySlug(slug: string): Promise<Iem | null> {
  const row = await repo.getIemBySlug(slug);
  if (!row || row.status !== "published") return null;
  return row.data as Iem;
}

export async function getPublicIemSlugs(): Promise<string[]> {
  return (await getPublicIems()).map((iem) => iem.slug);
}
