import { z } from "zod";
import { iemSlugSchema, httpUrlSchema, imagePathSchema } from "@/lib/validation/catalog";

export const iemDriverTypeSchema = z.enum([
  "single-dd",
  "dual-dd",
  "hybrid",
  "planar",
  "ba",
  "tribrid",
]);

export const iemSoundSignatureSchema = z.enum([
  "neutral-bright",
  "neutral",
  "warm-neutral",
  "v-shape",
  "mild-v",
  "bass-boosted",
]);

export const iemPriceTierSchema = z.enum([
  "under-2000",
  "under-5000",
  "midrange",
  "premium",
]);

export const iemGameSchema = z.enum([
  "valorant",
  "cs2",
  "apex",
  "rainbow-six-siege",
  "overwatch",
  "general-fps",
  "music",
]);

export const iemAvailabilitySchema = z.enum([
  "in-stock",
  "limited",
  "import-only",
  "unknown",
]);

export const iemRatingConfidenceSchema = z.enum([
  "community",
  "personal-tested",
  "estimated",
]);

export const iemSourceTypeSchema = z.enum([
  "official",
  "store",
  "reddit",
  "review",
  "personal",
]);

const ratingScore = z.number().min(0).max(10);
const profileScore = z.number().min(0).max(5);
const nonEmpty = z.string().min(1);

export const iemRatingsSchema = z.object({
  fragbasic: ratingScore,
  fps: ratingScore,
  music: ratingScore,
  value: ratingScore,
  imaging: ratingScore,
  clarity: ratingScore,
  bass: ratingScore,
  soundstage: ratingScore,
  comfort: ratingScore,
  build: ratingScore,
  ratingConfidence: iemRatingConfidenceSchema,
});

export const iemSoundProfileSchema = z.object({
  label: nonEmpty,
  description: nonEmpty,
  bass: profileScore,
  mids: profileScore,
  treble: profileScore,
  warmth: profileScore,
  brightness: profileScore,
});

export const iemSpecSchema = z.object({
  driver: nonEmpty,
  impedance: nonEmpty,
  sensitivity: nonEmpty,
  frequencyResponse: nonEmpty,
  connector: nonEmpty,
  cableType: nonEmpty,
  cableTermination: nonEmpty,
  shellMaterial: nonEmpty,
  nozzleMaterial: nonEmpty,
  detachableCable: z.boolean(),
  mic: z.boolean(),
  weightPerEarpiece: z.string().optional(),
});

export const iemStoreSchema = z.object({
  label: nonEmpty,
  url: httpUrlSchema.optional(),
});

export const iemBuyingSchema = z.object({
  priceInr: z.number().nonnegative().optional(),
  priceUsd: z.number().nonnegative().optional(),
  availability: iemAvailabilitySchema,
  shipsFrom: z.string().optional(),
  warranty: z.string().optional(),
  stores: z.array(iemStoreSchema),
});

export const iemFrequencyPointSchema = z.object({
  hz: z.number().nonnegative(),
  db: z.number(),
});

export const iemFrequencyGraphSchema = z.object({
  url: httpUrlSchema,
  source: nonEmpty,
  sourceUrl: httpUrlSchema,
  rig: nonEmpty,
  points: z.array(iemFrequencyPointSchema).min(2),
  target: z.array(iemFrequencyPointSchema).min(2),
  note: z.string().optional(),
});

export const iemTestSetupSchema = z.object({
  source: nonEmpty,
  motherboard: z.string().optional(),
  testedGames: z.array(iemGameSchema),
  testingDuration: nonEmpty,
});

export const iemOfficialReviewSchema = z.object({
  summary: nonEmpty,
  verdict: nonEmpty,
  testSetup: iemTestSetupSchema,
});

export const iemSourceSchema = z.object({
  label: nonEmpty,
  type: iemSourceTypeSchema,
  url: httpUrlSchema.optional(),
});

export const iemImagesSchema = z.object({
  main: imagePathSchema,
});

export const iemSchema = z.object({
  id: nonEmpty,
  slug: iemSlugSchema,
  brand: nonEmpty,
  name: nonEmpty,
  shortName: nonEmpty,
  subtitle: nonEmpty,
  driverType: iemDriverTypeSchema,
  soundSignature: iemSoundSignatureSchema,
  priceTier: iemPriceTierSchema,
  communitySummary: nonEmpty,
  ratings: iemRatingsSchema,
  soundProfile: iemSoundProfileSchema,
  specs: iemSpecSchema,
  buying: iemBuyingSchema,
  officialReview: iemOfficialReviewSchema,
  frequencyGraph: iemFrequencyGraphSchema.optional(),
  bestFor: z.array(iemGameSchema),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  avoidIf: z.array(z.string()),
  tags: z.array(z.string()),
  images: iemImagesSchema,
  sources: z.array(iemSourceSchema),
  updatedAt: nonEmpty,
});

export const iemWriteSchema = z.object({
  status: z.enum(["draft", "published"]).default("published"),
  data: iemSchema,
});

export type IemInput = z.infer<typeof iemSchema>;
export type IemWriteInput = z.infer<typeof iemWriteSchema>;
