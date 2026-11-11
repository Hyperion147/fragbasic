import * as glasspadRepo from "@/server/glasspads/repo";
import * as iemRepo from "@/server/iems/repo";
import * as mousepadRepo from "@/server/mousepads/repo";

const LATEST_LIMIT = 3;

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
    mousepadRepo.listLatestMousepadSlugs(LATEST_LIMIT),
    glasspadRepo.listLatestGlasspadSlugs(LATEST_LIMIT),
    iemRepo.listLatestIemSlugs(LATEST_LIMIT),
  ]);

  return { mousepads, glasspads, iems };
}
