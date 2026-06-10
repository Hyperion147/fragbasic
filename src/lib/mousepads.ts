import { mousepads } from "@/data/mousepads"
import type {
  MousepadCategory,
  MousepadGame,
  Sensitivity,
} from "@/types/mousepad"

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

export function getMousepadsByCategory(category: MousepadCategory) {
  return mousepads.filter((pad) => pad.category === category)
}

export function getRecommendedMousepads({
  game,
  sensitivity,
  category,
}: {
  game?: MousepadGame
  sensitivity?: Sensitivity
  category?: MousepadCategory
}) {
  return mousepads.filter((pad) => {
    const gameMatch = game
      ? pad.recommendedFor.games.includes(game)
      : true

    const sensitivityMatch = sensitivity
      ? pad.recommendedFor.sensitivity.includes(sensitivity)
      : true

    const categoryMatch = category
      ? pad.category === category
      : true

    return gameMatch && sensitivityMatch && categoryMatch
  })
}

export function sortByControlScore() {
  return [...mousepads].sort((a, b) => b.feel.control - a.feel.control)
}

export function sortBySpeedScore() {
  return [...mousepads].sort((a, b) => b.feel.speed - a.feel.speed)
}

export function sortByHumidityResistance() {
  return [...mousepads].sort(
    (a, b) => b.environment.humidityResistance - a.environment.humidityResistance
  )
}