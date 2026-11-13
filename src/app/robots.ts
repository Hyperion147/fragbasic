import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const hostname = new URL(siteUrl).hostname;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Admin/CMS and API routes should never compete with public pages.
        disallow: ["/api/", "/cms67/", "/cms67"],
      },
      {
        // Explicit AI search/agent crawlers — the wildcard rule already
        // allows them, but an explicit stance is an AI-SEO discovery signal.
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/api/", "/cms67/", "/cms67"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: hostname,
  };
}
