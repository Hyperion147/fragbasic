import { mousepads } from "@/data/mousepads/mousepads";
import type { Mousepad, MousepadColorway } from "@/types/mousepad";

// Re-export centralized format helpers (and the legacy name)
export {
  formatMousepadValue,
  formatValue,
  formatPrice,
  formatSize,
} from "./utils/format";

// Core data access (keep these here as the primary public API surface)
export function getAllMousepads() {
  return mousepads;
}

export function getMousepadBySlug(slug: string): Mousepad | undefined {
  return mousepads.find((pad) => pad.slug === slug);
}

export function getMousepadFullName(mousepad: Mousepad) {
  return `${mousepad.brand} ${mousepad.name}`;
}

export function getMousepadCompany(mousepad: Mousepad) {
  if (mousepad.brand === "Artisan") {
    return "Artisan";
  }

  if (
    mousepad.brand === "LGG" ||
    mousepad.brand === "Lethal Gaming Gear" ||
    mousepad.brand === "Pulsar x LGG"
  ) {
    return "LGG";
  }

  return mousepad.brand;
}

// Re-export everything from the focused submodules for a single import path.
// Consumers can still `import { filterMousepads, getSimilarMousepads, getDefaultColorway } from "@/lib/mousepads"`
export * from "./mousepads/filters";
export * from "./mousepads/visuals";
export * from "./mousepads/similarity";
