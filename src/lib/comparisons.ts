import { comparisons } from "@/data/comparisons"

export function getAllComparisons() {
  return comparisons
}

export function getPublishedComparisons() {
  return comparisons.filter((comparison) => comparison.status === "published")
}

export function getPlannedComparisons() {
  return comparisons.filter((comparison) => comparison.status === "planned")
}

export function getRelatedComparisons(mousepadSlug: string) {
  return comparisons.filter(
    (comparison) =>
      comparison.leftSlug === mousepadSlug ||
      comparison.rightSlug === mousepadSlug
  )
}
