import { z } from "zod";

export const LATEST_ADDED_KEY = "latest-added";

const slugList = z
  .array(z.string().trim().min(1))
  .refine((slugs) => new Set(slugs).size === slugs.length, {
    message: "Slugs must be unique.",
  });

export const latestAddedDataSchema = z.object({
  mousepads: slugList,
  glasspads: slugList,
  iems: slugList,
});

export const latestAddedWriteSchema = z.object({
  data: latestAddedDataSchema,
});

export type LatestAddedDataInput = z.infer<typeof latestAddedDataSchema>;
export type LatestAddedWriteInput = z.infer<typeof latestAddedWriteSchema>;
