import type { MousepadComparison } from "@/data/comparisons";
import { getComparisonBySlug } from "@/lib/comparisons";
import type { Mousepad } from "@/types/mousepad";
import { getPublicPadBySlug } from "./pads";

export type PublicComparisonPageData = {
  comparison: MousepadComparison;
  left: Mousepad;
  right: Mousepad;
};

/**
 * Resolves a comparison page against the public pad readers so either side of
 * the matchup can come from the database while comparisons stay on static data.
 */
export async function getPublicComparisonPageData(
  slug: string,
): Promise<PublicComparisonPageData | null> {
  const comparison = getComparisonBySlug(slug);

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
