import type { Mousepad } from "@/types/mousepad";

// Re-export centralized format helpers (and the legacy name)
export {
  formatMousepadValue,
  formatValue,
  formatPrice,
  formatSize,
} from "./utils/format";

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
// Consumers can still `import { filterMousepads, getDefaultColorway } from "@/lib/mousepads"`
export * from "./mousepads/filters";
export * from "./mousepads/visuals";
export * from "./mousepads/calibration";
