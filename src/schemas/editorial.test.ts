import { describe, expect, it } from "vitest";

import { bestPages } from "@/data/best-pages";
import { comparisons } from "@/data/comparisons";
import { iems } from "@/data/iems/iems";
import { comparisonWriteSchema } from "@/schemas/comparison";
import { bestPageWriteSchema } from "@/schemas/best-page";
import { iemSchema } from "@/schemas/iem";

describe("iemSchema", () => {
  it("accepts every static IEM", () => {
    for (const iem of iems) {
      const parsed = iemSchema.safeParse(iem);
      expect(parsed.success, `${iem.slug}: ${parsed.error?.message}`).toBe(true);
    }
  });

  it("rejects out-of-range ratings", () => {
    const parsed = iemSchema.safeParse({
      ...iems[0],
      ratings: { ...iems[0].ratings, fragbasic: 11 },
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects unknown enums", () => {
    const parsed = iemSchema.safeParse({
      ...iems[0],
      soundSignature: "extra-bright",
    });

    expect(parsed.success).toBe(false);
  });
});

describe("comparisonWriteSchema", () => {
  it("accepts every static comparison", () => {
    for (const comparison of comparisons) {
      const parsed = comparisonWriteSchema.safeParse({
        status: comparison.status,
        data: comparison,
      });
      expect(
        parsed.success,
        `${comparison.slug}: ${parsed.error?.message}`,
      ).toBe(true);
    }
  });

  it("requires both pad references", () => {
    const parsed = comparisonWriteSchema.safeParse({
      data: {
        slug: "a-vs-b",
        title: "A vs B",
        leftSlug: "a",
        rightSlug: "",
        excerpt: "Missing right pad.",
        tags: [],
      },
    });

    expect(parsed.success).toBe(false);
  });
});

describe("bestPageWriteSchema", () => {
  it("accepts every static best page", () => {
    for (const page of bestPages) {
      const parsed = bestPageWriteSchema.safeParse({
        status: "published",
        data: page,
      });
      expect(parsed.success, `${page.slug}: ${parsed.error?.message}`).toBe(
        true,
      );
    }
  });

  it("requires complete picks", () => {
    const parsed = bestPageWriteSchema.safeParse({
      data: {
        slug: "test",
        title: "Test",
        eyebrow: "",
        description: "",
        badge: "",
        hero: "",
        thesis: "",
        story: [],
        rules: [],
        pickSlugs: [{ slug: "pad", label: "", reason: "", bestFor: "" }],
        keywords: [],
      },
    });

    expect(parsed.success).toBe(false);
  });
});
