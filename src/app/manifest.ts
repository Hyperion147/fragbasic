import type { MetadataRoute } from "next";

import { getDefaultDescription, getSiteName, getSiteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: `${getSiteName()} - FPS Gear Database`,
    short_name: getSiteName(),
    description: getDefaultDescription(),
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050608",
    theme_color: "#7dd3fc",
    categories: ["shopping", "sports", "utilities"],
    icons: [
      {
        src: `${siteUrl}/logo.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
