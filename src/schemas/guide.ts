import { z } from "zod";
import { slugSchema, padSlugSchema } from "@/lib/validation/catalog";

export const guideStatusSchema = z.enum(["draft", "published"]);

export const guideSectionSchema = z.object({
  heading: z.string().trim().min(1),
  paragraphs: z.array(z.string().trim().min(1)).min(1),
  bullets: z.array(z.string().trim().min(1)).default([]),
});

export const guideDataSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1),
  eyebrow: z.string().trim().min(1),
  description: z.string().trim().min(1),
  category: z.string().trim().min(1),
  readingTime: z.number().int().min(1).max(60),
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD."),
  intro: z.string().trim().min(1),
  sections: z.array(guideSectionSchema).min(1),
  takeaways: z.array(z.string().trim().min(1)).min(1),
  relatedPadSlugs: z.array(padSlugSchema).default([]),
  keywords: z.array(z.string().trim().min(1)).default([]),
});

export const guideWriteSchema = z.object({
  status: guideStatusSchema.default("published"),
  data: guideDataSchema,
});

export type GuideSectionInput = z.infer<typeof guideSectionSchema>;
export type GuideDataInput = z.infer<typeof guideDataSchema>;
export type GuideWriteInput = z.infer<typeof guideWriteSchema>;
