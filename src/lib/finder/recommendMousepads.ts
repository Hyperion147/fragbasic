import {
  getCombinedGameProfile,
  getGameProfileIdForGame,
} from "@/lib/finder/gameProfiles";
import type {
  DesiredFeel,
  FinderInput,
  FinderResult,
  MatchLabel,
  PreviousPadFeel,
  TexturePreference,
} from "@/lib/finder/types";
import { getMousepadFullName } from "@/lib/mousepads";
import type { Mousepad, MousepadTexture } from "@/types/mousepad";

const DEFAULT_RESULT_LIMIT = 5;

const scoringWeights = {
  // Core feel should dominate because the finder is primarily about glide fit.
  feelFit: 42,
  // Game overlap catches explicit product recommendations in the database.
  gameFit: 16,
  // Sensitivity nudges speed/control without overriding game intent.
  sensitivityFit: 12,
  // Texture is important, but usually secondary to speed/control.
  textureFit: 10,
  // Humidity matters strongly only when the user says it matters.
  environmentFit: 14,
  // Confidence rewards personally tested/official data and broad consistency.
  confidenceFit: 6,
} as const;

type TargetProfile = {
  speed: number;
  control: number;
  stoppingPower: number;
};

export function recommendMousepads(
  input: FinderInput,
  mousepads: Mousepad[]
): FinderResult[] {
  const gameProfile = getCombinedGameProfile(input.games);
  const target = applyPreferenceAdjustments(
    {
      speed: gameProfile.targetSpeed,
      control: gameProfile.targetControl,
      stoppingPower: gameProfile.targetStoppingPower,
    },
    input
  );

  return mousepads
    .map((mousepad) => {
      const score = clampScore(
        scoreFeelFit(mousepad, target, gameProfile) +
          scoreGameFit(mousepad, input.games) +
          scoreSensitivityFit(mousepad, input.sensitivity) +
          scoreTextureFit(mousepad, input) +
          scoreEnvironmentFit(mousepad, input.humidityConcern) +
          scoreConfidenceFit(mousepad)
      );

      return {
        mousepad,
        score,
        matchLabel: getMatchLabel(score),
        reasons: getRecommendationReasons(mousepad, input, target),
        tradeoffs: getRecommendationTradeoffs(mousepad, input, target),
      };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return getMousepadFullName(left.mousepad).localeCompare(
        getMousepadFullName(right.mousepad)
      );
    })
    .slice(0, DEFAULT_RESULT_LIMIT);
}

function applyPreferenceAdjustments(
  target: TargetProfile,
  input: FinderInput
): TargetProfile {
  const desiredAdjustment = getDesiredFeelAdjustment(input.desiredFeel);
  const previousAdjustment = getPreviousFeelAdjustment(
    input.previousPadFeel ?? "unknown",
    input.desiredFeel
  );
  const sensitivityAdjustment = getSensitivityAdjustment(input.sensitivity);

  return {
    speed: clampRating(
      target.speed +
        desiredAdjustment.speed +
        previousAdjustment.speed +
        sensitivityAdjustment.speed
    ),
    control: clampRating(
      target.control +
        desiredAdjustment.control +
        previousAdjustment.control +
        sensitivityAdjustment.control
    ),
    stoppingPower: clampRating(
      target.stoppingPower +
        desiredAdjustment.stoppingPower +
        previousAdjustment.stoppingPower +
        sensitivityAdjustment.stoppingPower
    ),
  };
}

function scoreFeelFit(
  mousepad: Mousepad,
  target: TargetProfile,
  gameProfile: ReturnType<typeof getCombinedGameProfile>
) {
  const speedCloseness = closenessScore(mousepad.feel.speed, target.speed);
  const controlCloseness = closenessScore(mousepad.feel.control, target.control);
  const stoppingCloseness = closenessScore(
    mousepad.feel.stoppingPower,
    target.stoppingPower
  );
  const totalProfileWeight =
    gameProfile.speedWeight +
    gameProfile.controlWeight +
    gameProfile.stoppingPowerWeight;

  const weightedCloseness =
    (speedCloseness * gameProfile.speedWeight +
      controlCloseness * gameProfile.controlWeight +
      stoppingCloseness * gameProfile.stoppingPowerWeight) /
    totalProfileWeight;

  return weightedCloseness * scoringWeights.feelFit;
}

function scoreGameFit(mousepad: Mousepad, games: string[]) {
  if (games.length === 0) {
    return scoringWeights.gameFit * 0.55;
  }

  const recommendedGameKeys = mousepad.recommendedFor.games.map(
    getGameMatchKey
  );
  const matchedGames = games.filter((game) =>
    recommendedGameKeys.includes(getGameMatchKey(game))
  );

  return (matchedGames.length / games.length) * scoringWeights.gameFit;
}

