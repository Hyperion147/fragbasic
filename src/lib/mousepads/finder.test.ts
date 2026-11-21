import { describe, expect, it } from "vitest";
import { createEmptyMousepad } from "@/features/admin/empty-mousepad";
import type { Mousepad } from "@/types/mousepad";
import { findMousepads, readFinderPreferences } from "./finder";

function pad(slug: string, overrides: Partial<Mousepad> = {}): Mousepad {
  return { ...createEmptyMousepad(), slug, name: slug, ...overrides };
}

describe("mousepad finder", () => {
  it("keeps a strict budget, surface and stock limit, including when the price is unknown", () => {
    const available = { global: true, india: "available" } as const;
    const prefs = readFinderPreferences({ budget: "4000", surface: "cloth", available: "on" });
    const pads = [
      pad("exact", { price: { inr: 4000 }, availability: available }),
      pad("too-expensive", { price: { inr: 4001 }, availability: available }),
      pad("unpriced", { price: {}, availability: available }),
      pad("placeholder-price", { price: { inr: 0 }, availability: available }),
      pad("import", { price: { inr: 3000 } }),
      pad("glass", { surface: "glass", price: { inr: 3000 }, availability: available }),
    ];
    expect(findMousepads(pads, prefs).matches.map((match) => match.pad.slug)).toEqual(["exact"]);
    expect(findMousepads(pads, readFinderPreferences({ budget: "bogus" })).count).toBe(0);
  });

  it("uses the selected sensitivity directly and rewards matching multiple games", () => {
    const prefs = readFinderPreferences({ sensitivity: "low", game: ["apex", "cs2", "cs2", "bogus"] });
    const best = pad("z", { recommendedFor: { sensitivity: ["low"], games: ["apex", "cs2"], aimStyles: [] } });
    const other = pad("a", { recommendedFor: { sensitivity: ["high"], games: ["apex"], aimStyles: [] } });
    const { matches } = findMousepads([other, best], prefs);
    expect(matches[0].pad.slug).toBe("z");
    expect(matches[0].reasons.join(" ")).toContain("low sensitivity");
    expect(matches[1].tradeoff).toContain("CS2");
    expect(prefs.games).toHaveLength(2);
  });

  it("distinguishes glass and cloth with equal native ratings", () => {
    const fast = pad("glass", { category: "glass", surface: "glass" });
    const slow = pad("cloth", { category: "control" });
    expect(findMousepads([slow, fast], readFinderPreferences({ feel: "speed" })).matches[0].pad.slug).toBe("glass");
    expect(findMousepads([slow, fast], readFinderPreferences({ feel: "control" })).matches[0].pad.slug).toBe("cloth");
  });

  it("uses humidity only on request, breaks ties consistently, and caps the shortlist at three", () => {
    const pads = ["d", "c", "b", "a"].map((slug) => pad(slug));
    pads[0].environment = { ...pads[0].environment, humidityResistance: 10 };
    expect(findMousepads(pads, readFinderPreferences({})).matches.map((x) => x.pad.slug)).toEqual(["a", "b", "c"]);
    const humid = findMousepads(pads, readFinderPreferences({ humid: "on" }));
    expect(humid.count).toBe(4);
    expect(humid.matches[0].pad.slug).toBe("d");
  });
});
