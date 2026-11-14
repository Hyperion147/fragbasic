import { describe, expect, it } from "vitest";
import { findPadDependents, getAlternativeSlugs, type ReferenceCatalog } from "./reference-checks";

const catalog: ReferenceCatalog = {
  pads: [{ slug: "related", status: "published", data: { relatedAlternatives: { similarFeeling: ["target"], moreControl: [], moreSpeed: [] } } }],
  comparisons: [{ slug: "matchup", status: "published", data: { leftSlug: "target", rightSlug: "other" } }],
  bestPages: [{ slug: "best", status: "draft", data: { pickSlugs: [{ slug: "target" }] } }],
  guides: [{ slug: "guide", status: "published", data: { relatedPadSlugs: ["target"] } }],
};
describe("pad lifecycle dependencies", () => {
  it("blocks deleting or renaming a pad referenced by drafts or public records", () => {
    expect(findPadDependents(catalog, "target")).toEqual(["comparison:matchup", "best:best", "guide:guide", "pad:related"]);
  });
  it("requires published dependents to be updated before unpublishing", () => {
    expect(findPadDependents(catalog, "target", true)).toEqual(["comparison:matchup", "guide:guide", "pad:related"]);
  });
  it("does not block an unreferenced pad", () => expect(findPadDependents(catalog, "unreferenced")).toEqual([]));
});


describe("health checks on malformed stored alternatives", () => {
  it.each([null, { relatedAlternatives: { similarFeeling: "not-an-array" } }, { relatedAlternatives: { notes: "target" } }])("does not crash or treat free text as a reference: %j", (data) => {
    expect(getAlternativeSlugs(data)).toEqual([]);
  });
});
