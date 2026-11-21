import { getCalibratedFeel } from "./calibration";
import { getMousepadSpeedControlPosition } from "./visuals";
import type { Mousepad, MousepadGame, MousepadSurface, MousepadTexture, Sensitivity } from "@/types/mousepad";

export const games = {
  valorant: "VALORANT", cs2: "CS2", apex: "Apex Legends",
  overwatch: "Overwatch", quake: "Quake", fortnite: "Fortnite",
} satisfies Partial<Record<MousepadGame, string>>;

export const feels = {
  control: "Control",
  balanced: "Balanced",
  speed: "Speed",
} as const;

export const surfaces = {
  any: "Any material", cloth: "Cloth", hybrid: "Hybrid", glass: "Glass", hard: "Other hard surfaces",
} satisfies Record<MousepadSurface | "any", string>;

export const textures = {
  any: "Any texture", smooth: "Smooth", "slightly-textured": "Slightly textured", textured: "Textured", rough: "Rough",
} satisfies Record<MousepadTexture["feel"] | "any", string>;

export const sensitivities = {
  any: "Any sensitivity", low: "Low", medium: "Medium", high: "High",
} satisfies Record<Sensitivity | "any", string>;

type Query = Record<string, string | string[] | undefined>;

function choice<T extends string>(value: Query[string], choices: Record<T, string>, fallback: NoInfer<T>): T {
  return typeof value === "string" && Object.hasOwn(choices, value) ? value as T : fallback;
}

export function readFinderPreferences(query: Query) {
  const requestedGames = Array.isArray(query.game) ? query.game : [query.game];
  const budgetText = (Array.isArray(query.budget) ? query.budget[0] : query.budget)?.trim() ?? "";
  const budget = budgetText ? Number(budgetText) : null;
  return {
    feel: choice(query.feel, feels, "balanced"),
    games: (Object.keys(games) as (keyof typeof games)[]).filter((game) => requestedGames.includes(game)),
    budget,
    invalidBudget: budget !== null && (!Number.isSafeInteger(budget) || budget < 1),
    surface: choice(query.surface, surfaces, "any"),
    sensitivity: choice(query.sensitivity, sensitivities, "any"),
    texture: choice(query.texture, textures, "any"),
    humid: query.humid === "on",
    available: query.available === "on",
  };
}

export type FinderPreferences = ReturnType<typeof readFinderPreferences>;

// Editorial targets on the same 1–10 scales used in Universal Compare.
// A balanced pick should be close to the middle, rather than simply scoring high on every axis.
const targets = {
  control: { position: 22, speed: 3, control: 9, stoppingPower: 9 },
  balanced: { position: 50, speed: 5.5, control: 6.5, stoppingPower: 6.5 },
  speed: { position: 86, speed: 9, control: 4, stoppingPower: 4.5 },
};
const textureOrder = ["smooth", "slightly-textured", "textured", "rough"];

function scorePad(pad: Mousepad, prefs: FinderPreferences) {
  const feel = getCalibratedFeel(pad, prefs.surface === "any" ? "universal" : "native");
  const target = targets[prefs.feel];
  const metricDistance = Math.abs(feel.speed - target.speed) * 0.5
    + Math.abs(feel.control - target.control) * 0.25
    + Math.abs(feel.stoppingPower - target.stoppingPower) * 0.25;
  // The catalog position preserves category context when matching glass and fabric together.
  // On a single material, use native ratings so even two glasspads can differ in control.
  const distance = prefs.surface === "any"
    ? metricDistance * 0.65 + Math.abs(getMousepadSpeedControlPosition(pad) - target.position) / 10 * 0.35
    : metricDistance;
  const gameMatches = prefs.games.filter((game) => pad.recommendedFor.games.includes(game));
  const sensitivityMatch = prefs.sensitivity !== "any" && pad.recommendedFor.sensitivity.includes(prefs.sensitivity);
  // Only actively selected preferences contribute. Price and stock never buy a higher rank.
  let score = 55 * (1 - distance / 10);
  if (prefs.games.length) score += 18 * gameMatches.length / prefs.games.length;
  if (sensitivityMatch) score += 8;
  if (prefs.humid) score += 18 * pad.environment.humidityResistance / 10;
  if (prefs.texture !== "any") {
    score += 10 * (1 - Math.abs(textureOrder.indexOf(prefs.texture) - textureOrder.indexOf(pad.texture.feel)) / 3);
  }

  const reasons: string[] = [];
  if (gameMatches.length) reasons.push(`Recommended for ${gameMatches.map((game) => games[game]).join(" and ")}.`);
  if (sensitivityMatch) reasons.push(`Listed for ${prefs.sensitivity} sensitivity.`);
  if (prefs.humid) reasons.push(`Humidity resistance is ${pad.environment.humidityResistance}/10.`);
  if (prefs.texture === pad.texture.feel) reasons.push("Matches your preferred texture.");
  if (!reasons.length) {
    const strength = pad.communityConsensus.strengths.find((note) => note.trim());
    reasons.push(strength || `${textures[pad.texture.feel]} surface in the ${pad.category.replaceAll("-", " ")} category.`);
  }

  const missingGames = prefs.games.filter((game) => !gameMatches.includes(game));
  let tradeoff = pad.communityConsensus.weaknesses.find((note) => note.trim()) || pad.avoidIf?.find((note) => note.trim());
  if (missingGames.length) tradeoff = `The catalog does not list ${missingGames.map((game) => games[game]).join(" or ")} among its recommended games.`;
  else if (prefs.texture !== "any" && prefs.texture !== pad.texture.feel) tradeoff = `Its surface is ${textures[pad.texture.feel].toLowerCase()}.`;
  else if (prefs.sensitivity !== "any" && !sensitivityMatch) tradeoff = `The profile does not list ${prefs.sensitivity} sensitivity.`;

  return { pad, feel, score, distance, reasons, tradeoff };
}

export function findMousepads(pads: readonly Mousepad[], prefs: FinderPreferences) {
  const eligible = pads.filter((pad) =>
    !prefs.invalidBudget &&
    (prefs.surface === "any" || pad.surface === prefs.surface) &&
    (!prefs.available || pad.availability.india === "available") &&
    (prefs.budget === null || (pad.price.inr !== undefined && pad.price.inr > 0 && pad.price.inr <= prefs.budget))
  );
  const ranked = eligible.map((pad) => scorePad(pad, prefs)).sort((a, b) =>
    b.score - a.score || a.distance - b.distance || a.pad.slug.localeCompare(b.pad.slug, "en")
  );
  return { count: eligible.length, matches: ranked.slice(0, 3) };
}

export type FinderMatch = ReturnType<typeof scorePad>;
