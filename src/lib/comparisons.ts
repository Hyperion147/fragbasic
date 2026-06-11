import {
  comparisons,
  type MousepadComparison,
} from "@/data/comparisons";

const comparisonCompanyTags = new Set(["Artisan", "LGG", "Pulsar"]);

export function getAllComparisons() {
  return comparisons;
}

export function getComparisonBySlug(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export function getPublishedComparisons() {
  return comparisons.filter((comparison) => comparison.status === "published");
}

export function getDraftComparisons() {
  return comparisons.filter((comparison) => comparison.status === "draft");
}

export function getRelatedComparisons(mousepadSlug: string) {
  return comparisons.filter(
    (comparison) =>
      comparison.leftSlug === mousepadSlug ||
      comparison.rightSlug === mousepadSlug
  );
}

export function getComparisonTagOptions(
  entries: MousepadComparison[] = comparisons
) {
  return Array.from(
    new Set(
      entries
        .flatMap((comparison) => comparison.tags)
        .filter((tag) => !comparisonCompanyTags.has(tag))
    )
  ).sort((left, right) => left.localeCompare(right));
}
