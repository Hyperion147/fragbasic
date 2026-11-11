import type { MousepadComparison } from "@/types/comparison";

const comparisonCompanyTags = new Set(["Artisan", "LGG", "Pulsar"]);

export function getRelatedComparisons(
  mousepadSlug: string,
  entries: readonly MousepadComparison[],
) {
  return entries.filter(
    (comparison) =>
      comparison.leftSlug === mousepadSlug ||
      comparison.rightSlug === mousepadSlug,
  );
}

export function getComparisonTagOptions(entries: readonly MousepadComparison[]) {
  return Array.from(
    new Set(
      entries
        .flatMap((comparison) => comparison.tags)
        .filter((tag) => !comparisonCompanyTags.has(tag)),
    ),
  ).sort((left, right) => left.localeCompare(right));
}
