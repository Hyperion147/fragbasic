import type { MetadataRoute } from "next";

import { getAllComparisons } from "@/lib/comparisons";
import { getAllIems } from "@/lib/iems";
import { getAllMousepads } from "@/lib/mousepads";
import { getSiteUrl } from "@/lib/seo";
import { getBestPageSlugs } from "@/data/best-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  // NOTE: only emit lastModified where we have a real source date (IEMs).
  // Emitting `new Date()` for every URL fakes freshness and hurts AI/trust
  // signals. Mousepads/comparisons/best-pages have no updatedAt field yet —
  // omit lastModified until one is added rather than lying.
  const staticRoutes = [
    "",
    "/mousepads",
    "/mousepads/glasspads",
    "/mousepads/compare",
    "/mousepads/compare/universal",
    "/iems",
    "/iems/compare",
    "/accessories/mouse-skates",
    "/accessories/mouse-skates/browse",
    "/accessories/mouse-skates/compare",
    "/best",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const mousepadRoutes = getAllMousepads().map((mousepad) => ({
    url: `${siteUrl}/mousepads/${mousepad.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: [`${siteUrl}${mousepad.images.main}`],
  }));

  const iemRoutes = getAllIems().map((iem) => ({
    url: `${siteUrl}/iems/${iem.slug}`,
    lastModified: iem.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.86,
    images: [`${siteUrl}${iem.images.main}`],
  }));

  const comparisonRoutes = getAllComparisons().map((comparison) => ({
    url: `${siteUrl}/mousepads/compare/${comparison.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bestRoutes = getBestPageSlugs().map((slug) => ({
    url: `${siteUrl}/best/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...mousepadRoutes,
    ...iemRoutes,
    ...comparisonRoutes,
    ...bestRoutes,
  ];
}
