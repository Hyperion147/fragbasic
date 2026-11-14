import { cache } from "react";

import * as repo from "@/server/accessories/repo";
import type { MouseSkate } from "@/types/accessory";

/**
 * Public mouse skate reads. Draft rows stay in the CMS and are never exposed.
 */
export const getPublicMouseSkates = cache(async (): Promise<MouseSkate[]> => {
  const rows = await repo.listMouseSkates();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as MouseSkate);
});

export const getPublicMouseSkateBySlug = cache(async (
  slug: string,
): Promise<MouseSkate | null> => {
  const row = await repo.getMouseSkateBySlug(slug);
  if (!row || row.status !== "published") return null;
  return ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as MouseSkate;
});

export async function getPublicMouseSkateSlugs(): Promise<string[]> {
  return (await getPublicMouseSkates()).map((skate) => skate.slug);
}
