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

/** 0–10 inclusive. 0 is valid (e.g. community "worst" / ice-glide friction). */
const feelScore = z.number().min(0).max(10);

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
export type mousepadCategoryInput = z.infer<typeof mousepadCategorySchema>;

export const mousepadSizeSchema = z.object({
    label: z.string().min(1),
    width: z.number().positive(),
    height: z.number().positive(),
    thickness: z.number().positive().optional(),
    unit: z.literal("mm"),
});

export const mousepadFeelVariantSchema = z.object({
    label: z.string().min(1),
    softness: z.enum(["soft", "firm"]),
    feel: mousepadFeelRatingSchema,
    notes: z.string().optional(),
});

export const mousepadEnvironmentSchema = z.object({
    humidityResistance: feelScore,
    sweatResistance: feelScore,
    dustHairResistance: feelScore,
    washable: z.boolean(),
    notes: z.string().optional(),
});

export const mousepadTextureFeelSchema = z.enum([
    "smooth",
    "slightly-textured",
    "textured",
    "rough",
]);

export const mousepadNoiseLevelSchema = z.enum(["quiet", "medium", "loud"]);

export const mousepadTextureSchema = z.object({
    feel: mousepadTextureFeelSchema,
    skinComfort: feelScore,
    sleeveFriendly: z.boolean(),
    noiseLevel: mousepadNoiseLevelSchema,
});

export const mousepadPriceSchema = z.object({
    usd: z.number().nonnegative().optional(),
    inr: z.number().nonnegative().optional(),
    eur: z.number().nonnegative().optional(),
    gbp: z.number().nonnegative().optional(),
    range: z
        .object({
            minUsd: z.number().nonnegative().optional(),
            maxUsd: z.number().nonnegative().optional(),
        })
        .optional(),
});

export const mousepadAvailabilitySchema = z.object({
    global: z.boolean(),
    india: indiaAvailabilitySchema,
    stores: z.array(z.string().min(1)).optional(),
    notes: z.string().optional(),
});

export const mousepadPersonalNotesSchema = z.object({
    owned: z.boolean(),
    tested: z.boolean(),
    testingDuration: z.string().optional(),
    mainGamesTested: z.array(mousepadGameSchema).optional(),
    notes: z.string().optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
});

export const mousepadSourceTypeSchema = z.enum([
    "official",
    "store",
    "reddit",
    "review",
    "personal",
]);

export const mousepadSourceSchema = z.object({
    label: z.string().min(1),
    type: mousepadSourceTypeSchema,
    url: z.string().optional(),
});

export const mousepadColorwaySchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    color: z.string().min(1),
    image: z.string().optional(),
    available: z.boolean(),
});

export const mousepadVisualsSchema = z.object({
    defaultColorway: z.string().min(1),
    colorways: z.array(mousepadColorwaySchema).min(1),
});

export const mousepadRelatedAlternativesSchema = z.object({
    similarFeeling: z.array(z.string().min(1)),
    moreControl: z.array(z.string().min(1)),
    moreSpeed: z.array(z.string().min(1)),
    notes: z.string().optional(),
});

export const mousepadCommunityConsensusSchema = z.object({
    summary: z.string().min(1),
    commonComparisons: z.array(z.string()),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    communityQuotes: z.array(z.string()).optional(),
});

export const mousepadRecommendedForSchema = z.object({
    games: z.array(mousepadGameSchema),
    aimStyles: z.array(aimStyleSchema),
    sensitivity: z.array(sensitivitySchema),
});

export const mousepadImagesSchema = z.object({
    main: z.string().min(1),
});

export const mousepadSchema = z.object({
    id: z.string().min(1),
    slug: z.string().min(1),

    brand: z.string().min(1),
    name: z.string().min(1),
    series: z.string().optional(),

    category: mousepadCategorySchema,
    surface: mousepadSurfaceSchema,
    glassSurfaceFinish: glassSurfaceFinishSchema.optional(),
    glassSurfaceFinishNotes: z.string().optional(),
    coatingDurability: z.string().optional(),
    base: mousepadBaseSchema,
    softness: mousepadSoftnessSchema,

    communityConsensus: mousepadCommunityConsensusSchema,

    sizes: z.array(mousepadSizeSchema).min(1),

    feel: mousepadFeelRatingSchema,
    feelVariants: z.array(mousepadFeelVariantSchema).optional(),
    environment: mousepadEnvironmentSchema,
    texture: mousepadTextureSchema,

    recommendedFor: mousepadRecommendedForSchema,

    avoidIf: z.array(z.string()).optional(),

    price: mousepadPriceSchema,
    availability: mousepadAvailabilitySchema,
    includedAccessories: z.array(z.string()).optional(),

    visuals: mousepadVisualsSchema,

    images: mousepadImagesSchema,

    personal: mousepadPersonalNotesSchema,

    relatedAlternatives: mousepadRelatedAlternativesSchema.optional(),

    sources: z.array(mousepadSourceSchema),
});

export type MousepadSizeInput = z.infer<typeof mousepadSizeSchema>;
export type MousepadInput = z.infer<typeof mousepadSchema>;
