import { buildSearchIndex, iemSearchItems, padSearchItems, type SearchItem } from "@/lib/search";
import { getPublicIems } from "./iems";
import { getPublicPads } from "./pads";
import { isDbCatalogSource } from "./source";

/**
 * Full public search index. Each cut-over module replaces its bundled static
 * items with the live published rows.
 */
export async function buildPublicSearchIndex(): Promise<SearchItem[]> {
  const padsFromDb =
    isDbCatalogSource("mousepads") || isDbCatalogSource("glasspads");
  const iemsFromDb = isDbCatalogSource("iems");

  if (!padsFromDb && !iemsFromDb) {
    return buildSearchIndex();
  }

  const items = buildSearchIndex().filter((item) => {
    if (
      padsFromDb &&
      (item.kind === "mousepad" || item.kind === "glasspad")
    ) {
      return false;
    }
    if (iemsFromDb && item.kind === "iem") {
      return false;
    }
    return true;
  });

  if (padsFromDb) {
    items.push(...padSearchItems(await getPublicPads()));
  }
  if (iemsFromDb) {
    items.push(...iemSearchItems(await getPublicIems()));
  }

  return items;
}
