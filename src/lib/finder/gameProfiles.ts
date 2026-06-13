export type GameProfileId =
  | "tactical"
  | "tracking"
  | "mixed"
  | "aim-trainer"
  | "general";

export interface GameProfile {
  id: GameProfileId;
  targetSpeed: number;
  targetControl: number;
  targetStoppingPower: number;
  controlWeight: number;
  speedWeight: number;
  stoppingPowerWeight: number;
  consistencyWeight: number;
  labels: string[];
}

export const gameProfiles: Record<GameProfileId, GameProfile> = {
  tactical: {
    id: "tactical",
    targetSpeed: 5.2,
    targetControl: 8.7,
    targetStoppingPower: 8.7,
    controlWeight: 1.25,
    speedWeight: 0.75,
    stoppingPowerWeight: 1.3,
    consistencyWeight: 1.25,
    labels: ["Valorant", "CS2", "tactical FPS"],
    // Note: Tactical FPS players (per Gamingsmart, RJN, prosettings, Voltaic data) often use 35-60+ cm/360 (lower sens)
    // → bias toward control/stopping pads. Adjust your sensitivityBand in the finder accordingly.
  },
  tracking: {
    id: "tracking",
    targetSpeed: 7.7,
    targetControl: 6.8,
    targetStoppingPower: 6.7,
    controlWeight: 0.8,
    speedWeight: 1.25,
    stoppingPowerWeight: 0.75,
    consistencyWeight: 1,
    labels: ["Apex", "Overwatch", "The Finals", "tracking"],
    // Tracking/arena games: common 20-50 cm/360 (higher sens for flicks/tracking). Faster pads often preferred.
  },
  mixed: {
    id: "mixed",
    targetSpeed: 6.7,
    targetControl: 7.5,
    targetStoppingPower: 7.4,
    controlWeight: 1,
    speedWeight: 1,
    stoppingPowerWeight: 1,
    consistencyWeight: 1,
    labels: ["Fortnite", "mixed shooters"],
  },
  "aim-trainer": {
    id: "aim-trainer",
    targetSpeed: 6.6,
    targetControl: 7.3,
    targetStoppingPower: 7.2,
    controlWeight: 0.85,
    speedWeight: 0.85,
    stoppingPowerWeight: 0.85,
    consistencyWeight: 0.9,
    labels: ["aim trainers"],
  },
  general: {
    id: "general",
    targetSpeed: 6.4,
    targetControl: 7.4,
    targetStoppingPower: 7.3,
    controlWeight: 1,
    speedWeight: 1,
    stoppingPowerWeight: 1,
    consistencyWeight: 1,
    labels: ["general FPS"],
  },
};

const gameAliases: Record<string, GameProfileId> = {
  valorant: "tactical",
  val: "tactical",
  cs: "tactical",
  cs2: "tactical",
  "counter-strike": "tactical",
  "counter strike": "tactical",
  siege: "tactical",
  "rainbow six siege": "tactical",
  "rainbow six": "tactical",
  r6: "tactical",
  r6s: "tactical",
  tactical: "tactical",
  tacfps: "tactical",
  "tac fps": "tactical",
  apex: "tracking",
  "apex legends": "tracking",
  overwatch: "tracking",
  "overwatch 2": "tracking",
  ow2: "tracking",
  ow: "tracking",
  "the finals": "tracking",
  finals: "tracking",
  tracking: "tracking",
  fortnite: "mixed",
  mixed: "mixed",
  "general-fps": "mixed",
  "general fps": "mixed",
  aimlab: "aim-trainer",
  "aim lab": "aim-trainer",
  kovaaks: "aim-trainer",
  "kovaak's": "aim-trainer",
  "aim trainer": "aim-trainer",
};

export function getGameProfileForGame(game: string): GameProfile {
  const profileId = getGameProfileIdForGame(game);

  return gameProfiles[profileId];
}

export function getGameProfileIdForGame(game: string): GameProfileId {
  const key = game.trim().toLowerCase();

  return gameAliases[key] ?? "general";
}

export function getCombinedGameProfile(games: string[]): GameProfile {
  const profiles = games.length
    ? games.map(getGameProfileForGame)
    : [gameProfiles.general];

  const weightedProfiles = profiles.map((profile) => ({
    profile,
    // Aim trainers should support the user's main games, not dominate them.
    weight: profile.id === "aim-trainer" ? 0.45 : 1,
  }));
  const totalWeight = weightedProfiles.reduce(
    (total, entry) => total + entry.weight,
    0
  );

  return {
    id: profiles[0]?.id ?? "general",
    targetSpeed: weightedAverage(weightedProfiles, "targetSpeed", totalWeight),
    targetControl: weightedAverage(
      weightedProfiles,
      "targetControl",
      totalWeight
    ),
    targetStoppingPower: weightedAverage(
      weightedProfiles,
      "targetStoppingPower",
      totalWeight
    ),
    controlWeight: weightedAverage(
      weightedProfiles,
      "controlWeight",
      totalWeight
    ),
    speedWeight: weightedAverage(weightedProfiles, "speedWeight", totalWeight),
    stoppingPowerWeight: weightedAverage(
      weightedProfiles,
      "stoppingPowerWeight",
      totalWeight
    ),
    consistencyWeight: weightedAverage(
      weightedProfiles,
      "consistencyWeight",
      totalWeight
    ),
    labels: Array.from(new Set(profiles.flatMap((profile) => profile.labels))),
  };
}

function weightedAverage(
  entries: Array<{ profile: GameProfile; weight: number }>,
  key: keyof Pick<
    GameProfile,
    | "targetSpeed"
    | "targetControl"
    | "targetStoppingPower"
    | "controlWeight"
    | "speedWeight"
    | "stoppingPowerWeight"
    | "consistencyWeight"
  >,
  totalWeight: number
) {
  return (
    entries.reduce(
      (total, entry) => total + entry.profile[key] * entry.weight,
      0
    ) / totalWeight
  );
}
