import type { BestPageConfig } from "@/data/best-pages";
import { getAllBestPages as getStaticBestPages } from "@/data/best-pages";
import * as repo from "@/server/best-pages/repo";
import { isDbCatalogSource } from "./source";

export type PublicBestPage = Omit<BestPageConfig, "slug"> & {
  slug: string;
};

/**
 * Public best-page reads. Draft rows stay in the CMS and are never exposed.
 */
export async function getPublicBestPages(): Promise<PublicBestPage[]> {
  if (!isDbCatalogSource("best-pages")) {
    return getStaticBestPages().map((page) => ({ ...page }));
  }

  const rows = await repo.listBestPages();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data }));
}

export async function getPublicBestPageBySlug(
  slug: string,
): Promise<PublicBestPage | null> {
  if (!isDbCatalogSource("best-pages")) {
    return getStaticBestPages().find((page) => page.slug === slug) ?? null;
  }

  const row = await repo.getBestPageBySlug(slug);
  if (!row || row.status !== "published") return null;
  return { ...row.data };
}

export async function getPublicBestPageSlugs(): Promise<string[]> {
  return (await getPublicBestPages()).map((page) => page.slug);
}
