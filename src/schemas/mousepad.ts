import { z } from "zod";

export const mousepadCategorySchema = z.enum([
    "mud",
    "control",
    "balanced-control",
    "balanced-speed",
    "speed",
    "glass",
]);

export const mousepadSurfaceSchema = z.enum([
    "cloth",
    "hybrid",
    "glass",
    "hard",
]);

export const glassSurfaceFinishSchema = z.enum([
    "coated",
    "uncoated",
    "unknown",
]);

export const mousepadBaseSchema = z.enum([
    "poron",
    "rubber",
    "silicone",
    "polyurethane",
    "unknown",
]);

export const mousepadSoftnessSchema = z.enum([
    "xsoft",
    "soft",
    "mid",
    "firm",
    "hard",
    "unknown",
]);

export const mousepadGameSchema = z.enum([
    "valorant",
    "cs2",
    "apex",
    "quake",
    "overwatch",
    "fortnite",
    "general-fps",
]);

export const aimStyleSchema = z.enum([
    "micro-adjustments",
    "precision",
    "hybrid",
    "flicking",
    "tracking",
    "switching",
]);

export const sensitivitySchema = z.enum(["low", "medium", "high"]);

export const ratingConfidenceSchema = z.enum([
    "official",
    "community",
    "personal-tested",
    "estimated",
]);

export const indiaAvailabilitySchema = z.enum([
    "available",
    "limited",
    "import-only",
    "unavailable",
    "unknown",
]);

const feelScore = z.number().min(1).max(10);

export const mousepadFeelRatingSchema = z.object({
    speed: feelScore,
    control: feelScore,
    stoppingPower: feelScore,
    staticFriction: feelScore,
    dynamicFriction: feelScore,
    microAdjustments: feelScore,
    ratingConfidence: ratingConfidenceSchema,
});

export type MousepadFeelRatingInput = z.infer<typeof mousepadFeelRatingSchema>;
export type mousepadCategoryInput = z.infer<typeof mousepadCategorySchema>
