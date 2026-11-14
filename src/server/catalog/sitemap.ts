import type { MetadataRoute } from "next";

import { getBrandSlug } from "@/lib/brands";
import { getAbsoluteUrl } from "@/lib/seo";
import * as mousepads from "@/server/mousepads/repo";
import * as glasspads from "@/server/glasspads/repo";
import * as iems from "@/server/iems/repo";
import * as accessories from "@/server/accessories/repo";
import * as comparisons from "@/server/comparisons/repo";
import * as bestPages from "@/server/best-pages/repo";
import * as guides from "@/server/guides/repo";

// Use database modification timestamps, rather than build time or an embedded
// editorial date that may no longer reflect the latest published content.
export async function getCatalogSitemap(): Promise<MetadataRoute.Sitemap> {
  const [soft, glass, audio, skates, matchups, best, articles] = await Promise.all([
    mousepads.listMousepads(), glasspads.listGlasspads(), iems.listIems(),
    accessories.listMouseSkates(), comparisons.listComparisons(),
    bestPages.listBestPages(), guides.listGuides(),
  ]);
  const pads = [...soft, ...glass].filter((row) => row.status === "published");
  const publicSlugs = new Set(pads.map((row) => row.slug));
  const entries: MetadataRoute.Sitemap = [];
  const brands = new Map<string, Date>();

  for (const row of pads) {
    entries.push({
      url: getAbsoluteUrl(`/mousepads/${row.slug}`),
      lastModified: row.updatedAt,
      images: [getAbsoluteUrl(row.data.images.main)],
    });
    const slug = getBrandSlug(row.brand);
    const previous = brands.get(slug);
    if (!previous || row.updatedAt > previous) brands.set(slug, row.updatedAt);
  }
  for (const [slug, lastModified] of brands) {
    entries.push({ url: getAbsoluteUrl(`/mousepads/brand/${slug}`), lastModified });
  }
  for (const row of audio.filter((row) => row.status === "published")) {
    entries.push({
      url: getAbsoluteUrl(`/iems/${row.slug}`), lastModified: row.updatedAt,
      images: [getAbsoluteUrl(row.data.images.main)],
    });
  }
  const groups = [
    { prefix: "/accessories/mouse-skates", rows: skates },
    { prefix: "/mousepads/compare", rows: matchups.filter((row) =>
      publicSlugs.has(row.data.leftSlug) && publicSlugs.has(row.data.rightSlug)) },
    { prefix: "/best", rows: best },
    { prefix: "/mousepads/guides", rows: articles },
  ];
  for (const { prefix, rows } of groups) {
    for (const row of rows.filter((row) => row.status === "published")) {
      entries.push({ url: getAbsoluteUrl(`${prefix}/${row.slug}`), lastModified: row.updatedAt });
    }
  }
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}
