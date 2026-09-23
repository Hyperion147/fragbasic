import { z } from "zod";

const mouseSkateMaterialSchema = z.enum(["ptfe", "hardened-ptfe", "uhmwpe", "glass", "titanium"]);
const mouseSkateShapeSchema = z.enum(["dots", "donuts", "mouse-specific"]);
const mouseSkateSurfaceFitSchema = z.enum(["excellent", "good", "usable", "avoid"]);
const mouseSkateRatingConfidenceSchema = z.enum(["official", "community", "estimated"]);

export const mouseSkateSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    brand: z.string().min(1),
    name: z.string().min(1),
    series: z.string().min(1),
    material: mouseSkateMaterialSchema,
    shape: mouseSkateShapeSchema,
    thicknessMm: z.number().nonnegative().optional(),
    diameterMm: z.number().nonnegative().optional(),
    quantity: z.string().min(1).optional(),
    visual: z.object({
      colorName: z.string().min(1),
      primaryHex: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      secondaryHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
      textHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    }).optional(),
    ratings: z.object({
      speed: z.number().min(0).max(10),
      control: z.number().min(0).max(10),
      stoppingPower: z.number().min(0).max(10),
      smoothness: z.number().min(0).max(10),
      noiseControl: z.number().min(0).max(10),
      durability: z.number().min(0).max(10),
      glassCompatibility: z.number().min(0).max(10),
      ratingConfidence: mouseSkateRatingConfidenceSchema,
    }),
    surfaceFit: z.object({
      cloth: mouseSkateSurfaceFitSchema,
      hybrid: mouseSkateSurfaceFitSchema,
      glass: mouseSkateSurfaceFitSchema,
      plastic: mouseSkateSurfaceFitSchema,
      coated: mouseSkateSurfaceFitSchema,
    }),
    bestFor: z.array(z.string()),
    avoidIf: z.array(z.string()),
    notes: z.string(),
    communitySummary: z.string(),
    sources: z.array(z.object({
      label: z.string().min(1),
      type: z.enum(["official", "store", "reddit", "review"]),
      url: z.string().url().optional(),
    })),
  });

export const mouseSkateWriteSchema = z.object({
  status: z.enum(["draft", "published"]).default("published"),
  data: mouseSkateSchema,
});

export type MouseSkateInput = z.infer<typeof mouseSkateSchema>;
export type MouseSkateWriteInput = z.infer<typeof mouseSkateWriteSchema>;