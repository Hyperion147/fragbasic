import { cache } from "react";

import * as repo from "@/server/iems/repo";
import type { Iem } from "@/types/iem";

/**
 * Public IEM reads. Draft rows stay in the CMS and are never exposed here.
 */
export const getPublicIems = cache(async (): Promise<Iem[]> => {
  const rows = await repo.listIems();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as Iem);
});

export const getPublicIemBySlug = cache(async (slug: string): Promise<Iem | null> => {
  const row = await repo.getIemBySlug(slug);
  if (!row || row.status !== "published") return null;
  return ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as Iem;
});

export async function getPublicIemSlugs(): Promise<string[]> {
  return (await getPublicIems()).map((iem) => iem.slug);
}
