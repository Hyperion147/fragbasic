import { describe, expect, it } from "vitest";

import { iemFixture } from "../../e2e/fixtures/iem";
import type { BestPageDataInput } from "@/schemas/best-page";
import type { ComparisonDataInput } from "@/schemas/comparison";
import { bestPageWriteSchema } from "@/schemas/best-page";
import { comparisonWriteSchema } from "@/schemas/comparison";
import { iemSchema } from "@/schemas/iem";

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
