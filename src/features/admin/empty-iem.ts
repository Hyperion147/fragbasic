export function createEmptyIem() {
    return {
        id: "",
        slug: "",
        brand: "",
        name: "",
        shortName: "",
        subtitle: "",
        driverType: "single-dd",
        soundSignature: "neutral",
        priceTier: "under-2000",
        communitySummary: "",
        ratings: { fragbasic: 0, fps: 0, music: 0, value: 0, imaging: 0, clarity: 0, bass: 0, soundstage: 0, comfort: 0, build: 0, ratingConfidence: "estimated" },
        soundProfile: { label: "", description: "", bass: 0, mids: 0, treble: 0, warmth: 0, brightness: 0 },
        specs: { driver: "", impedance: "", sensitivity: "", frequencyResponse: "", connector: "", cableType: "", cableTermination: "", shellMaterial: "", nozzleMaterial: "", detachableCable: true, mic: false },
        buying: { availability: "unknown", stores: [] },
        officialReview: { summary: "", verdict: "", testSetup: { source: "", testedGames: [], testingDuration: "" } },
        bestFor: [], pros: [], cons: [], avoidIf: [], tags: [], images: { main: "/iems/placeholder.png" }, sources: [], updatedAt: new Date().toISOString().slice(0, 10),
    };
}