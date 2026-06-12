import { getPublishedComparisons } from "@/lib/comparisons";
import {
  formatMousepadValue,
  getAllMousepads,
  getMousepadBySlug,
  getMousepadCompany,
  getMousepadFullName,
  getMousepadSpeedControlPosition,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

export const brandConfig = {
  artisan: {
    slug: "artisan",
    name: "Artisan",
  },
  lgg: {
    slug: "lgg",
    name: "LGG",
  },
  zowie: {
    slug: "zowie",
    name: "Zowie",
  },
} as const;

export type BrandSlug = keyof typeof brandConfig;
export type BrandName = (typeof brandConfig)[BrandSlug]["name"];

type BrandComparisonEntry = {
  comparison: ReturnType<typeof getPublishedComparisons>[number];
  left: Mousepad;
  right: Mousepad;
};

export function getAllBrandSlugs(): BrandSlug[] {
  return Object.keys(brandConfig) as BrandSlug[];
}

export function getBrandNameFromSlug(slug: string): BrandName | undefined {
  if (!(slug in brandConfig)) {
    return undefined;
  }

  return brandConfig[slug as BrandSlug].name;
}

export function getBrandSlugFromName(name: string): BrandSlug | undefined {
  return getAllBrandSlugs().find(
    (brandSlug) => brandConfig[brandSlug].name === name
  );
}

export function getBrandSlugFromMousepad(mousepad: Mousepad) {
  return getBrandSlugFromName(getMousepadCompany(mousepad));
}

export function getBrandMousepads(brandSlug: BrandSlug) {
  const brandName = brandConfig[brandSlug].name;

  return getAllMousepads().filter(
    (mousepad) => getMousepadCompany(mousepad) === brandName
  );
}

export function getBrandOverview(brandSlug: BrandSlug) {
  const mousepads = getBrandMousepads(brandSlug);

  if (mousepads.length === 0) {
    return null;
  }

  const controlAverage = roundToOne(
    average(mousepads.map((mousepad) => mousepad.feel.control))
  );
  const speedAverage = roundToOne(
    average(mousepads.map((mousepad) => mousepad.feel.speed))
  );
  const cheapestPad = [...mousepads].sort(byLowestIndiaPrice)[0];
  const strongestCategory = getMostCommonValue(
    mousepads.map((mousepad) => mousepad.category)
  );
  const availableInIndiaCount = mousepads.filter(
    (mousepad) =>
      mousepad.availability.india === "available" ||
      mousepad.availability.india === "limited"
  ).length;
  const speedOrdered = getBrandSpeedControlOrder(brandSlug);
  const slowestPad = speedOrdered[0];
  const fastestPad = speedOrdered[speedOrdered.length - 1];

  return {
    brand: brandConfig[brandSlug],
    mousepads,
    controlAverage,
    speedAverage,
    availableInIndiaCount,
    strongestCategory,
    cheapestPad,
    slowestPad,
    fastestPad,
    summary: `${brandConfig[brandSlug].name} currently has ${mousepads.length} pad${
      mousepads.length === 1 ? "" : "s"
    } tracked here. The lineup leans ${formatMousepadValue(
      strongestCategory
    ).toLowerCase()}, averages ${controlAverage}/10 control and ${speedAverage}/10 speed, and runs from ${getMousepadFullName(
      slowestPad
    )} on the slower end to ${getMousepadFullName(
      fastestPad
    )} on the quicker end.`,
  };
}

export function getBrandSpeedControlOrder(brandSlug: BrandSlug) {
  return [...getBrandMousepads(brandSlug)].sort((left, right) => {
    const positionDifference =
      getMousepadSpeedControlPosition(left) -
      getMousepadSpeedControlPosition(right);

    if (positionDifference !== 0) {
      return positionDifference;
    }

    return left.feel.speed - right.feel.speed;
  });
}

export function getBrandPopularComparisons(
  brandSlug: BrandSlug
): BrandComparisonEntry[] {
  const brandName = brandConfig[brandSlug].name;

  return getPublishedComparisons()
    .map((comparison) => {
      const left = getMousepadBySlug(comparison.leftSlug);
      const right = getMousepadBySlug(comparison.rightSlug);

      if (!left || !right) {
        return null;
      }

      const includesBrand =
        getMousepadCompany(left) === brandName ||
        getMousepadCompany(right) === brandName;

      if (!includesBrand) {
        return null;
      }

      return {
        comparison,
        left,
        right,
      };
    })
    .filter((entry): entry is BrandComparisonEntry => entry !== null)
    .sort((left, right) => {
      const leftBothMatch =
        getMousepadCompany(left.left) === brandName &&
        getMousepadCompany(left.right) === brandName;
      const rightBothMatch =
        getMousepadCompany(right.left) === brandName &&
        getMousepadCompany(right.right) === brandName;

      if (leftBothMatch !== rightBothMatch) {
        return leftBothMatch ? -1 : 1;
      }

      return left.comparison.title.localeCompare(right.comparison.title);
    });
}

export function getBrandBestPicks(brandSlug: BrandSlug) {
  const mousepads = getBrandMousepads(brandSlug);

  if (mousepads.length === 0) {
    return null;
  }

  return {
    control: getTopMousepad(mousepads, (mousepad) => mousepad.feel.control),
    speed: getTopMousepad(mousepads, (mousepad) => mousepad.feel.speed),
    value: getTopMousepad(mousepads, getMousepadValueScore),
  };
}

function getTopMousepad(
  mousepads: Mousepad[],
  scorer: (mousepad: Mousepad) => number
) {
  return [...mousepads].sort((left, right) => {
    const difference = scorer(right) - scorer(left);

    if (difference !== 0) {
      return difference;
    }

    return getMousepadFullName(left).localeCompare(getMousepadFullName(right));
  })[0];
}

function getMousepadValueScore(mousepad: Mousepad) {
  const overallScore =
    mousepad.feel.control * 0.28 +
    mousepad.feel.speed * 0.18 +
    mousepad.feel.stoppingPower * 0.2 +
    mousepad.feel.microAdjustments * 0.18 +
    mousepad.environment.humidityResistance * 0.16;
  const price = getNormalizedPriceInr(mousepad);

  return overallScore / price;
}

function getNormalizedPriceInr(mousepad: Mousepad) {
  if (mousepad.price.inr) {
    return mousepad.price.inr;
  }

  if (mousepad.price.usd) {
    return mousepad.price.usd * 85;
  }

  if (mousepad.price.eur) {
    return mousepad.price.eur * 95;
  }

  return 999999;
}

function byLowestIndiaPrice(left: Mousepad, right: Mousepad) {
  return getNormalizedPriceInr(left) - getNormalizedPriceInr(right);
}

function getMostCommonValue<T extends string>(values: T[]) {
  const counts = new Map<T, number>();

  values.forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  return [...counts.entries()].sort((left, right) => right[1] - left[1])[0][0];
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundToOne(value: number) {
  return Math.round(value * 10) / 10;
}
