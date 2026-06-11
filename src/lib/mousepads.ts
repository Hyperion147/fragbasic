import { mousepads } from "@/data/mousepads"
import type { Mousepad, MousepadColorway } from "@/types/mousepad"

export function getAllMousepads() {
  return mousepads
}

export function getMousepadBySlug(slug: string): Mousepad | undefined {
  return mousepads.find((pad) => pad.slug === slug)
}

export function getDefaultColorway(
  mousepad?: Mousepad
): MousepadColorway {
  if (!mousepad?.visuals?.colorways?.length) {
    return {
      name: "Default",
      slug: "default",
      color: "#4b5563",
      available: true,
    }
  }

  return (
    mousepad.visuals.colorways.find(
      (colorway) => colorway.slug === mousepad.visuals.defaultColorway
    ) ?? mousepad.visuals.colorways[0]
  )
}

export function getColorwayBySlug(mousepad: Mousepad | undefined, slug?: string) {
  if (!mousepad?.visuals?.colorways?.length) {
    return getDefaultColorway(mousepad)
  }

  if (!slug) {
    return getDefaultColorway(mousepad)
  }

  return (
    mousepad.visuals.colorways.find((colorway) => colorway.slug === slug) ??
    getDefaultColorway(mousepad)
  )
}

export function getFeaturedColorwaySlug(mousepad?: Mousepad) {
  if (!mousepad) return undefined

  if (mousepad.slug === "artisan-zero-soft") return "orange"
  if (mousepad.slug === "pulsar-lgg-hyperion-soft") return "midnight"

  return mousepad.visuals.defaultColorway
}

export function getMousepadChartColors(
  mousepad?: Mousepad,
  colorwaySlug?: string
) {
  const colorway = getColorwayBySlug(mousepad, colorwaySlug)

  return {
    solid: colorway.color,
    fill: colorway.color,
    stroke: colorway.color,
  }
}
