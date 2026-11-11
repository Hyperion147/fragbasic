import type { MousepadComparison } from "@/data/comparisons";
import {
  getComparisonBySlug as getStaticComparisonBySlug,
  getPublishedComparisons as getStaticComparisons,
} from "@/lib/comparisons";
import * as repo from "@/server/comparisons/repo";
import type { Mousepad } from "@/types/mousepad";
import { getPublicPadBySlug } from "./pads";
import { isDbCatalogSource } from "./source";

export type PublicComparisonPageData = {
  comparison: MousepadComparison;
  left: Mousepad;
  right: Mousepad;
};

function toPublicComparison(
  row: Awaited<ReturnType<typeof repo.listComparisons>>[number],
): MousepadComparison {
  return {
    ...row.data,
    status: row.status,
  };
}

/**
 * Public comparison reads. Draft rows stay in the CMS and are never exposed.
 */
export async function getPublicComparisons(): Promise<MousepadComparison[]> {
  if (!isDbCatalogSource("comparisons")) {
    return getStaticComparisons();
  }

  const rows = await repo.listComparisons();
  return rows
    .filter((row) => row.status === "published")
    .map(toPublicComparison);
}

export async function getPublicComparisonBySlug(
  slug: string,
): Promise<MousepadComparison | null> {
  if (!isDbCatalogSource("comparisons")) {
    const comparison = getStaticComparisonBySlug(slug);
    return comparison?.status === "published" ? comparison : null;
  }

  const row = await repo.getComparisonBySlug(slug);
  if (!row || row.status !== "published") return null;
  return toPublicComparison(row);
}

export async function getPublicComparisonSlugs(): Promise<string[]> {
  return (await getPublicComparisons()).map((comparison) => comparison.slug);
}

/**
 * Resolves a comparison page against the public pad and comparison readers, so
 * either side of the matchup can come from the database.
 */
export async function getPublicComparisonPageData(
  slug: string,
): Promise<PublicComparisonPageData | null> {
  const comparison = await getPublicComparisonBySlug(slug);

  if (!comparison) {
    return null;
  }

  const [left, right] = await Promise.all([
    getPublicPadBySlug(comparison.leftSlug),
    getPublicPadBySlug(comparison.rightSlug),
  ]);

  if (!left || !right) {
    return null;
  }

  return {
    comparison,
    left,
    right,
  };
}
