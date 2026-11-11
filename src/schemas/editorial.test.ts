import { describe, expect, it } from "vitest";

import type { IemInput } from "@/schemas/iem";
import type { BestPageDataInput } from "@/schemas/best-page";
import type { ComparisonDataInput } from "@/schemas/comparison";
import { bestPageWriteSchema } from "@/schemas/best-page";
import { comparisonWriteSchema } from "@/schemas/comparison";
import { iemSchema } from "@/schemas/iem";

const iemFixture: IemInput = {
  id: "test-iem",
  slug: "test-iem",
  brand: "Test",
  name: "IEM",
  shortName: "IEM",
  subtitle: "A test in-ear monitor",
  driverType: "single-dd",
  soundSignature: "neutral",
  priceTier: "under-5000",
  communitySummary: "A compact fixture used to validate the IEM schema.",
  ratings: {
    fragbasic: 8,
    fps: 8,
    music: 8,
    value: 8,
    imaging: 8,
    clarity: 8,
    bass: 8,
    soundstage: 8,
    comfort: 8,
    build: 8,
    ratingConfidence: "estimated",
  },
  soundProfile: {
    label: "Neutral",
    description: "Balanced across the frequency range.",
    bass: 3,
    mids: 3,
    treble: 3,
    warmth: 3,
    brightness: 3,
  },
  specs: {
    driver: "10 mm dynamic",
    impedance: "16 ohm",
    sensitivity: "120 dB",
    frequencyResponse: "20 Hz - 20 kHz",
    connector: "0.78 mm 2-pin",
    cableType: "Silver-plated copper",
    cableTermination: "3.5 mm",
    shellMaterial: "Resin",
    nozzleMaterial: "Metal",
    detachableCable: true,
    mic: false,
  },
  buying: {
    priceInr: 1999,
    availability: "in-stock",
    stores: [],
  },
  officialReview: {
    summary: "A short fixture summary.",
    verdict: "A short fixture verdict.",
    testSetup: {
      source: "Test source",
      testedGames: ["valorant"],
      testingDuration: "One week",
    },
  },
  bestFor: ["valorant"],
  pros: ["Clean tuning"],
  cons: ["Limited accessories"],
  avoidIf: ["You need heavy bass"],
  tags: ["Test"],
  images: { main: "/iems/test-iem.webp" },
  sources: [],
  updatedAt: "2026-01-01",
};

const comparisonFixture: ComparisonDataInput = {
  slug: "test-pad-a-vs-test-pad-b",
  title: "Test Pad A vs Test Pad B",
  leftSlug: "test-pad-a",
  rightSlug: "test-pad-b",
  excerpt: "Two fixture pads compared.",
  tags: ["Test"],
};

const bestPageFixture: BestPageDataInput = {
  slug: "test-best-pages",
  title: "Best Test Pads",
  eyebrow: "A fixture shortlist",
  description: "A fixture best page description.",
  badge: "Test",
  hero: "A fixture hero paragraph.",
  thesis: "A fixture thesis.",
  story: ["A fixture story paragraph."],
  rules: ["A fixture rule."],
  pickSlugs: [
    {
      slug: "test-pad-a",
      label: "Top pick",
      reason: "A fixture reason.",
      bestFor: "Fixture testing",
    },
  ],
  keywords: ["test"],
};

describe("iemSchema", () => {
  it("accepts a valid IEM", () => {
    const parsed = iemSchema.safeParse(iemFixture);
    expect(parsed.success, parsed.error?.message).toBe(true);
  });

  it("rejects out-of-range ratings", () => {
    const parsed = iemSchema.safeParse({
      ...iemFixture,
      ratings: { ...iemFixture.ratings, fragbasic: 11 },
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects unknown enums", () => {
    const parsed = iemSchema.safeParse({
      ...iemFixture,
      soundSignature: "extra-bright",
    });

    expect(parsed.success).toBe(false);
  });
});

describe("comparisonWriteSchema", () => {
  it("accepts a valid comparison", () => {
    const parsed = comparisonWriteSchema.safeParse({
      status: "published",
      data: comparisonFixture,
    });
    expect(parsed.success, parsed.error?.message).toBe(true);
  });

  it("requires both pad references", () => {
    const parsed = comparisonWriteSchema.safeParse({
      data: {
        ...comparisonFixture,
        rightSlug: "",
      },
    });

    expect(parsed.success).toBe(false);
  });
});

describe("bestPageWriteSchema", () => {
  it("accepts a valid best page", () => {
    const parsed = bestPageWriteSchema.safeParse({
      status: "published",
      data: bestPageFixture,
    });
    expect(parsed.success, parsed.error?.message).toBe(true);
  });

  it("requires complete picks", () => {
    const parsed = bestPageWriteSchema.safeParse({
      data: {
        ...bestPageFixture,
        pickSlugs: [{ slug: "pad", label: "", reason: "", bestFor: "" }],
      },
    });

    expect(parsed.success).toBe(false);
  });
});
