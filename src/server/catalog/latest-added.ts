import {
  latestAddedGlasspadSlugs,
  latestAddedIemSlugs,
  latestAddedMousepadSlugs,
} from "@/data/latest-added";
import type { LatestAddedDataInput } from "@/schemas/latest-added";
import * as repo from "@/server/latest-added/repo";
import { isDbCatalogSource } from "./source";

const staticLatestAdded: LatestAddedDataInput = {
  mousepads: [...latestAddedMousepadSlugs],
  glasspads: [...latestAddedGlasspadSlugs],
  iems: [...latestAddedIemSlugs],
};

/**
 * Returns the curated latest-added lists. A missing document falls back to the
 * static seed values so a half-finished import cannot blank the home page.
 */
export async function getPublicLatestAdded(): Promise<LatestAddedDataInput> {
  if (!isDbCatalogSource("latest-added")) {
    return staticLatestAdded;
  }

  return (await repo.getLatestAdded()) ?? staticLatestAdded;
}
