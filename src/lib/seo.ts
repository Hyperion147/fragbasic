import type { Metadata } from "next";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

const siteName = "FragBasic";
const siteUrl = "https://fragbasic.fun";
const ogImageUrl = new URL("/og-image.png", siteUrl).toString();
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
  const url = getAbsoluteUrl(path);
  const socialTitle = `${title} | ${siteName}`;

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
      title: socialTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} on ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

export function getRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    creator: siteName,
    publisher: siteName,
    authors: [{ name: siteName }],
    referrer: "origin-when-cross-origin",
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "FragBasic social preview image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FragBasic | Mousepad Database, Glasspads, Comparisons & Finder",
      description: defaultDescription,
      images: [ogImageUrl],
    },
    category: "technology",
  };
}
