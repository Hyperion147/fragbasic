import { describe, expect, it } from "vitest";
import { buildSetupCatalog } from "./catalog";

const curated = { id: "iem:letshuoer-s12-pro", category: "iem" as const, brand: "LETSHUOER", model: "S12 Pro", source: "https://letshuoer.net/" };

describe("account setup catalog", () => {
  it("returns text-only entries in the supplied discovery order", () => {
    const second = { ...curated, id: "iem:another", model: "Another" };
    const catalog = buildSetupCatalog([curated, second], [], []);
    expect(Object.keys(catalog)).toEqual(["mouse", "keyboard", "monitor", "mousepad", "iem"]);
    expect(catalog.iem.map(item => item.id)).toEqual([curated.id, second.id]);
    expect(Object.keys(catalog.iem[0]).sort()).toEqual(["brand", "id", "model", "source"]);
  });

  it("keeps curated IDs on overlap and uses immutable record IDs for additional profiles", () => {
    const overlap = { id: "older", slug: "s12-pro", brand: "Letshuoer", name: "S12-PRO" };
    const extra = { id: "record", slug: "new-slug", brand: "Another", name: "Model" };
    const entries = buildSetupCatalog([curated], [], [overlap, extra]).iem;
    expect(entries.filter((entry) => entry.model === "S12 Pro")).toHaveLength(1);
    expect(entries.some((entry) => entry.id === "iem:review:older")).toBe(false);
    expect(entries.at(-1)).toEqual({ id: "iem:review:record", brand: "Another", model: "Model", source: "/iems/new-slug" });
  });
});
