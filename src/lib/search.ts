import { formatMouseSkateMaterial } from "@/lib/accessories/mouse-skates";
import { formatIemSoundSignature, getIemFullName } from "@/lib/iems/format";
import { formatMousepadValue } from "@/lib/utils/format";
import type { MousepadComparison } from "@/types/comparison";
import type { GuideDataInput } from "@/schemas/guide";
import type { MouseSkate } from "@/types/accessory";
import type { Iem } from "@/types/iem";
import type { Mousepad } from "@/types/mousepad";

export type SearchKind =
  | "mousepad"
  | "glasspad"
  | "iem"
  | "skate"
  | "guide"
  | "article"
  | "comparison";

export interface SearchItem {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  keywords: string[];
}

export interface SearchGroup {
  kind: SearchKind;
  label: string;
  items: SearchItem[];
}

export const SEARCH_GROUP_ORDER: SearchKind[] = [
  "mousepad",
  "glasspad",
  "iem",
  "skate",
  "guide",
  "article",
  "comparison",
];

export const SEARCH_GROUP_LABELS: Record<SearchKind, string> = {
  mousepad: "Mousepads",
  glasspad: "Glasspads",
  iem: "IEMs",
  skate: "Skates",
  guide: "Best pages",
  article: "Guides",
  comparison: "Comparisons",
};

export const MAX_RESULTS_PER_GROUP = 6;

function formatIemPriceTierLabel(tier: Iem["priceTier"]): string {
  const labels: Record<Iem["priceTier"], string> = {
    "under-2000": "Under ₹2k",
    "under-5000": "Under ₹5k",
    midrange: "Midrange",
    premium: "Premium",
  };
  return labels[tier];
}

export function iemSearchItems(iems: readonly Iem[]): SearchItem[] {
  return iems.map((iem) => ({
    id: `iem-${iem.slug}`,
    kind: "iem" as const,
    title: getIemFullName(iem),
    subtitle: `${formatIemSoundSignature(iem.soundSignature)} · ${formatIemPriceTierLabel(iem.priceTier)}`,
    href: `/iems/${iem.slug}`,
    keywords: [iem.brand, iem.name, iem.shortName, iem.slug, iem.driverType, iem.soundSignature],
  }));
}

export function padSearchItems(pads: readonly Mousepad[]): SearchItem[] {
  return pads.map((pad) => ({
    id: `pad-${pad.slug}`,
    kind: pad.category === "glass" ? "glasspad" : "mousepad",
    title: `${pad.brand} ${pad.name}`,
    subtitle: `${formatMousepadValue(pad.category)} · ${formatMousepadValue(pad.surface)}`,
    href: `/mousepads/${pad.slug}`,
    keywords: [pad.brand, pad.name, pad.series ?? "", pad.slug, pad.category, pad.surface],
  }));
}

export function skateSearchItems(skates: readonly MouseSkate[]): SearchItem[] {
  return skates.map((skate) => ({
    id: `skate-${skate.slug}`,
    kind: "skate" as const,
    title: `${skate.brand} ${skate.name}`,
    subtitle: `${formatMouseSkateMaterial(skate.material)} · ${skate.shape}`,
    href: "/accessories/mouse-skates/browse",
    keywords: [skate.brand, skate.name, skate.series, skate.slug, skate.material, skate.shape],
  }));
}

export function bestPageSearchItems(
  pages: readonly {
    slug: string;
    title: string;
    eyebrow: string;
    badge: string;
    keywords: string[];
  }[],
): SearchItem[] {
  return pages.map((page) => ({
    id: `guide-${page.slug}`,
    kind: "guide" as const,
    title: page.title,
    subtitle: page.eyebrow,
    href: `/best/${page.slug}`,
    keywords: [page.slug, page.badge, ...page.keywords],
  }));
}

export function articleSearchItems(
  guides: readonly GuideDataInput[],
): SearchItem[] {
  return guides.map((guide) => ({
    id: `article-${guide.slug}`,
    kind: "article" as const,
    title: guide.title,
    subtitle: `${guide.category} · ${guide.readingTime} min read`,
    href: `/mousepads/guides/${guide.slug}`,
    keywords: [guide.slug, guide.category, ...guide.keywords],
  }));
}

export function comparisonSearchItems(
  comparisons: readonly MousepadComparison[],
): SearchItem[] {
  return comparisons.map((comparison) => ({
    id: `comparison-${comparison.slug}`,
    kind: "comparison" as const,
    title: comparison.title,
    subtitle: comparison.excerpt,
    href: `/mousepads/compare/${comparison.slug}`,
    keywords: [comparison.slug, ...comparison.tags],
  }));
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface PreparedSearchItem extends SearchItem {
  normalizedTitle: string;
  normalizedHaystack: string;
}

export type SearchableIndexItem = SearchItem | PreparedSearchItem;

/**
 * Normalizes each item once so repeated keystrokes only scan precomputed text.
 * Call this when the index arrives from the API, not on every search.
 */
export function prepareSearchIndex(
  items: readonly SearchItem[],
): PreparedSearchItem[] {
  return items.map((item) => ({
    ...item,
    normalizedTitle: normalizeSearchText(item.title),
    normalizedHaystack: normalizeSearchText(
      [item.title, item.subtitle, ...item.keywords].join(" "),
    ),
  }));
}

function isPreparedSearchItem(
  item: SearchableIndexItem,
): item is PreparedSearchItem {
  return "normalizedHaystack" in item;
}

function scoreToken(title: string, haystack: string, token: string): number {
  if (title.startsWith(token)) return 3;
  if (title.includes(` ${token}`)) return 2;
  if (title.includes(token)) return 1;
  if (haystack.includes(token)) return 0.5;
  return 0;
}

function scoreItem(item: SearchableIndexItem, tokens: string[]): number {
  const title = isPreparedSearchItem(item)
    ? item.normalizedTitle
    : normalizeSearchText(item.title);
  const haystack = isPreparedSearchItem(item)
    ? item.normalizedHaystack
    : normalizeSearchText(
        [item.title, item.subtitle, ...item.keywords].join(" "),
      );
  let score = 0;
  for (const token of tokens) {
    const tokenScore = scoreToken(title, haystack, token);
    if (tokenScore === 0) return 0;
    score += tokenScore;
  }
  return score;
}

export function searchItems(
  index: readonly SearchableIndexItem[],
  query: string,
): SearchItem[] {
  const tokens = normalizeSearchText(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return [];

  return index
    .map((item) => ({ item, score: scoreItem(item, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score || left.item.title.localeCompare(right.item.title),
    )
    .map((entry) => entry.item);
}

export function groupSearchResults(items: SearchItem[]): SearchGroup[] {
  const groups: SearchGroup[] = [];
  for (const kind of SEARCH_GROUP_ORDER) {
    const kindItems = items
      .filter((item) => item.kind === kind)
      .slice(0, MAX_RESULTS_PER_GROUP);
    if (kindItems.length > 0) {
      groups.push({ kind, label: SEARCH_GROUP_LABELS[kind], items: kindItems });
    }
  }
  return groups;
}

export function searchAndGroup(
  index: readonly SearchableIndexItem[],
  query: string,
): SearchGroup[] {
  return groupSearchResults(searchItems(index, query));
}
