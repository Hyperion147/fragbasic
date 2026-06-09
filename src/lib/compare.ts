// src/lib/compare.ts

import { getMousepadBySlug } from "@/lib/mousepads"

export function getMousepadComparison(slug: string) {
  const [leftSlug, rightSlug] = slug.split("-vs-")

  const left = getMousepadBySlug(leftSlug)
  const right = getMousepadBySlug(rightSlug)

  if (!left || !right) {
    return null
  }

  return {
    left,
    right,
    title: `${left.name} vs ${right.name}`,
    slug,
  }
}