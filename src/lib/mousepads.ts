// src/lib/mousepads.ts

import { mousepads } from "@/data/mousepads"

export function getAllMousepads() {
  return mousepads
}

export function getMousepadBySlug(slug: string) {
  return mousepads.find((pad) => pad.slug === slug)
}

export function getMousepadsByBrand(brand: string) {
  return mousepads.filter(
    (pad) => pad.brand.toLowerCase() === brand.toLowerCase()
  )
}

export function getRecommendedMousepads({
  game,
  category,
}: {
  game?: string
  category?: string
}) {
  return mousepads.filter((pad) => {
    const matchesGame = game
      ? pad.recommendedFor.games.includes(game as never)
      : true

    const matchesCategory = category
      ? pad.category === category
      : true

    return matchesGame && matchesCategory
  })
}