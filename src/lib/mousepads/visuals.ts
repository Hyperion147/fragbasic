import type { Mousepad, MousepadCategory, MousepadColorway } from "@/types/mousepad";
import { getCalibratedFeel } from "./calibration";

export const SPEED_CONTROL_ZONES = [
  { label: "Mud", start: 0, end: 18 },
  { label: "Control", start: 18, end: 36 },
  { label: "Balanced Control", start: 36, end: 52 },
  { label: "Balanced Speed", start: 52, end: 68 },
  { label: "Speed", start: 68, end: 84 },
  { label: "Glass", start: 84, end: 100 },
] as const;

const speedControlBasePosition: Record<MousepadCategory, number> = {
  mud: 14,
  control: 30,
  "balanced-control": 44,
  "balanced-speed": 59,
  speed: 74,
  glass: 92,
};

const speedControlRange: Record<MousepadCategory, { min: number; max: number }> = {
  mud: { min: 0, max: 18 },
  control: { min: 18, max: 36 },
  "balanced-control": { min: 36, max: 52 },
  "balanced-speed": { min: 52, max: 68 },
  speed: { min: 68, max: 84 },
  glass: { min: 84, max: 100 },
};

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

export function getMousepadSpeedControlPosition(mousepad: Mousepad) {
  const {
    speed,
    control,
    stoppingPower,
    staticFriction,
    dynamicFriction,
    microAdjustments,
  } = getCalibratedFeel(mousepad, "universal");

  const frictionAverage = (staticFriction + dynamicFriction) / 2;
  const feelAdjustment =
    (speed - control) * 2.5 +
    (5 - stoppingPower) * 0.9 +
    (5 - frictionAverage) * 1.2 +
    (microAdjustments - 5) * 0.35;

  const position = speedControlBasePosition[mousepad.category] + feelAdjustment;
  const range = speedControlRange[mousepad.category];

  return clamp(position, range.min, range.max);
}

export function getSpeedControlZoneLabel(position: number) {
  return (
    SPEED_CONTROL_ZONES.find(
      (zone) => position >= zone.start && position < zone.end
    )?.label ?? "Glass"
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