function scoreSensitivityFit(
  mousepad: Mousepad,
  sensitivity: FinderInput["sensitivity"]
) {
  if (sensitivity === "low") {
    return (
      (normalizeRating(mousepad.feel.speed) * 0.65 +
        normalizeRating(mousepad.feel.microAdjustments) * 0.35) *
      scoringWeights.sensitivityFit
    );
  }

  if (sensitivity === "high") {
    return (
      (normalizeRating(mousepad.feel.control) * 0.5 +
        normalizeRating(mousepad.feel.stoppingPower) * 0.5) *
      scoringWeights.sensitivityFit
    );
  }

  const balancedScore =
    (closenessScore(mousepad.feel.speed, 6.5) +
      closenessScore(mousepad.feel.control, 7.5)) /
    2;

  return balancedScore * scoringWeights.sensitivityFit;
}

function scoreTextureFit(mousepad: Mousepad, input: FinderInput) {
  const preference = input.texturePreference ?? "no-preference";
  const previousFeel = input.previousPadFeel ?? "unknown";
  const preferenceScore = getTexturePreferenceScore(
    mousepad.texture,
    preference
  );
  const previousFeelScore = getPreviousTextureScore(
    mousepad.texture,
    previousFeel
  );

  return (
    ((preferenceScore * 0.65 + previousFeelScore * 0.35) /
      10) *
    scoringWeights.textureFit
  );
}

function scoreEnvironmentFit(mousepad: Mousepad, humidityConcern?: boolean) {
  const environmentConsistency = getEnvironmentConsistency(mousepad);
  const humidityScore = normalizeRating(mousepad.environment.humidityResistance);
  const baseScore = humidityConcern
    ? humidityScore * 0.7 + environmentConsistency * 0.3
    : environmentConsistency * 0.65 + humidityScore * 0.35;
  const humidityPenalty =
    humidityConcern && hasHumidityConcern(mousepad) ? 0.35 : 0;

  return Math.max(0, baseScore - humidityPenalty) * scoringWeights.environmentFit;
}

function scoreConfidenceFit(mousepad: Mousepad) {
  const confidenceScore = {
    "personal-tested": 1,
    official: 0.88,
    community: 0.78,
    estimated: 0.58,
  }[mousepad.feel.ratingConfidence];
  const personalTestingBonus = mousepad.personal.tested ? 0.08 : 0;

  return Math.min(1, confidenceScore + personalTestingBonus) * scoringWeights.confidenceFit;
}

function getRecommendationReasons(
  mousepad: Mousepad,
  input: FinderInput,
  target: TargetProfile
) {
  const reasons: string[] = [];
  const recommendedGameKeys = mousepad.recommendedFor.games.map(
    getGameMatchKey
  );
  const matchedGames = input.games.filter((game) =>
    recommendedGameKeys.includes(getGameMatchKey(game))
  );

  if (matchedGames.length > 0) {
    reasons.push(`Recommended for ${matchedGames.slice(0, 2).join(" and ")}.`);
  }

  if (Math.abs(mousepad.feel.speed - target.speed) <= 1) {
    reasons.push("Speed is close to the target feel.");
  }

  if (mousepad.feel.control >= target.control - 0.5) {
    reasons.push("Control score fits the requested aim profile.");
  }

  if (mousepad.feel.stoppingPower >= target.stoppingPower - 0.5) {
    reasons.push("Stopping power supports cleaner flick stops.");
  }

  if (input.humidityConcern && mousepad.environment.humidityResistance >= 8) {
    reasons.push("Strong humidity resistance for inconsistent conditions.");
  }

  if (
    input.texturePreference &&
    input.texturePreference !== "no-preference" &&
    getTexturePreferenceScore(mousepad.texture, input.texturePreference) >= 8
  ) {
    reasons.push(`Texture aligns with the ${input.texturePreference} preference.`);
  }

  return reasons.slice(0, 4);
}

function getRecommendationTradeoffs(
  mousepad: Mousepad,
  input: FinderInput,
  target: TargetProfile
) {
  const tradeoffs: string[] = [];

  if (mousepad.feel.speed > target.speed + 1.4) {
    tradeoffs.push("May feel quicker than the target glide.");
  }

  if (mousepad.feel.speed < target.speed - 1.4) {
    tradeoffs.push("May feel slower than the target glide.");
  }

  if (mousepad.feel.stoppingPower < target.stoppingPower - 1) {
    tradeoffs.push("Stopping power is lower than the target profile.");
  }

  if (
    (input.previousPadFeel === "rough" || input.texturePreference === "smooth") &&
    (mousepad.texture.feel === "textured" || mousepad.texture.feel === "rough")
  ) {
    tradeoffs.push("Texture may feel more abrasive than preferred.");
  }

  if (input.humidityConcern && hasHumidityConcern(mousepad)) {
    tradeoffs.push("Community or notes mention possible humidity sensitivity.");
  }

  if (mousepad.avoidIf?.length) {
    tradeoffs.push(mousepad.avoidIf[0]);
  }

  return tradeoffs.slice(0, 3);
}

