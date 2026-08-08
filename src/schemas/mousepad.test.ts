import { describe, expect, it } from "vitest";
import { mousepadFeelRatingSchema, mousepadCategorySchema } from "./mousepad";

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

    it("rejects missing control", () => {
        const { control: _removed, ...rest } = valid;
        const result = mousepadFeelRatingSchema.safeParse(rest);
        expect(result.success).toBe(false);
    });
});
