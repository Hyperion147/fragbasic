import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/seo";
import { getCatalogSitemap } from "@/server/catalog/sitemap";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/", "/editorial-policy", "/mousepads", "/mousepads/brand", "/mousepads/glasspads",
    "/mousepads/guides", "/mousepads/compare", "/mousepads/compare/universal",
    "/iems", "/iems/compare", "/accessories/mouse-skates",
    "/accessories/mouse-skates/browse", "/accessories/mouse-skates/compare", "/best",
  ].map((path) => ({ url: getAbsoluteUrl(path) }));

  return [...staticRoutes, ...await getCatalogSitemap()];
}
