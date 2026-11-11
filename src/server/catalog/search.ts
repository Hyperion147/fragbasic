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

/**
 * Full public search index built from the published database rows. Lives on
 * the server so the client bundle never imports the catalog.
 */
export async function buildPublicSearchIndex(): Promise<SearchItem[]> {
  const [pads, iems, skates, comparisons, bestPages, guides] = await Promise.all([
    getPublicPads(),
    getPublicIems(),
    getPublicMouseSkates(),
    getPublicComparisons(),
    getPublicBestPages(),
    getPublicGuides(),
  ]);

  return [
    ...padSearchItems(pads),
    ...iemSearchItems(iems),
    ...skateSearchItems(skates),
    ...bestPageSearchItems(bestPages),
    ...articleSearchItems(guides),
    ...comparisonSearchItems(comparisons),
  ];
}
