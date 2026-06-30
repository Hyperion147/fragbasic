import type { Metadata } from "next";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
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

export function getSiteName() {
  return siteName;
}

export function getDefaultDescription() {
  return defaultDescription;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = ogImageUrl,
}: MetadataOptions): Metadata {
  const url = getAbsoluteUrl(path);
  const socialTitle = `${title} | ${siteName}`;
  const socialImage = image.startsWith("http") ? image : getAbsoluteUrl(image);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "mousepad database",
      "glasspads",
      "cloth mousepads",
      "fps mousepads",
      "mousepad reviews",
      "mousepad comparison",
      "gaming gear database",
      "FPS gear",
      "FragBasic",
      ...keywords,
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: socialTitle,
      description,
      images: [
        {
          url: socialImage,
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
      images: [socialImage],
    },
  };
}

export function getRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    creator: siteName,
    publisher: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    referrer: "origin-when-cross-origin",
    manifest: "/manifest.webmanifest",
    title: {
      default: "FragBasic | Mousepad Database, Glasspads & Comparisons",
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: [
      "mousepad database",
      "glasspads",
      "cloth mousepads",
      "fps gear",
      "mousepad comparisons",
      "Artisan Zero review",
      "LGG Saturn Pro review",
    ],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName,
      locale: "en_US",
      title: "FragBasic | Mousepad Database, Glasspads & Comparisons",
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

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: getAbsoluteUrl("/logo.png"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/mousepads?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildCollectionJsonLd({
  name,
  description,
  path,
  itemCount,
}: {
  name: string;
  description: string;
  path: string;
  itemCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: getAbsoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    numberOfItems: itemCount,
  };
}

export function buildProductJsonLd({
  name,
  description,
  path,
  image,
  brand,
  price,
  priceCurrency = "INR",
  availability,
  category,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  brand: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: getAbsoluteUrl(path),
    image: getAbsoluteUrl(image),
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers:
      price || availability
        ? {
            "@type": "Offer",
            price,
            priceCurrency,
            availability: availability
              ? `https://schema.org/${availability}`
              : undefined,
            url: getAbsoluteUrl(path),
          }
        : undefined,
  };
}
