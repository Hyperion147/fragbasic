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
  { label: "Glide speed", shortLabel: "Glide", key: "speed" },
  { label: "Aim control", shortLabel: "Control", key: "control" },
  { label: "Stopping power", shortLabel: "Stopping", key: "stoppingPower" },
  { label: "Start feel", shortLabel: "Start", key: "staticFriction" },
  { label: "Moving friction", shortLabel: "Moving", key: "dynamicFriction" },
  { label: "Small corrections", shortLabel: "Corrections", key: "microAdjustments" },
];

export const FEEL_SCALE_LABELS: Record<FeelScaleMode, string> = {
  native: "Same-surface feel",
  universal: "Cross-surface feel",
};

export const FEEL_SCALE_DESCRIPTIONS: Record<FeelScaleMode, string> = {
  native:
    "Best when all selected pads use a similar surface. Glass and cloth are not forced into the same meaning here.",
  universal:
    "Best for glass-vs-cloth comparisons. This view adjusts the feel so fast glass does not look equal to fast cloth.",
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

export function formatFeelLabel(
  value: number,
  key: FeelMetricKey
) {
  const band = getFivePointBand(value);

  const labels: Record<FeelMetricKey, [string, string, string, string, string]> = {
    speed: ["Very slow", "Slow", "Balanced", "Fast", "Very fast"],
    control: [
      "Loose",
      "Light control",
      "Balanced",
      "Controlled",
      "Locked-in",
    ],
    stoppingPower: ["Weak", "Mild", "Reliable", "Strong", "Very strong"],
    staticFriction: [
      "Very easy start",
      "Easy start",
      "Normal start",
      "Firm start",
      "Sticky start",
    ],
    dynamicFriction: [
      "Free glide",
      "Smooth glide",
      "Balanced glide",
      "Draggy glide",
      "Very draggy",
    ],
    microAdjustments: [
      "Restricted",
      "Slightly limited",
      "Normal",
      "Easy",
      "Very easy",
    ],
  };

  return labels[key][band];
}

export function formatEnvironmentLabel(value: number) {
  return ["Poor", "Okay", "Good", "Very good", "Excellent"][
    getFivePointBand(value)
  ];
}

export function formatConfidenceLabel(value: Mousepad["feel"]["ratingConfidence"]) {
  const labels: Record<Mousepad["feel"]["ratingConfidence"], string> = {
    official: "Official claim",
    estimated: "Estimated",
    community: "Community-backed",
    "personal-tested": "Personally tested",
  };

  return labels[value];
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

function getFivePointBand(value: number) {
  if (value < 2.5) return 0;
  if (value < 4.5) return 1;
  if (value < 6.5) return 2;
  if (value < 8.5) return 3;
  return 4;
}
