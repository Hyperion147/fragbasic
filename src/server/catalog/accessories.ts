import type { MouseSkate } from "@/types/accessory";
import { getAllMouseSkates as getStaticMouseSkates } from "@/data/accessories/mouse-skates";
import * as repo from "@/server/accessories/repo";
import { isDbCatalogSource } from "./source";

/**
 * Public mouse skate reads. Draft rows stay in the CMS and are never exposed.
 */
export async function getPublicMouseSkates(): Promise<MouseSkate[]> {
  if (!isDbCatalogSource("accessories")) {
    return getStaticMouseSkates();
  }

  const rows = await repo.listMouseSkates();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => row.data as MouseSkate);
}

export async function getPublicMouseSkateBySlug(
  slug: string,
): Promise<MouseSkate | null> {
  if (!isDbCatalogSource("accessories")) {
    return getStaticMouseSkates().find((skate) => skate.slug === slug) ?? null;
  }

  const row = await repo.getMouseSkateBySlug(slug);
  if (!row || row.status !== "published") return null;
  return row.data as MouseSkate;
}

export async function getPublicMouseSkateSlugs(): Promise<string[]> {
  return (await getPublicMouseSkates()).map((skate) => skate.slug);
}
