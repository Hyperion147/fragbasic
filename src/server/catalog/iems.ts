import type { Iem } from "@/types/iem";
import {
  getAllIems as getStaticIems,
  getIemBySlug as getStaticIemBySlug,
} from "@/data/iems/iems";
import * as repo from "@/server/iems/repo";
import { isDbCatalogSource } from "./source";

/**
 * Public IEM reads. Draft rows stay in the CMS and are never exposed here.
 */
export async function getPublicIems(): Promise<Iem[]> {
  if (!isDbCatalogSource("iems")) {
    return getStaticIems();
  }

  const rows = await repo.listIems();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => row.data as Iem);
}

export async function getPublicIemBySlug(slug: string): Promise<Iem | null> {
  if (!isDbCatalogSource("iems")) {
    return getStaticIemBySlug(slug) ?? null;
  }

  const row = await repo.getIemBySlug(slug);
  if (!row || row.status !== "published") return null;
  return row.data as Iem;
}

export async function getPublicIemSlugs(): Promise<string[]> {
  return (await getPublicIems()).map((iem) => iem.slug);
}
