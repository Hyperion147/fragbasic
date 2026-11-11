import { getAllBestPages } from "@/data/best-pages";
import { getAllMouseSkates } from "@/data/accessories/mouse-skates";
import { getAllGuides } from "@/data/guides";
import { getPublishedComparisons } from "@/lib/comparisons";
import { getAllIems } from "@/lib/iems";
import { getAllMousepads } from "@/lib/mousepads";
import {
  articleSearchItems,
  bestPageSearchItems,
  comparisonSearchItems,
  iemSearchItems,
  padSearchItems,
  skateSearchItems,
  type SearchItem,
} from "@/lib/search";
import { getPublicMouseSkates } from "./accessories";
import { getPublicBestPages } from "./best-pages";
import { getPublicComparisons } from "./comparisons";
import { getPublicGuides } from "./guides";
import { getPublicIems } from "./iems";
import { getPublicPads } from "./pads";
import { isDbCatalogSource } from "./source";

/**
 * Static index used as the mixed-source fallback. Lives on the server so the
 * client bundle never imports the catalog data files.
 */
function buildStaticSearchIndex(): SearchItem[] {
  return [
    ...padSearchItems(getAllMousepads()),
    ...iemSearchItems(getAllIems()),
    ...skateSearchItems(getAllMouseSkates()),
    ...bestPageSearchItems(getAllBestPages()),
    ...articleSearchItems(getAllGuides()),
    ...comparisonSearchItems(getPublishedComparisons()),
  ];
}

/**
 * Full public search index. Each cut-over module replaces its bundled static
 * items with the live published rows.
 */
export async function buildPublicSearchIndex(): Promise<SearchItem[]> {
  const padsFromDb =
    isDbCatalogSource("mousepads") || isDbCatalogSource("glasspads");
  const iemsFromDb = isDbCatalogSource("iems");
  const skatesFromDb = isDbCatalogSource("accessories");
  const comparisonsFromDb = isDbCatalogSource("comparisons");
  const bestPagesFromDb = isDbCatalogSource("best-pages");
  const guidesFromDb = isDbCatalogSource("guides");

  if (
    !padsFromDb &&
    !iemsFromDb &&
    !skatesFromDb &&
    !comparisonsFromDb &&
    !bestPagesFromDb &&
    !guidesFromDb
  ) {
    return buildStaticSearchIndex();
  }

  const items = buildStaticSearchIndex().filter((item) => {
    if (
      padsFromDb &&
      (item.kind === "mousepad" || item.kind === "glasspad")
    ) {
      return false;
    }
    if (iemsFromDb && item.kind === "iem") {
      return false;
    }
    if (skatesFromDb && item.kind === "skate") {
      return false;
    }
    if (comparisonsFromDb && item.kind === "comparison") {
      return false;
    }
    if (bestPagesFromDb && item.kind === "guide") {
      return false;
    }
    if (guidesFromDb && item.kind === "article") {
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
  if (skatesFromDb) {
    items.push(...skateSearchItems(await getPublicMouseSkates()));
  }
  if (comparisonsFromDb) {
    items.push(...comparisonSearchItems(await getPublicComparisons()));
  }
  if (bestPagesFromDb) {
    items.push(...bestPageSearchItems(await getPublicBestPages()));
  }
  if (guidesFromDb) {
    items.push(...articleSearchItems(await getPublicGuides()));
  }

  return items;
}
