import { describe, expect, it } from "vitest";
import {
    aimStyleSchema,
    glassSurfaceFinishSchema,
    indiaAvailabilitySchema,
    mousepadBaseSchema,
    mousepadCategorySchema,
    mousepadFeelRatingSchema,
    mousepadGameSchema,
    mousepadSoftnessSchema,
    mousepadSurfaceSchema,
    ratingConfidenceSchema,
    sensitivitySchema,
} from "./mousepad";

describe("mousepadCategorySchema", () => {
    it("accepts a valid category", () => {
        const result = mousepadCategorySchema.safeParse("balanced-control");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown category", () => {
        const result = mousepadCategorySchema.safeParse("super-speed");
        expect(result.success).toBe(false);
    });
});

describe("mousepadSurfaceSchema", () => {
    it("accepts a valid surface", () => {
        const result = mousepadSurfaceSchema.safeParse("cloth");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown surface", () => {
        const result = mousepadSurfaceSchema.safeParse("plastic");
        expect(result.success).toBe(false);
    });
});

describe("glassSurfaceFinishSchema", () => {
    it("accepts a valid glass surface finish", () => {
        const result = glassSurfaceFinishSchema.safeParse("coated");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown glass surface finish", () => {
        const result = glassSurfaceFinishSchema.safeParse("polished");
        expect(result.success).toBe(false);
    });
});

describe("mousepadBaseSchema", () => {
    it("accepts a valid base", () => {
        const result = mousepadBaseSchema.safeParse("poron");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown base", () => {
        const result = mousepadBaseSchema.safeParse("foam");
        expect(result.success).toBe(false);
    });
});

describe("mousepadSoftnessSchema", () => {
    it("accepts a valid softness", () => {
        const result = mousepadSoftnessSchema.safeParse("xsoft");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown softness", () => {
        const result = mousepadSoftnessSchema.safeParse("extra-soft");
        expect(result.success).toBe(false);
    });
});

describe("mousepadGameSchema", () => {
    it("accepts a valid game", () => {
        const result = mousepadGameSchema.safeParse("valorant");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown game", () => {
        const result = mousepadGameSchema.safeParse("minecraft");
        expect(result.success).toBe(false);
    });
});

describe("aimStyleSchema", () => {
    it("accepts a valid aim style", () => {
        const result = aimStyleSchema.safeParse("tracking");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown aim style", () => {
        const result = aimStyleSchema.safeParse("spray");
        expect(result.success).toBe(false);
    });
});

describe("sensitivitySchema", () => {
    it("accepts a valid sensitivity", () => {
        const result = sensitivitySchema.safeParse("medium");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown sensitivity", () => {
        const result = sensitivitySchema.safeParse("ultra");
        expect(result.success).toBe(false);
    });
});

describe("ratingConfidenceSchema", () => {
    it("accepts a valid rating confidence", () => {
        const result = ratingConfidenceSchema.safeParse("community");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown rating confidence", () => {
        const result = ratingConfidenceSchema.safeParse("guess");
        expect(result.success).toBe(false);
    });
});

describe("indiaAvailabilitySchema", () => {
    it("accepts a valid india availability", () => {
        const result = indiaAvailabilitySchema.safeParse("import-only");
        expect(result.success).toBe(true);
    });

    it("rejects an unknown india availability", () => {
        const result = indiaAvailabilitySchema.safeParse("backorder");
        expect(result.success).toBe(false);
    });
});

describe("mousepadFeelRatingSchema", () => {
    const valid = {
        speed: 6.8,
        control: 8.2,
        stoppingPower: 8,
        staticFriction: 6.8,
        dynamicFriction: 6.9,
        microAdjustments: 8.3,
        ratingConfidence: "community" as const,
    };

    it("accepts community-style decimal score", () => {
        const result = mousepadFeelRatingSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    it("rejects string (runtime is not Typescript)", () => {
        const result = mousepadFeelRatingSchema.safeParse({
            ...valid,
            speed: "6.8",
        });
        expect(result.success).toBe(false);
    });

    it("rejects speed out of range", () => {
        const result = mousepadFeelRatingSchema.safeParse({
            ...valid,
            speed: 11,
        });
        expect(result.success).toBe(false);
    });

    it("accepts zero scores (valid worst-case ratings)", () => {
        const result = mousepadFeelRatingSchema.safeParse({
            ...valid,
            dynamicFriction: 0,
        });
        expect(result.success).toBe(true);
    });

    it("rejects missing control", () => {
        const { control: _removed, ...rest } = valid;
        const result = mousepadFeelRatingSchema.safeParse(rest);
        expect(result.success).toBe(false);
    });
});
