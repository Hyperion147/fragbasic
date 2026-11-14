import { cache } from "react";

import type { BestPageDataInput } from "@/schemas/best-page";
import * as repo from "@/server/best-pages/repo";

export type PublicBestPage = BestPageDataInput & { updatedAt: string; createdAt: string };

/**
 * Public best-page reads. Draft rows stay in the CMS and are never exposed.
 */
export const getPublicBestPages = cache(async (): Promise<PublicBestPage[]> => {
  const rows = await repo.listBestPages();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }));
});

export const getPublicBestPageBySlug = cache(async (
  slug: string,
): Promise<PublicBestPage | null> => {
  const row = await repo.getBestPageBySlug(slug);
  if (!row || row.status !== "published") return null;
  return { ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() };
});

export async function getPublicBestPageSlugs(): Promise<string[]> {
  return (await getPublicBestPages()).map((page) => page.slug);
}
