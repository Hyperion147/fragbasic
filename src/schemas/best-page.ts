import { z } from "zod";
import { slugSchema, padSlugSchema } from "@/lib/validation/catalog";

export const bestPageStatusSchema = z.enum(["draft", "published"]);

export const bestPagePickSchema = z.object({
  slug: padSlugSchema,
  label: z.string().min(1),
  reason: z.string().min(1),
  bestFor: z.string().min(1),
});

export const bestPageDataSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  eyebrow: z.string().min(1),
  description: z.string().min(1),
  badge: z.string().min(1),
  hero: z.string().min(1),
  thesis: z.string().min(1),
  story: z.array(z.string()),
  rules: z.array(z.string()),
  pickSlugs: z.array(bestPagePickSchema),
  keywords: z.array(z.string()),
});

export const bestPageWriteSchema = z.object({
  status: bestPageStatusSchema.default("published"),
  data: bestPageDataSchema,
});

export type BestPagePickInput = z.infer<typeof bestPagePickSchema>;
export type BestPageDataInput = z.infer<typeof bestPageDataSchema>;
export type BestPageWriteInput = z.infer<typeof bestPageWriteSchema>;
