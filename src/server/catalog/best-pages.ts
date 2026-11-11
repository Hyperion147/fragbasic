import type { BestPageDataInput } from "@/schemas/best-page";
import * as repo from "@/server/best-pages/repo";

export type PublicBestPage = BestPageDataInput;

/**
 * Public best-page reads. Draft rows stay in the CMS and are never exposed.
 */
export async function getPublicBestPages(): Promise<PublicBestPage[]> {
  const rows = await repo.listBestPages();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data }));
}

export async function getPublicBestPageBySlug(
  slug: string,
): Promise<PublicBestPage | null> {
  const row = await repo.getBestPageBySlug(slug);
  if (!row || row.status !== "published") return null;
  return { ...row.data };
}

export async function getPublicBestPageSlugs(): Promise<string[]> {
  return (await getPublicBestPages()).map((page) => page.slug);
}
