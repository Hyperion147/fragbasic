import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      // Let crawlers see the CMS noindex directive. APIs are not search pages.
      disallow: ["/api/"],
    }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).hostname,
  };
}
