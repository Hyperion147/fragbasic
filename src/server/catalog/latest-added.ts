import * as glasspadRepo from "@/server/glasspads/repo";
import * as iemRepo from "@/server/iems/repo";
import * as mousepadRepo from "@/server/mousepads/repo";

const LATEST_LIMIT = 3;

export function getPublicLatestAddedFor(module: keyof PublicLatestAdded): Promise<string[]> {
  switch (module) {
    case "mousepads": return mousepadRepo.listLatestMousepadSlugs(LATEST_LIMIT);
    case "glasspads": return glasspadRepo.listLatestGlasspadSlugs(LATEST_LIMIT);
    case "iems": return iemRepo.listLatestIemSlugs(LATEST_LIMIT);
  }
}

export type PublicLatestAdded = {
  mousepads: string[];
  glasspads: string[];
  iems: string[];
};

/**
 * The newest published rows per catalog module, ordered by createdAt with
 * updatedAt as a tiebreaker. Nothing is curated in a settings table: adding a
 * row makes it eligible, and editing never rewrites the source of truth.
 */
export async function getPublicLatestAdded(): Promise<PublicLatestAdded> {
  const [mousepads, glasspads, iems] = await Promise.all([
    getPublicLatestAddedFor("mousepads"),
    getPublicLatestAddedFor("glasspads"),
    getPublicLatestAddedFor("iems"),
  ]);

  return { mousepads, glasspads, iems };
}
