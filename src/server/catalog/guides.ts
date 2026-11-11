import type { GuideDataInput } from "@/schemas/guide";
import * as repo from "@/server/guides/repo";

export type PublicGuide = GuideDataInput;

export async function getPublicGuides(): Promise<PublicGuide[]> {
  const rows = await repo.listGuides();
  return rows.filter((row) => row.status === "published").map((row) => row.data);
}

export async function getPublicGuideBySlug(
  slug: string,
): Promise<PublicGuide | null> {
  const row = await repo.getGuideBySlug(slug);
  if (!row || row.status !== "published") return null;
  return row.data;
}

export async function getPublicGuideSlugs(): Promise<string[]> {
  return (await getPublicGuides()).map((guide) => guide.slug);
}
