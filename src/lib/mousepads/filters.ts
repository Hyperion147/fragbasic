import { mousepads } from "@/data/mousepads/mousepads";
import type {
  IndiaAvailability,
  Mousepad,
  MousepadCategory,
  MousepadSurface,
} from "@/types/mousepad";
import {
  getMousepadCompany,
  getMousepadFullName,
} from "../mousepads";
import { formatValue } from "../utils/format";

export const ALL_FILTER_VALUE = "all" as const;

export type MousepadFilterValue = typeof ALL_FILTER_VALUE;

// Re-export category and related types so consumers can import them from the main barrel
export type {
  IndiaAvailability,
  MousepadCategory,
  MousepadSurface,
} from "@/types/mousepad";

export type MousepadSortKey =
  | "control"
  | "speed"
  | "stopping-power"
  | "micro-adjustments"
  | "humidity-resistance";

export interface MousepadFilters {
  brand: string | MousepadFilterValue;
  category: MousepadCategory | MousepadFilterValue;
  surface: MousepadSurface | MousepadFilterValue;
  indiaAvailability: IndiaAvailability | MousepadFilterValue;
  sort: MousepadSortKey;
}

export interface FilterOption<T extends string> {
  label: string;
  value: T;
}

export interface SimilarMousepadOptions {
  excludeSameBrand?: boolean;
  limit?: number;
}

const companyOrder = [
  "Artisan",
  "LGG",
  "SteelSeries",
  "Xraypad",
  "Zowie",
] as const;

const categoryOrder: MousepadCategory[] = [
  "mud",
  "control",
  "balanced-control",
  "balanced-speed",
  "speed",
  "glass",
];

const surfaceOrder: MousepadSurface[] = ["cloth", "hybrid", "glass", "hard"];

const indiaAvailabilityOrder: IndiaAvailability[] = [
  "available",
  "limited",
  "import-only",
  "unavailable",
  "unknown",
];

export const mousepadSortOptions: FilterOption<MousepadSortKey>[] = [
  { label: "Most control", value: "control" },
  { label: "Most speed", value: "speed" },
  { label: "Best stopping power", value: "stopping-power" },
  { label: "Best micro-adjustments", value: "micro-adjustments" },
  { label: "Best humidity resistance", value: "humidity-resistance" },
];

export function getMousepadBrandOptions(
  pads: Mousepad[] = mousepads
): FilterOption<string>[] {
  const companies = new Set(pads.map((pad) => getMousepadCompany(pad)));

  return companyOrder
    .filter((company) => companies.has(company))
    .map((company) => ({
      label: company,
      value: company,
    }));
}

export function getMousepadCategoryOptions(
  pads: Mousepad[] = mousepads
): FilterOption<MousepadCategory>[] {
  const categories = new Set(pads.map((pad) => pad.category));

  return categoryOrder
    .filter((category) => categories.has(category))
    .map((category) => ({
      label: formatValue(category),
      value: category,
    }));
}

export function getMousepadSurfaceOptions(
  pads: Mousepad[] = mousepads
): FilterOption<MousepadSurface>[] {
  const surfaces = new Set(pads.map((pad) => pad.surface));

  return surfaceOrder
    .filter((surface) => surfaces.has(surface))
    .map((surface) => ({
      label: formatValue(surface),
      value: surface,
    }));
}

export function getIndiaAvailabilityOptions(
  pads: Mousepad[] = mousepads
): FilterOption<IndiaAvailability>[] {
  const statuses = new Set(pads.map((pad) => pad.availability.india));

  return indiaAvailabilityOrder
    .filter((status) => statuses.has(status))
    .map((status) => ({
      label: formatValue(status),
      value: status,
    }));
}

export function getDefaultMousepadFilters(): MousepadFilters {
  return {
    brand: ALL_FILTER_VALUE,
    category: ALL_FILTER_VALUE,
    surface: ALL_FILTER_VALUE,
    indiaAvailability: ALL_FILTER_VALUE,
    sort: "control",
  };
}

export function filterMousepads(
  pads: Mousepad[],
  filters: MousepadFilters
): Mousepad[] {
  return [...pads]
    .filter((pad) => {
      if (
        filters.brand !== ALL_FILTER_VALUE &&
        getMousepadCompany(pad) !== filters.brand
      ) {
        return false;
      }

      if (
        filters.category !== ALL_FILTER_VALUE &&
        pad.category !== filters.category
      ) {
        return false;
      }

      if (
        filters.surface !== ALL_FILTER_VALUE &&
        pad.surface !== filters.surface
      ) {
        return false;
      }

      if (
        filters.indiaAvailability !== ALL_FILTER_VALUE &&
        pad.availability.india !== filters.indiaAvailability
      ) {
        return false;
      }

      return true;
    })
    .sort((left, right) => {
      const scoreDifference =
        getMousepadSortValue(right, filters.sort) -
        getMousepadSortValue(left, filters.sort);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return getMousepadFullName(left).localeCompare(getMousepadFullName(right));
    });
}

function getMousepadSortValue(mousepad: Mousepad, sort: MousepadSortKey) {
  switch (sort) {
    case "speed":
      return mousepad.feel.speed;
    case "stopping-power":
      return mousepad.feel.stoppingPower;
    case "micro-adjustments":
      return mousepad.feel.microAdjustments;
    case "humidity-resistance":
      return mousepad.environment.humidityResistance;
    case "control":
    default:
      return mousepad.feel.control;
  }
}
