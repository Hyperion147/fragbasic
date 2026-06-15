import type { Metadata } from "next";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

const siteName = "FragBasic";
const siteUrl = "https://fragbasic.fun";
const defaultDescription =
  "FragBasic is a mousepad-focused FPS gear database for cloth pads, glasspads, comparisons, and recommendation-driven discovery.";

export function getSiteUrl() {
  return siteUrl;
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: MetadataOptions): Metadata {
  const absoluteImage = getAbsoluteUrl("/og-image.png");
  const url = getAbsoluteUrl(path);

  return {
    title,
    description,
    keywords: [
      "mousepad database",
      "glasspads",
      "cloth mousepads",
      "fps mousepads",
      "mousepad reviews",
      "mousepad comparison",
      "FragBasic",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName,
      title,
      description,
      images: [{ url: absoluteImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}

export function getRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    title: {
      default: "FragBasic | Mousepad Database, Glasspads, Comparisons & Finder",
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: [
      "mousepad database",
      "glasspads",
      "cloth mousepads",
      "fps gear",
      "mousepad finder",
      "mousepad comparisons",
      "Artisan Zero review",
      "LGG Saturn Pro review",
    ],
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName,
      title: "FragBasic | Mousepad Database, Glasspads, Comparisons & Finder",
      description: defaultDescription,
      images: [
        {
          url: getAbsoluteUrl("/og-image.png"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FragBasic | Mousepad Database, Glasspads, Comparisons & Finder",
      description: defaultDescription,
      images: [getAbsoluteUrl("/og-image.png")],
    },
    category: "technology",
  };
}
