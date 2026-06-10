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
      primary: "oklch(0.22 0.01 260)",
      secondary: "oklch(0.28 0.01 260)",
      accent: "oklch(0.74 0.16 145)",
      available: true,
    }
  }

  return (
    mousepad.visuals.colorways.find(
      (colorway) => colorway.slug === mousepad.visuals.defaultColorway
    ) ?? mousepad.visuals.colorways[0]
  )
}