import { describe, expect, it } from "vitest";

import {
  buildSearchIndex,
  groupSearchResults,
  normalizeSearchText,
  searchAndGroup,
  searchItems,
  SEARCH_GROUP_ORDER,
} from "./search";

describe("buildSearchIndex", () => {
  it("covers every database domain", () => {
    const index = buildSearchIndex();
    const kinds = new Set(index.map((item) => item.kind));

    expect(kinds).toEqual(
      new Set(["mousepad", "glasspad", "iem", "skate", "guide", "comparison"]),
    );
    expect(index.length).toBeGreaterThan(60);
  });

  it("routes glasspads to mousepad detail pages and skates to the browser", () => {
    const index = buildSearchIndex();
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
    expect(searchItems(buildSearchIndex(), "   ")).toEqual([]);
  });

  it("finds cloth pads by brand", () => {
    const results = searchItems(buildSearchIndex(), "artisan");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.kind === "mousepad")).toBe(true);
  });

  it("keeps glasspads in their own kind", () => {
    const results = searchItems(buildSearchIndex(), "wallhack");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe("glasspad");
  });

  it("matches every token for multi-word queries", () => {
    const results = searchItems(buildSearchIndex(), "artisan zero");
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((item) =>
        item.title.toLowerCase().includes("artisan"),
      ),
    ).toBe(true);
  });

  it("finds IEMs, skates, guides, and comparisons", () => {
    const index = buildSearchIndex();
    expect(searchItems(index, "dunu")[0]?.kind).toBe("iem");
    expect(searchItems(index, "jade").some((item) => item.kind === "skate")).toBe(
      true,
    );
    expect(
      searchItems(index, "control mousepads").some((item) => item.kind === "guide"),
    ).toBe(true);
    expect(
      searchItems(index, "crimson wallhack").some(
        (item) => item.kind === "comparison",
      ),
    ).toBe(true);
  });

  it("returns nothing for gibberish", () => {
    expect(searchItems(buildSearchIndex(), "zzzqqqxk")).toEqual([]);
  });
});

describe("searchAndGroup", () => {
  it("orders groups pads-first and caps each group", () => {
    const groups = searchAndGroup(buildSearchIndex(), "a");
    const labels = groups.map((group) => group.kind);
    const order = SEARCH_GROUP_ORDER.filter((kind) => labels.includes(kind));

    expect(labels).toEqual(order);
    expect(groups.every((group) => group.items.length <= 6)).toBe(true);
  });

  it("groupSearchResults drops empty kinds", () => {
    const index = buildSearchIndex();
    const groups = groupSearchResults(
      index.filter((item) => item.kind === "iem"),
    );
    expect(groups.map((group) => group.kind)).toEqual(["iem"]);
  });
});
