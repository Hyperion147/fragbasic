import { glassMousepads } from "@/data/mousepads/glasspads";
import { getAllIems } from "@/lib/iems";
import { getAllMousepads } from "@/lib/mousepads";
import * as glasspadRepo from "@/server/glasspads/repo";
import * as iemRepo from "@/server/iems/repo";
import * as mousepadRepo from "@/server/mousepads/repo";
import { isDbCatalogSource } from "./source";

const LATEST_LIMIT = 3;

export type PublicLatestAdded = {
  mousepads: string[];
  glasspads: string[];
  iems: string[];
};

function staticLatestMousepadSlugs() {
  return getAllMousepads()
    .filter((pad) => pad.category !== "glass")
    .slice(0, LATEST_LIMIT)
    .map((pad) => pad.slug);
}

function staticLatestGlasspadSlugs() {
  return glassMousepads
    .slice(0, LATEST_LIMIT)
    .map((pad) => pad.slug);
}

function staticLatestIemSlugs() {
  return getAllIems()
    .slice(0, LATEST_LIMIT)
    .map((iem) => iem.slug);
}

/**
 * The newest published rows per catalog module, ordered by createdAt with
 * updatedAt as a tiebreaker. Nothing is curated in a settings table: adding a
 * row makes it eligible, and editing never rewrites the source of truth.
 *
 * When a module is still on the static source there are no timestamps to sort
 * by, so the first entries in the checked-in data act as the fallback list.
 */
export async function getPublicLatestAdded(): Promise<PublicLatestAdded> {
  const [mousepads, glasspads, iems] = await Promise.all([
    isDbCatalogSource("mousepads")
      ? mousepadRepo.listLatestMousepadSlugs(LATEST_LIMIT)
      : Promise.resolve(staticLatestMousepadSlugs()),
    isDbCatalogSource("glasspads")
      ? glasspadRepo.listLatestGlasspadSlugs(LATEST_LIMIT)
      : Promise.resolve(staticLatestGlasspadSlugs()),
    isDbCatalogSource("iems")
      ? iemRepo.listLatestIemSlugs(LATEST_LIMIT)
      : Promise.resolve(staticLatestIemSlugs()),
  ]);

  return { mousepads, glasspads, iems };
}
