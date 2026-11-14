import type { BestPagePickInput } from "@/schemas/best-page";
import type { Mousepad } from "@/types/mousepad";

export type BestPagePickWithMousepad = BestPagePickInput & {
  mousepad: Mousepad;
};

/**
 * Resolves a best page's pick slugs against the public pad catalog, dropping
 * any pick whose pad no longer exists.
 */
export function getBestPagePicks(
  page: Pick<{ pickSlugs: BestPagePickInput[] }, "pickSlugs">,
  mousepads: readonly Mousepad[],
): BestPagePickWithMousepad[] {
  return page.pickSlugs
    .map((pick) => {
      const mousepad = mousepads.find((pad) => pad.slug === pick.slug);
      return mousepad ? { ...pick, mousepad } : null;
    })
    .filter((pick): pick is BestPagePickWithMousepad => Boolean(pick));
}
