import type { FinderInput } from "./types";

export function mapSensitivityBandToFinderValue(
  sensitivityBand: "low" | "medium" | "high"
): FinderInput["sensitivity"] {
  // Based on research across Gamingsmart (sens converter + guides), Rocket Jump Ninja,
  // Aimlabs/Voltaic cm/360 data, prosettings.net, YouTube sens guides (e.g. "best mouse sensitivity guide"),
  // mouse-sensitivity.com polls, and community (Reddit FPSAimTrainer etc.):
  // - High Sensitivity users: typically < ~28-30 cm/360 (wrist dominant, precise micro-corrections, fast reactions).
  //   Common for some tracking or close-range; favors control/stopping pads.
  // - Medium/Balanced: 30-45/50 cm/360 (most recommended "sweet spot" for versatility across tac/tracking games;
  //   mix of wrist + arm. Pros often cluster here for CS/Val ~40-55cm, Apex ~35-45cm).
  // - Low Sensitivity users: > ~45-60+ cm/360 (arm dominant, large flicks/tracking, stable for long range).
  //   Favors faster pads for quick large movements + micro for accuracy.
  // UI labels in finder-form now use clear "High Sensitivity"/"Low Sensitivity" to match common cm/360 conventions
  // (lower cm = higher physical sensitivity). The internal mapping inverts to bias pad scoring correctly:
  // user's "low" band (high sens, small cm) → internal "high" (control bias for pads).
  // user's "high" band (low sens, large cm) → internal "low" (speed bias for pads).
  if (sensitivityBand === "low") {
    return "high";
  }

  if (sensitivityBand === "high") {
    return "low";
  }

  return "medium";
}

export function toggleGameSelection(
  selectedGames: string[],
  game: string,
  max = 3
): string[] {
  if (selectedGames.includes(game)) {
    return selectedGames.filter((selectedGame) => selectedGame !== game);
  }

  if (selectedGames.length >= max) {
    return selectedGames;
  }

  return [...selectedGames, game];
}
