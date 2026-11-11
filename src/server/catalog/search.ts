import { buildSearchIndex, iemSearchItems, type SearchItem } from "@/lib/search";
import { getPublicIems } from "./iems";
import { isDbCatalogSource } from "./source";

/**
 * Full public search index. When the IEM module points at the database, its
 * static items are replaced with the live published rows.
 */
export async function buildPublicSearchIndex(): Promise<SearchItem[]> {
  if (!isDbCatalogSource("iems")) {
    return buildSearchIndex();
  }

  const baseItems = buildSearchIndex().filter((item) => item.kind !== "iem");
  return [...baseItems, ...iemSearchItems(await getPublicIems())];
}
