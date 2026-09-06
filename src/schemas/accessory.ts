import { z } from "zod";

export const mouseSkateSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    brand: z.string().min(1),
    name: z.string().min(1),
  })
  .passthrough();

export const mouseSkateWriteSchema = z.object({
  status: z.enum(["draft", "published"]).default("published"),
  data: mouseSkateSchema,
});

export type MouseSkateInput = z.infer<typeof mouseSkateSchema>;
export type MouseSkateWriteInput = z.infer<typeof mouseSkateWriteSchema>;