function getMatchLabel(score: number): MatchLabel {
  if (score >= 82) return "Best match";
  if (score >= 68) return "Strong match";
  return "Situational pick";
}

function getDesiredFeelAdjustment(desiredFeel: DesiredFeel): TargetProfile {
  switch (desiredFeel) {
    case "more-control":
      return { speed: -1.3, control: 1.2, stoppingPower: 1.2 };
    case "slightly-more-control":
      return { speed: -0.6, control: 0.6, stoppingPower: 0.5 };
    case "slightly-faster":
      return { speed: 0.7, control: -0.3, stoppingPower: -0.3 };
    case "much-faster":
      return { speed: 1.6, control: -0.8, stoppingPower: -0.8 };
    case "same":
    default:
      return { speed: 0, control: 0, stoppingPower: 0 };
  }
}

function getPreviousFeelAdjustment(
  previousPadFeel: PreviousPadFeel,
  desiredFeel: DesiredFeel
): TargetProfile {
  switch (previousPadFeel) {
    case "muddy":
      return desiredFeel === "more-control"
        ? { speed: -0.2, control: 0.4, stoppingPower: 0.4 }
        : { speed: 0.7, control: -0.4, stoppingPower: -0.3 };
    case "too-fast":
      return { speed: -1, control: 0.9, stoppingPower: 0.9 };
    case "fast":
      return { speed: 0.4, control: -0.2, stoppingPower: -0.2 };
    case "controlled":
      return { speed: -0.2, control: 0.3, stoppingPower: 0.3 };
    case "balanced":
    case "rough":
    case "smooth":
    case "unknown":
    default:
      return { speed: 0, control: 0, stoppingPower: 0 };
  }
}

function getSensitivityAdjustment(
  sensitivity: FinderInput["sensitivity"]
): TargetProfile {
  switch (sensitivity) {
    case "low":
      return { speed: 0.4, control: -0.2, stoppingPower: -0.1 };
    case "high":
      return { speed: -0.5, control: 0.5, stoppingPower: 0.5 };
    case "medium":
    default:
      return { speed: 0, control: 0, stoppingPower: 0 };
  }
}

function getTexturePreferenceScore(
  texture: MousepadTexture,
  preference: TexturePreference
) {
  if (preference === "no-preference") return 7.5;
  if (preference === "balanced") {
    return texture.feel === "slightly-textured" || texture.feel === "smooth"
      ? 9
      : 6.5;
  }
  if (preference === "smooth") {
    return texture.feel === "smooth"
      ? 10
      : texture.feel === "slightly-textured"
        ? 7
        : 4;
  }

  return texture.feel === "textured" || texture.feel === "rough" ? 9 : 5.5;
}

function getPreviousTextureScore(
  texture: MousepadTexture,
  previousPadFeel: PreviousPadFeel
) {
  if (previousPadFeel === "rough") {
    return texture.feel === "smooth" || texture.feel === "slightly-textured"
      ? 9
      : 4;
  }

  if (previousPadFeel === "smooth") {
    return texture.feel === "smooth"
      ? 9
      : texture.feel === "slightly-textured"
        ? 7
        : 4;
  }

  return 7.5;
}

function getEnvironmentConsistency(mousepad: Mousepad) {
  return (
    (mousepad.environment.humidityResistance +
      mousepad.environment.sweatResistance +
      mousepad.environment.dustHairResistance) /
    30
  );
}

function hasHumidityConcern(mousepad: Mousepad) {
  const searchableText = [
    mousepad.environment.notes ?? "",
    mousepad.communityConsensus.weaknesses.join(" "),
    mousepad.avoidIf?.join(" ") ?? "",
  ]
    .join(" ")
    .toLowerCase();
  const humidityConcernPhrases = [
    "humidity-sensitive",
    "humidity sensitive",
    "affected by humidity",
    "humidity issues",
    "humidity sensitivity",
    "humid conditions and sticky",
    "sticky in some humid",
    "sticky-feeling cloth",
    "inconsistent for some users in humidity",
    "inconsistent in humidity",
  ];

  return (
    mousepad.environment.humidityResistance < 6.5 ||
    humidityConcernPhrases.some((phrase) => searchableText.includes(phrase))
  );
}

function closenessScore(value: number, target: number) {
  return Math.max(0, 1 - Math.abs(value - target) / 5);
}

function normalizeRating(value: number) {
  return clampRating(value) / 10;
}

function normalizeGame(game: string) {
  return game.trim().toLowerCase().replace(/\s+/g, "-");
}

function getGameMatchKey(game: string) {
  return getGameProfileIdForGame(game) === "general"
    ? normalizeGame(game)
    : getGameProfileIdForGame(game);
}

function clampRating(value: number) {
  return Math.max(0, Math.min(10, value));
}

function clampScore(value: number) {
  return Math.round(Math.max(0, Math.min(100, value)) * 10) / 10;
}
