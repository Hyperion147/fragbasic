import { describe, expect, it } from "vitest";

import type { GuideDataInput } from "@/schemas/guide";
import type { MouseSkate } from "@/types/accessory";
import type { MousepadComparison } from "@/types/comparison";
import type { Iem } from "@/types/iem";
import type { Mousepad } from "@/types/mousepad";
import {
  articleSearchItems,
  bestPageSearchItems,
  comparisonSearchItems,
  groupSearchResults,
  iemSearchItems,
  normalizeSearchText,
  padSearchItems,
  prepareSearchIndex,
  searchAndGroup,
  searchItems,
  skateSearchItems,
  SEARCH_GROUP_ORDER,
  type SearchItem,
} from "./search";

const fixturePads = [
  {
    slug: "artisan-zero-soft",
    brand: "Artisan",
    name: "Zero",
    series: "Zero",
    category: "balanced-control",
    surface: "cloth",
  },
  {
    slug: "wallhack-sp-005",
    brand: "Wallhack",
    name: "SP-005",
    series: "SP",
    category: "glass",
    surface: "glass",
  },
] as unknown as Mousepad[];

const fixtureIems = [
  {
    slug: "dunu-titan-x",
    brand: "DUNU",
    name: "Titan X",
    shortName: "Titan X",
    driverType: "single-dd",
    soundSignature: "v-shape",
    priceTier: "under-5000",
  },
] as unknown as Iem[];

const fixtureSkates = [
  {
    slug: "xraypad-jade",
    brand: "Xraypad",
    name: "Jade",
    series: "Jade",
    material: "ptfe",
    shape: "dots",
  },
] as unknown as MouseSkate[];

const fixtureBestPages = [
  {
    slug: "control-mousepads",
    title: "Best Control Mousepads",
    eyebrow: "Slow down the last inch",
    badge: "Control",
    keywords: ["control", "mousepads"],
  },
];

const fixtureGuides = [
  {
    slug: "humid-climate-mousepads",
    title: "Humid climate mousepads",
    category: "Environment",
    readingTime: 6,
    keywords: ["humid", "climate"],
  },
] as unknown as GuideDataInput[];

const fixtureComparisons = [
  {
    slug: "atk-crimson-vs-wallhack-sp-005",
    title: "ATK Crimson vs Wallhack SP-005",
    excerpt: "A control-leaning glasspad compared with a speed-first benchmark.",
    tags: ["Glass", "Control"],
  },
] as unknown as MousepadComparison[];

/** Fixture index mirroring the API payload without importing seed data. */
function buildFixtureIndex(): SearchItem[] {
  return [
    ...padSearchItems(fixturePads),
    ...iemSearchItems(fixtureIems),
    ...skateSearchItems(fixtureSkates),
    ...bestPageSearchItems(fixtureBestPages),
    ...articleSearchItems(fixtureGuides),
    ...comparisonSearchItems(fixtureComparisons),
  ];
}

describe("search index fixture", () => {
  it("covers every database domain", () => {
    const index = buildFixtureIndex();
    const kinds = new Set(index.map((item) => item.kind));

    expect(kinds).toEqual(
      new Set([
        "mousepad",
        "glasspad",
        "iem",
        "skate",
        "guide",
        "article",
        "comparison",
      ]),
    );
    expect(index.length).toBe(7);
  });

  it("routes glasspads to mousepad detail pages and skates to the browser", () => {
    const index = buildFixtureIndex();
    const glass = index.filter((item) => item.kind === "glasspad");
    const cloth = index.filter((item) => item.kind === "mousepad");
    const skates = index.filter((item) => item.kind === "skate");

    expect(glass.length).toBeGreaterThan(0);
    expect(cloth.length).toBeGreaterThan(0);
    expect(glass.every((item) => item.href.startsWith("/mousepads/"))).toBe(true);
    expect(skates.every((item) => item.href === "/accessories/mouse-skates/browse")).toBe(
      true,
    );
  });
});

describe("normalizeSearchText", () => {
  it("lowercases, trims, and strips punctuation", () => {
    expect(normalizeSearchText("  Artisan Zero (Soft) ")).toBe("artisan zero soft");
  });
});

describe("searchItems", () => {
  it("returns nothing for an empty query", () => {
    expect(searchItems(buildFixtureIndex(), "   ")).toEqual([]);
  });

  it("finds cloth pads by brand", () => {
    const results = searchItems(buildFixtureIndex(), "artisan");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.kind === "mousepad")).toBe(true);
  });

  it("keeps glasspads in their own kind", () => {
    const results = searchItems(buildFixtureIndex(), "wallhack");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe("glasspad");
  });

  it("matches every token for multi-word queries", () => {
    const results = searchItems(buildFixtureIndex(), "artisan zero");
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((item) => item.title.toLowerCase().includes("artisan")),
    ).toBe(true);
  });

  it("finds IEMs, skates, guides, and comparisons", () => {
    const index = buildFixtureIndex();
    expect(searchItems(index, "dunu")[0]?.kind).toBe("iem");
    expect(searchItems(index, "jade").some((item) => item.kind === "skate")).toBe(
      true,
    );
    expect(
      searchItems(index, "control mousepads").some((item) => item.kind === "guide"),
    ).toBe(true);
    expect(
      searchItems(index, "humid climate").some((item) => item.kind === "article"),
    ).toBe(true);
    expect(
      searchItems(index, "crimson wallhack").some(
        (item) => item.kind === "comparison",
      ),
    ).toBe(true);
  });

  it("returns nothing for gibberish", () => {
    expect(searchItems(buildFixtureIndex(), "zzzqqqxk")).toEqual([]);
  });

  it("returns the same results from a prepared index", () => {
    const index = buildFixtureIndex();
    const prepared = prepareSearchIndex(index);

    expect(searchItems(prepared, "artisan zero").map((item) => item.id)).toEqual(
      searchItems(index, "artisan zero").map((item) => item.id),
    );
  });
});

describe("searchAndGroup", () => {
  it("orders groups pads-first and caps each group", () => {
    const groups = searchAndGroup(buildFixtureIndex(), "a");
    const labels = groups.map((group) => group.kind);
    const order = SEARCH_GROUP_ORDER.filter((kind) => labels.includes(kind));

    expect(labels).toEqual(order);
    expect(groups.every((group) => group.items.length <= 6)).toBe(true);
  });

  it("groupSearchResults drops empty kinds", () => {
    const index = buildFixtureIndex();
    const groups = groupSearchResults(
      index.filter((item) => item.kind === "iem"),
    );
    expect(groups.map((group) => group.kind)).toEqual(["iem"]);
  });
});
