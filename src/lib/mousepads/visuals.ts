import type { Mousepad, MousepadCategory, MousepadColorway } from "@/types/mousepad";

const speedControlAnchors: Record<MousepadCategory, number> = {
  mud: 8,
  control: 24,
  "balanced-control": 42,
  "balanced-speed": 60,
  speed: 79,
  glass: 94,
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
