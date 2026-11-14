import { cache } from "react";

import type { GuideDataInput } from "@/schemas/guide";
import * as repo from "@/server/guides/repo";

export type PublicGuide = GuideDataInput & { updatedAt: string; createdAt: string };

export const getPublicGuides = cache(async (): Promise<PublicGuide[]> => {
  const rows = await repo.listGuides();
  return rows.filter((row) => row.status === "published").map((row) => ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }));
});

export const getPublicGuideBySlug = cache(async (
  slug: string,
): Promise<PublicGuide | null> => {
  const row = await repo.getGuideBySlug(slug);
  if (!row || row.status !== "published") return null;
  return { ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() };
});

export async function getPublicGuideSlugs(): Promise<string[]> {
  return (await getPublicGuides()).map((guide) => guide.slug);
}
