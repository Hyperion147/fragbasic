import { getAllBestPages } from "@/data/best-pages";
import { getAllMouseSkates } from "@/data/accessories/mouse-skates";
import { getAllMousepads, getMousepadFullName } from "@/lib/mousepads";
import { formatMouseSkateMaterial } from "@/lib/accessories/mouse-skates";
import { getPublishedComparisons } from "@/lib/comparisons";
import {
  formatIemSoundSignature,
  getAllIems,
  getIemFullName,
} from "@/lib/iems";
import { formatMousepadValue } from "@/lib/utils/format";
import type { Iem } from "@/types/iem";

export type SearchKind =
  | "mousepad"
  | "glasspad"
  | "iem"
  | "skate"
  | "guide"
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
  "comparison",
];

export const SEARCH_GROUP_LABELS: Record<SearchKind, string> = {
  mousepad: "Mousepads",
  glasspad: "Glasspads",
  iem: "IEMs",
  skate: "Skates",
  guide: "Best guides",
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

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const pad of getAllMousepads()) {
    const isGlass = pad.category === "glass";
    items.push({
      id: `pad-${pad.slug}`,
      kind: isGlass ? "glasspad" : "mousepad",
      title: getMousepadFullName(pad),
      subtitle: `${formatMousepadValue(pad.category)} · ${formatMousepadValue(pad.surface)}`,
      href: `/mousepads/${pad.slug}`,
      keywords: [pad.brand, pad.name, pad.series ?? "", pad.slug, pad.category, pad.surface],
    });
  }

  for (const iem of getAllIems()) {
    items.push({
      id: `iem-${iem.slug}`,
      kind: "iem",
      title: getIemFullName(iem),
      subtitle: `${formatIemSoundSignature(iem.soundSignature)} · ${formatIemPriceTierLabel(iem.priceTier)}`,
      href: `/iems/${iem.slug}`,
      keywords: [iem.brand, iem.name, iem.shortName, iem.slug, iem.driverType, iem.soundSignature],
    });
  }

  for (const skate of getAllMouseSkates()) {
    items.push({
      id: `skate-${skate.slug}`,
      kind: "skate",
      title: `${skate.brand} ${skate.name}`,
      subtitle: `${formatMouseSkateMaterial(skate.material)} · ${skate.shape}`,
      href: "/accessories/mouse-skates/browse",
      keywords: [skate.brand, skate.name, skate.series, skate.slug, skate.material, skate.shape],
    });
  }

  for (const page of getAllBestPages()) {
    items.push({
      id: `guide-${page.slug}`,
      kind: "guide",
      title: page.title,
      subtitle: page.eyebrow,
      href: `/best/${page.slug}`,
      keywords: [page.slug, page.badge, ...page.keywords],
    });
  }

  for (const comparison of getPublishedComparisons()) {
    items.push({
      id: `comparison-${comparison.slug}`,
      kind: "comparison",
      title: comparison.title,
      subtitle: comparison.excerpt,
      href: `/mousepads/compare/${comparison.slug}`,
      keywords: [comparison.slug, ...comparison.tags],
    });
  }

  return items;
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

function scoreToken(title: string, haystack: string, token: string): number {
  if (title.startsWith(token)) return 3;
  if (title.includes(` ${token}`)) return 2;
  if (title.includes(token)) return 1;
  if (haystack.includes(token)) return 0.5;
  return 0;
}

function scoreItem(item: SearchItem, tokens: string[]): number {
  const title = normalizeSearchText(item.title);
  const haystack = normalizeSearchText(
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

export function searchItems(index: SearchItem[], query: string): SearchItem[] {
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

export function searchAndGroup(index: SearchItem[], query: string): SearchGroup[] {
  return groupSearchResults(searchItems(index, query));
}
