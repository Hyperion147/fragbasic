import { describe, expect, it } from "vitest";
import { buildSetupCatalog } from "./catalog";

describe("account setup catalog", () => {
  it("gives every curated model a unique category-scoped ID and a source", () => {
    for (const [category, entries] of Object.entries(buildSetupCatalog([], []))) {
      expect(entries.length).toBeGreaterThan(0);
      expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
      for (const entry of entries) {
        expect(entry.id.startsWith(category + ":")).toBe(true);
        expect(new URL(entry.source).protocol).toBe("https:");
        expect(Object.keys(entry).sort()).toEqual(["brand", "id", "model", "source"]);
      }
    }
  });

  it("keeps curated IDs on overlap and uses immutable record IDs for additional profiles", () => {
    const overlap = { id: "older", slug: "s12-pro", brand: "Letshuoer", name: "S12-PRO" };
    const extra = { id: "record", slug: "new-slug", brand: "Another", name: "Model" };
    const entries = buildSetupCatalog([], [overlap, extra]).iem;
    expect(entries.filter((entry) => entry.model === "S12 Pro")).toHaveLength(1);
    expect(entries.some((entry) => entry.id === "iem:review:older")).toBe(false);
    expect(entries.at(-1)).toEqual({ id: "iem:review:record", brand: "Another", model: "Model", source: "/iems/new-slug" });
  });
});
