import { mousepads } from "@/data/mousepads/mousepads";
import type {
  IndiaAvailability,
  Mousepad,
  MousepadCategory,
  MousepadColorway,
  MousepadSurface,
} from "@/types/mousepad";

export const ALL_FILTER_VALUE = "all" as const;

export type MousepadFilterValue = typeof ALL_FILTER_VALUE;

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

const companyOrder = ["Artisan", "LGG"] as const;

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

export function getAllMousepads() {
  return mousepads;
}

export function getMousepadBySlug(slug: string): Mousepad | undefined {
  return mousepads.find((pad) => pad.slug === slug);
}

export function getMousepadFullName(mousepad: Mousepad) {
  return `${mousepad.brand} ${mousepad.name}`;
}

export function formatMousepadValue(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
      label: formatMousepadValue(category),
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
      label: formatMousepadValue(surface),
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
      label: formatMousepadValue(status),
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

export function getDefaultColorway(mousepad?: Mousepad): MousepadColorway {
  if (!mousepad?.visuals?.colorways?.length) {
    return {
      name: "Default",
      slug: "default",
      color: "#4b5563",
      available: true,
    };
  }

  return (
    mousepad.visuals.colorways.find(
      (colorway) => colorway.slug === mousepad.visuals.defaultColorway
    ) ?? mousepad.visuals.colorways[0]
  );
}

export function getColorwayBySlug(mousepad: Mousepad | undefined, slug?: string) {
  if (!mousepad?.visuals?.colorways?.length) {
    return getDefaultColorway(mousepad);
  }

  if (!slug) {
    return getDefaultColorway(mousepad);
  }

  return (
    mousepad.visuals.colorways.find((colorway) => colorway.slug === slug) ??
    getDefaultColorway(mousepad)
  );
}

export function getFeaturedColorwaySlug(mousepad?: Mousepad) {
  if (!mousepad) return undefined;

  if (mousepad.slug === "artisan-zero-soft") return "orange";
  if (mousepad.slug === "pulsar-lgg-hyperion-soft") return "midnight";

  return mousepad.visuals.defaultColorway;
}

export function getMousepadChartColors(
  mousepad?: Mousepad,
  colorwaySlug?: string
) {
  const colorway = getColorwayBySlug(mousepad, colorwaySlug);

  return {
    solid: colorway.color,
    fill: colorway.color,
    stroke: colorway.color,
  };
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

const speedControlAnchors: Record<MousepadCategory, number> = {
  mud: 8,
  control: 24,
  "balanced-control": 42,
  "balanced-speed": 60,
  speed: 79,
  glass: 94,
};

export function getMousepadSpeedControlPosition(mousepad: Mousepad) {
  const anchor = speedControlAnchors[mousepad.category];
  const speedOffset = (mousepad.feel.speed - 5) * 3.2;

  return Math.max(0, Math.min(100, anchor + speedOffset));
}

export function getSpeedControlZoneLabel(position: number) {
  if (position < 16.7) return "Mud";
  if (position < 33.4) return "Control";
  if (position < 50.1) return "Balanced Control";
  if (position < 66.8) return "Balanced Speed";
  if (position < 83.5) return "Speed";
  return "Glass";
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
