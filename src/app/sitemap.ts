import type { MetadataRoute } from "next";

import { getAllBrandSlugs } from "@/lib/brands";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllIems } from "@/lib/iems";
import { getAllMousepads } from "@/lib/mousepads";
import { getSiteUrl } from "@/lib/seo";
import { getBestPageSlugs } from "@/data/best-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    "",
    "/mousepads",
    "/mousepads/glasspads",
    "/mousepads/brands",
    "/mousepads/finder",
    "/mousepads/compare",
    "/mousepads/compare/universal",
    "/iems",
    "/accessories/mouse-skates",
    "/accessories/mouse-skates/browse",
    "/accessories/mouse-skates/compare",
    "/best",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const mousepadRoutes = getAllMousepads().map((mousepad) => ({
    url: `${siteUrl}/mousepads/${mousepad.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: [`${siteUrl}${mousepad.images.main}`],
  }));

  const iemRoutes = getAllIems().map((iem) => ({
    url: `${siteUrl}/iems/${iem.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.86,
    images: [`${siteUrl}${iem.images.main}`],
  }));

  const brandRoutes = getAllBrandSlugs().map((brand) => ({
    url: `${siteUrl}/mousepads/brands/${brand}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const comparisonRoutes = getAllComparisons().map((comparison) => ({
    url: `${siteUrl}/mousepads/compare/${comparison.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bestRoutes = getBestPageSlugs().map((slug) => ({
    url: `${siteUrl}/best/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...mousepadRoutes,
    ...iemRoutes,
    ...brandRoutes,
    ...comparisonRoutes,
    ...bestRoutes,
  ];
}
