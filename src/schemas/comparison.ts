import { z } from "zod";
import { slugSchema, padSlugSchema } from "@/lib/validation/catalog";

export const comparisonStatusSchema = z.enum(["draft", "published"]);

export const comparisonDataSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  leftSlug: padSlugSchema,
  rightSlug: padSlugSchema,
  excerpt: z.string().min(1),
  tags: z.array(z.string()),
});

export const comparisonSchema = comparisonDataSchema.extend({
  status: comparisonStatusSchema,
});

export const comparisonWriteSchema = z.object({
  status: comparisonStatusSchema.default("published"),
  data: comparisonDataSchema,
});

export type ComparisonDataInput = z.infer<typeof comparisonDataSchema>;
export type ComparisonWriteInput = z.infer<typeof comparisonWriteSchema>;
