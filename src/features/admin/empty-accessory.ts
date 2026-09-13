export function createEmptyAccessory() {
  return {
    id: "", slug: "", brand: "", name: "", series: "", material: "ptfe", shape: "dots", quantity: "",
    visual: { colorName: "", primaryHex: "#ffffff", secondaryHex: "#000000", textHex: "#000000" },
    ratings: { speed: 0, control: 0, stoppingPower: 0, smoothness: 0, noiseControl: 0, durability: 0, glassCompatibility: 0, ratingConfidence: "estimated" },
    surfaceFit: { cloth: "usable", hybrid: "usable", glass: "usable", plastic: "usable", coated: "usable" },
    bestFor: [], avoidIf: [], notes: "", communitySummary: "", sources: [],
  };
}