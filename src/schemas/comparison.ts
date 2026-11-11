import { z } from "zod";

export const comparisonStatusSchema = z.enum(["draft", "published"]);

export const comparisonDataSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  leftSlug: z.string().min(1),
  rightSlug: z.string().min(1),
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
