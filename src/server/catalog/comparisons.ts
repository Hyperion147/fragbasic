import { cache } from "react";

import * as repo from "@/server/comparisons/repo";
import type { Mousepad } from "@/types/mousepad";
import type { MousepadComparison } from "@/types/comparison";
import { getPublicPadBySlug } from "./pads";

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
export const getPublicComparisons = cache(
  async (): Promise<MousepadComparison[]> => {
    const rows = await repo.listComparisons();
    return rows
      .filter((row) => row.status === "published")
      .map(toPublicComparison);
  },
);

export async function getPublicComparisonBySlug(
  slug: string,
): Promise<MousepadComparison | null> {
  const row = await repo.getComparisonBySlug(slug);
  if (!row || row.status !== "published") return null;
  return toPublicComparison(row);
}

export async function getPublicComparisonSlugs(): Promise<string[]> {
  return (await getPublicComparisons()).map((comparison) => comparison.slug);
}

/**
 * Resolves a comparison page against the public pad and comparison readers.
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
