import { z } from "zod";

export const iemSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    brand: z.string().min(1),
    name: z.string().min(1),
    images: z.object({ main: z.string().min(1) }).passthrough(),
    updatedAt: z.string().min(1),
  })
  .passthrough();

export const iemWriteSchema = z.object({
  status: z.enum(["draft", "published"]).default("published"),
  data: iemSchema,
});

export type IemInput = z.infer<typeof iemSchema>;
export type IemWriteInput = z.infer<typeof iemWriteSchema>;