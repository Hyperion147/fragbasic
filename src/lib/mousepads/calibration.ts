import type { Mousepad, MousepadFeelRating } from "@/types/mousepad";

export type FeelMetricKey = Exclude<keyof MousepadFeelRating, "ratingConfidence">;
export type FeelScaleFamily = "mousepad" | "glass";
export type FeelScaleMode = "native" | "universal";

type CalibrationBand = {
  min: number;
  max: number;
  note: string;
};

type CalibrationMetricBands = Record<FeelScaleFamily, CalibrationBand>;

export const FEEL_METRICS: Array<{
  label: string;
  shortLabel: string;
  key: FeelMetricKey;
}> = [
  { label: "Speed", shortLabel: "Speed", key: "speed" },
  { label: "Control", shortLabel: "Control", key: "control" },
  { label: "Stopping Power", shortLabel: "Stopping", key: "stoppingPower" },
  { label: "Static Friction", shortLabel: "Static", key: "staticFriction" },
  { label: "Dynamic Friction", shortLabel: "Dynamic", key: "dynamicFriction" },
  { label: "Micro-adjustments", shortLabel: "Micro", key: "microAdjustments" },
];

export const FEEL_SCALE_LABELS: Record<FeelScaleMode, string> = {
  native: "Native surface scale",
  universal: "Universal glide scale",
};

export const FEEL_SCALE_DESCRIPTIONS: Record<FeelScaleMode, string> = {
  native:
    "Scores are read inside each pad's own surface family, so a controlled glasspad can still show strong glass speed.",
  universal:
    "Scores are calibrated onto one physical scale, where glass speed starts above fast cloth and glass control/friction compress lower.",
};

export const FEEL_CALIBRATION: Record<FeelMetricKey, CalibrationMetricBands> = {
  speed: {
    mousepad: {
      min: 1,
      max: 7.4,
      note: "Cloth, hybrid, and soft hard pads occupy the main fabric glide range.",
    },
    glass: {
      min: 7.6,
      max: 10,
      note: "Even controlled glass stays above fast cloth in absolute glide freedom.",
    },
  },
  control: {
    mousepad: {
      min: 1,
      max: 10,
      note: "Fabric pads can use weave, base give, and texture for full-range control.",
    },
    glass: {
      min: 1.2,
      max: 6.8,
      note: "Glass control is relative to glass and does not equal cloth braking.",
    },
  },
  stoppingPower: {
    mousepad: {
      min: 1,
      max: 10,
      note: "Fabric pads can deliver the strongest physical braking.",
    },
    glass: {
      min: 1,
      max: 6.5,
      note: "Glass stopping mostly comes from texture, skates, and hand control.",
    },
  },
  staticFriction: {
    mousepad: {
      min: 1,
      max: 10,
      note: "Fabric can generate much higher initial resistance.",
    },
    glass: {
      min: 1,
      max: 5.8,
      note: "Glass reduces initial resistance even when tuned for control.",
    },
  },
  dynamicFriction: {
    mousepad: {
      min: 1,
      max: 10,
      note: "Fabric surfaces can stay resistant through motion.",
    },
    glass: {
      min: 1,
      max: 5.2,
      note: "In-motion glass friction stays low compared with cloth and hybrid pads.",
    },
  },
  microAdjustments: {
    mousepad: {
      min: 1,
      max: 9.3,
      note: "Fabric micro-adjustment freedom depends heavily on surface and base.",
    },
    glass: {
      min: 8.4,
      max: 10,
      note: "Low start friction makes tiny corrections a glass strength.",
    },
  },
};

export function getFeelScaleFamily(mousepad: Mousepad): FeelScaleFamily {
  return mousepad.category === "glass" || mousepad.surface === "glass"
    ? "glass"
    : "mousepad";
}

export function hasMixedFeelScaleFamilies(mousepads: Mousepad[]) {
  return new Set(mousepads.map(getFeelScaleFamily)).size > 1;
}

export function getFeelScaleModesForComparison(
  mousepads: Mousepad[]
): FeelScaleMode[] {
  return hasMixedFeelScaleFamilies(mousepads)
    ? ["native", "universal"]
    : ["native"];
}

export function getCalibratedFeelValue(
  mousepad: Mousepad,
  key: FeelMetricKey,
  mode: FeelScaleMode = "native"
) {
  const nativeValue = mousepad.feel[key];

  if (mode === "native") {
    return nativeValue;
  }

  const family = getFeelScaleFamily(mousepad);
  const band = FEEL_CALIBRATION[key][family];

  return roundToOne(mapRange(nativeValue, 1, 10, band.min, band.max));
}

export function getCalibratedFeel(
  mousepad: Mousepad,
  mode: FeelScaleMode = "native"
): Record<FeelMetricKey, number> {
  return Object.fromEntries(
    FEEL_METRICS.map((metric) => [
      metric.key,
      getCalibratedFeelValue(mousepad, metric.key, mode),
    ])
  ) as Record<FeelMetricKey, number>;
}

export function formatCalibratedFeelValue(
  mousepad: Mousepad,
  key: FeelMetricKey,
  mode: FeelScaleMode = "native"
) {
  return getCalibratedFeelValue(mousepad, key, mode).toFixed(1);
}

function mapRange(
  value: number,
  sourceMin: number,
  sourceMax: number,
  targetMin: number,
  targetMax: number
) {
  const normalized = (clamp(value, sourceMin, sourceMax) - sourceMin) /
    (sourceMax - sourceMin);

  return targetMin + normalized * (targetMax - targetMin);
}

function roundToOne(value: number) {
  return Math.round(value * 10) / 10;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
