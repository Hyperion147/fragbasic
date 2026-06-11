import { getComparisonBySlug } from "@/lib/comparisons";
import {
  formatMousepadValue,
  getMousepadBySlug,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type NumericFeelKey =
  | "speed"
  | "control"
  | "stoppingPower"
  | "staticFriction"
  | "dynamicFriction"
  | "microAdjustments";

export function getComparisonPageData(slug: string) {
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return null;
  }

  const left = getMousepadBySlug(comparison.leftSlug);
  const right = getMousepadBySlug(comparison.rightSlug);

  if (!left || !right) {
    return null;
  }

  return {
    comparison,
    left,
    right,
  };
}

export function getComparisonWinner(
  left: Mousepad,
  right: Mousepad,
  key: NumericFeelKey
) {
  return left.feel[key] >= right.feel[key] ? left : right;
}

export function getHumidityWinner(left: Mousepad, right: Mousepad) {
  return left.environment.humidityResistance >=
    right.environment.humidityResistance
    ? left
    : right;
}

export function getSaferTacFpsPad(left: Mousepad, right: Mousepad) {
  const leftScore =
    left.feel.control * 0.45 +
    left.feel.stoppingPower * 0.4 +
    left.feel.microAdjustments * 0.15;
  const rightScore =
    right.feel.control * 0.45 +
    right.feel.stoppingPower * 0.4 +
    right.feel.microAdjustments * 0.15;

  return leftScore >= rightScore ? left : right;
}

export function getMoreVersatilePad(left: Mousepad, right: Mousepad) {
  const leftScore =
    left.feel.microAdjustments * 0.35 +
    left.feel.control * 0.25 +
    left.feel.speed * 0.25 +
    left.environment.humidityResistance * 0.15;
  const rightScore =
    right.feel.microAdjustments * 0.35 +
    right.feel.control * 0.25 +
    right.feel.speed * 0.25 +
    right.environment.humidityResistance * 0.15;

  return leftScore >= rightScore ? left : right;
}

export function getPadUseCaseSummary(pad: Mousepad) {
  const games = pad.recommendedFor.games.slice(0, 2).map(formatMousepadValue);

  if (pad.category === "mud" || pad.category === "control") {
    return `Best suited to ${games.join(" and ")} players who want a more planted glide and reliable stopping power.`;
  }

  if (pad.category === "speed") {
    return `Best suited to ${games.join(" and ")} players who want low friction, freer tracking, and easier large corrections.`;
  }

  return `Best suited to ${games.join(" and ")} players who want a more flexible balance of control, speed, and micro-adjustment freedom.`;
}

export function getCompareHeroBody(left: Mousepad, right: Mousepad) {
  const controlWinner = getComparisonWinner(left, right, "control");
  const microWinner = getComparisonWinner(left, right, "microAdjustments");

  return `${getMousepadFullName(controlWinner)} leans harder into control, while ${getMousepadFullName(microWinner)} offers the easier micro-corrections. This matchup mostly comes down to how much glide freedom you want to keep.`;
}

export function getComparisonHighlights(left: Mousepad, right: Mousepad) {
  return [
    {
      label: "Best for raw control",
      value: getMousepadFullName(getComparisonWinner(left, right, "control")),
    },
    {
      label: "Best for micro-corrections",
      value: getMousepadFullName(
        getComparisonWinner(left, right, "microAdjustments")
      ),
    },
    {
      label: "Closest matchup type",
      value: `${formatMousepadValue(left.category)} vs ${formatMousepadValue(
        right.category
      )}`,
    },
  ];
}

export function getCompareVerdictRows(left: Mousepad, right: Mousepad) {
  return [
    {
      label: "More control",
      value: getComparisonWinner(left, right, "control").name,
    },
    {
      label: "More speed",
      value: getComparisonWinner(left, right, "speed").name,
    },
    {
      label: "Better micro-adjustments",
      value: getComparisonWinner(left, right, "microAdjustments").name,
    },
    {
      label: "Safer tac FPS pick",
      value: getSaferTacFpsPad(left, right).name,
    },
  ];
}

export function getBuyRecommendation(
  candidate: Mousepad,
  opponent: Mousepad
) {
  const items = [];

  if (candidate.feel.control > opponent.feel.control) {
    items.push("You want the more controlled overall glide.");
  }

  if (candidate.feel.stoppingPower > opponent.feel.stoppingPower) {
    items.push("You care more about stopping power than raw speed.");
  }

  if (candidate.feel.speed > opponent.feel.speed) {
    items.push("You want the faster pad in this matchup.");
  }

  if (candidate.feel.microAdjustments > opponent.feel.microAdjustments) {
    items.push("You want easier micro-adjustments and lighter corrections.");
  }

  if (
    candidate.environment.humidityResistance >
    opponent.environment.humidityResistance
  ) {
    items.push("You want the stronger humidity-resistant option.");
  }

  if (candidate.recommendedFor.games.includes("valorant")) {
    items.push("You spend a lot of time in tactical FPS titles.");
  }

  if (candidate.recommendedFor.games.includes("apex")) {
    items.push("You also play tracking-heavy shooters regularly.");
  }

  return items.slice(0, 4);
}

export function getVerdictHeadline(left: Mousepad, right: Mousepad) {
  const controlWinner = getComparisonWinner(left, right, "control");
  const flexibleWinner = getMoreVersatilePad(left, right);

  return `${controlWinner.name} is the safer control pick. ${flexibleWinner.name} is the more adaptable option.`;
}

export function getVerdictBody(left: Mousepad, right: Mousepad) {
  const saferPad = getSaferTacFpsPad(left, right);
  const fasterPad = getComparisonWinner(left, right, "speed");
  const humidityWinner = getHumidityWinner(left, right);

  return `If your priority is a steadier tactical FPS feel, ${saferPad.name} makes the cleaner case. If you want more glide freedom and a wider game fit, ${fasterPad.name} opens things up faster, while ${humidityWinner.name} also holds the better humidity score in this matchup.`;
}
