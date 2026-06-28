import { getAllIems, getIemBySlug, getIemFullName, getIemsByFragbasicScore } from "@/data/iems/iems";
import type { Iem, IemAvailability, IemDriverType, IemGame, IemSoundSignature } from "@/types/iem";

export { getAllIems, getIemBySlug, getIemFullName, getIemsByFragbasicScore };

export function formatIemRating(value: number) {
  return value.toFixed(1);
}

export function formatIemPrice(iem: Iem) {
  if (iem.buying.priceInr) {
    return `INR ${iem.buying.priceInr.toLocaleString("en-IN")}`;
  }

  if (iem.buying.priceUsd) {
    return `$${iem.buying.priceUsd.toFixed(0)}`;
  }

  return "Price unknown";
}

export function formatIemDriverType(type: IemDriverType) {
  const labels: Record<IemDriverType, string> = {
    "single-dd": "Single DD",
    "dual-dd": "Dual DD",
    hybrid: "Hybrid",
    planar: "Planar",
    ba: "Balanced Armature",
    tribrid: "Tribrid",
  };

  return labels[type];
}

export function formatIemSoundSignature(signature: IemSoundSignature) {
  const labels: Record<IemSoundSignature, string> = {
    "neutral-bright": "Neutral Bright",
    neutral: "Neutral",
    "warm-neutral": "Warm Neutral",
    "v-shape": "V-Shape",
    "mild-v": "Mild V",
    "bass-boosted": "Bass Boosted",
  };

  return labels[signature];
}

export function formatIemGame(game: IemGame) {
  const labels: Record<IemGame, string> = {
    valorant: "VALORANT",
    cs2: "CS2",
    apex: "Apex Legends",
    "rainbow-six-siege": "Rainbow Six Siege",
    overwatch: "Overwatch",
    "general-fps": "General FPS",
    music: "Music",
  };

  return labels[game];
}

export function formatIemAvailability(availability: IemAvailability) {
  const labels: Record<IemAvailability, string> = {
    "in-stock": "In stock",
    limited: "Limited",
    "import-only": "Import only",
    unknown: "Unknown",
  };

  return labels[availability];
}

export function getIemScoreTone(score: number) {
  if (score >= 9.2) {
    return "Unbeatable";
  }

  if (score >= 8.8) {
    return "Excellent";
  }

  if (score >= 8.2) {
    return "Very good";
  }

  return "Good";
}
