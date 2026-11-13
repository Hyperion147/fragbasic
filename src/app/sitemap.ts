import type { MetadataRoute } from "next";

import { getBrandSlugs } from "@/lib/brands";
import { getSiteUrl } from "@/lib/seo";
import { getPublicBestPageSlugs } from "@/server/catalog/best-pages";
import { getPublicComparisons } from "@/server/catalog/comparisons";
import { getPublicGuides } from "@/server/catalog/guides";
import { getPublicIems } from "@/server/catalog/iems";
import { getPublicPads } from "@/server/catalog/pads";
import { getPublicMouseSkates } from "@/server/catalog/accessories";

export const revalidate = 300;

function toAbsoluteUrl(siteUrl: string, value: string) {
  return /^https?:\/\//i.test(value) ? value : `${siteUrl}${value}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [iems, mousepads, comparisons, bestPageSlugs, guides, mouseSkates] =
    await Promise.all([
      getPublicIems(),
      getPublicPads(),
      getPublicComparisons(),
      getPublicBestPageSlugs(),
      getPublicGuides(),
      getPublicMouseSkates(),
    ]);

  // NOTE: only emit lastModified where we have a real source date (IEMs).
  // Emitting `new Date()` for every URL fakes freshness and hurts AI/trust
  // signals. Mousepads/comparisons/best-pages have no updatedAt field yet —
  // omit lastModified until one is added rather than lying.
  const staticRoutes = [
    "",
    "/mousepads",
    "/mousepads/brand",
    "/mousepads/glasspads",
    "/mousepads/guides",
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

  const mousepadRoutes = mousepads.map((mousepad) => ({
    url: `${siteUrl}/mousepads/${mousepad.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: [toAbsoluteUrl(siteUrl, mousepad.images.main)],
  }));

  const brandRoutes = getBrandSlugs(mousepads.map((pad) => pad.brand)).map(
    (slug) => ({
      url: `${siteUrl}/mousepads/brand/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    }),
  );

  const iemRoutes = iems.map((iem) => ({
    url: `${siteUrl}/iems/${iem.slug}`,
    lastModified: iem.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.86,
    images: [toAbsoluteUrl(siteUrl, iem.images.main)],
  }));

  // NOTE: published only — drafts render publicly today, but must not be
  // handed to crawlers until reviewed.
  const comparisonRoutes = comparisons.map((comparison) => ({
    url: `${siteUrl}/mousepads/compare/${comparison.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bestRoutes = bestPageSlugs.map((slug) => ({
    url: `${siteUrl}/best/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${siteUrl}/mousepads/guides/${guide.slug}`,
    lastModified: guide.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const mouseSkateRoutes = mouseSkates.map((skate) => ({
    url: `${siteUrl}/accessories/mouse-skates/${skate.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...mousepadRoutes,
    ...brandRoutes,
    ...iemRoutes,
    ...comparisonRoutes,
    ...bestRoutes,
    ...guideRoutes,
    ...mouseSkateRoutes,
  ];
}
