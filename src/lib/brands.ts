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
    logoSrc: "/brands-logo/artisan-logo.png",
    officialSite: "https://artisan-jp.com/global/",
    origin: "Japan",
    tagline: "Precision. Performance. Perfection.",
    description:
      "Artisan is known for premium Japanese cloth pads with unusually consistent surfaces, multiple foam options, and some of the most benchmarked shapes in competitive FPS.",
    highlights: [
      {
        title: "Premium Quality",
        body: "High-end materials and meticulous craftsmanship across the lineup.",
      },
      {
        title: "Consistent Performance",
        body: "Trusted by players who want repeatable glide and dependable control.",
      },
      {
        title: "Community Trusted",
        body: "One of the most referenced benchmark brands in enthusiast mousepad discussions.",
      },
    ],
  },
  lgg: {
    slug: "lgg",
    name: "LGG",
    logoSrc: "/brands-logo/lgg-logo.png",
    officialSite: "https://lethal.gg/collections/mousepads-1",
    origin: "USA",
    tagline: "Science. Surface. Superior.",
    description:
      "LGG covers a wide spread from deep-control cloth to fast enthusiast surfaces, which is why players often use it as the practical alternative to import-only premium brands.",
    highlights: [
      {
        title: "Wide Speed Range",
        body: "From Jupiter control to Neptune speed, the lineup covers very different aim styles.",
      },
      {
        title: "Competitive Value",
        body: "Strong enthusiast-level surfaces without forcing every buyer into the highest-end import tier.",
      },
      {
        title: "Tried in Real Matchups",
        body: "Saturn, Neptune, and Jupiter come up constantly in direct community comparisons.",
      },
    ],
  },
  steelseries: {
    slug: "steelseries",
    name: "SteelSeries",
    logoSrc: "/brands-logo/steelseries-logo.png",
    officialSite: "https://steelseries.com/gaming-mousepads",
    origin: "Denmark",
    tagline: "Classic control, mainstream familiarity.",
    description:
      "SteelSeries remains the reference point for classic QcK-style control, especially for players who still judge newer cloth pads against the old tournament-standard feel.",
    highlights: [
      {
        title: "Legacy Benchmark",
        body: "QcK surfaces are still the baseline many players use when describing control pads.",
      },
      {
        title: "Accessible Shapes",
        body: "Common sizes and broad retail availability make the lineup easy to try and replace.",
      },
      {
        title: "Control First",
        body: "The lineup stays centered on familiar stopping power rather than chasing novelty.",
      },
    ],
  },
  xraypad: {
    slug: "xraypad",
    name: "Xraypad",
    logoSrc: "/brands-logo/xraypad-logo.png",
    officialSite: "https://shop.x-raypad.com/product-category/products/x-ray-gaming-mouse-pads/",
    origin: "China",
    tagline: "Born for precision.",
    description:
      "Xraypad is the customization-heavy brand in the database: broad size choices, many prints, and several surfaces that are especially popular with players balancing speed, texture, and humid-room consistency.",
    highlights: [
      {
        title: "Huge Variety",
        body: "Aqua Control, Equate, and Pro variants give the brand one of the widest spreads in feel.",
      },
      {
        title: "Humidity Friendly",
        body: "A lot of the lineup is chosen specifically for more stable glide in warm or damp conditions.",
      },
      {
        title: "Customization Heavy",
        body: "Sizes, prints, and surface options make Xraypad popular with players who want more choice.",
      },
    ],
  },
  zowie: {
    slug: "zowie",
    name: "Zowie",
    logoSrc: "/brands-logo/zowie-logo.png",
    officialSite: "https://zowie.benq.com/en-in/mouse-pad.html",
    origin: "Taiwan",
    tagline: "Designed for esports.",
    description:
      "Zowie mousepads are built around familiar tac-FPS behavior: controlled glide, straightforward surfaces, and a lineup that makes sense to players who care more about aiming discipline than novelty.",
    highlights: [
      {
        title: "Tac-FPS Focused",
        body: "G-SR and G-SR-SE pads remain common references for VALORANT and CS-style aim.",
      },
      {
        title: "Simple by Design",
        body: "The lineup is narrow, deliberate, and easy to understand without a maze of variants.",
      },
      {
        title: "Tournament Familiarity",
        body: "A lot of competitive players know immediately where Zowie sits on the control spectrum.",
      },
    ],
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
  const averageRating = roundToOne(
    average(mousepads.map((mousepad) => getMousepadCommunityRating(mousepad)))
  );

  return {
    brand: brandConfig[brandSlug],
    mousepads,
    controlAverage,
    speedAverage,
    averageRating,
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

function getMousepadCommunityRating(mousepad: Mousepad) {
  const overall =
    mousepad.feel.speed * 0.24 +
    mousepad.feel.control * 0.26 +
    mousepad.feel.stoppingPower * 0.18 +
    mousepad.feel.microAdjustments * 0.2 +
    mousepad.environment.humidityResistance * 0.12;

  return Math.min(5, overall / 2);
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
