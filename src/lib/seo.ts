import type { Metadata } from "next";
import { createElement } from "react";

import type { Mousepad } from "@/types/mousepad";
import { formatSize, formatValue } from "@/lib/utils/format";

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

export function JsonLd({ data }: { data: unknown }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  });
}

export function buildBreadcrumbJsonLd(
  items: Array<{ label: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function buildMousepadReviewJsonLd(mousepad: Mousepad) {
  const name = `${mousepad.brand} ${mousepad.name}`;
  const primarySource = mousepad.sources.find((source) => source.url);
  const price = mousepad.price.usd ?? mousepad.price.inr;
  const currency = mousepad.price.usd ? "USD" : "INR";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    brand: {
      "@type": "Brand",
      name: mousepad.brand,
    },
    image: getAbsoluteUrl(mousepad.images.main),
    description: `${name} review, specs, feel scores, community consensus, and FPS recommendations on FragBasic.`,
    category:
      mousepad.category === "glass" ? "Glass mousepad" : "Gaming mousepad",
    material: formatValue(mousepad.surface),
    size: mousepad.sizes.map(formatSize).join(", "),
    url: getAbsoluteUrl(`/mousepads/${mousepad.slug}`),
    sameAs: primarySource?.url,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Speed", value: mousepad.feel.speed },
      { "@type": "PropertyValue", name: "Control", value: mousepad.feel.control },
      {
        "@type": "PropertyValue",
        name: "Stopping power",
        value: mousepad.feel.stoppingPower,
      },
      {
        "@type": "PropertyValue",
        name: "Humidity resistance",
        value: mousepad.environment.humidityResistance,
      },
      {
        "@type": "PropertyValue",
        name: "Surface",
        value: formatValue(mousepad.surface),
      },
    ],
    offers: price
      ? {
          "@type": "Offer",
          priceCurrency: currency,
          price,
          availability:
            mousepad.availability.india === "unavailable"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          url: getAbsoluteUrl(`/mousepads/${mousepad.slug}`),
        }
      : undefined,
    review: {
      "@type": "Review",
      name: `${name} review`,
      reviewBody: mousepad.communityConsensus.summary,
      author: {
        "@type": "Organization",
        name: siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: mousepad.feel.speed,
        bestRating: 10,
        worstRating: 1,
      },
      positiveNotes: {
        "@type": "ItemList",
        itemListElement: mousepad.communityConsensus.strengths.map(
          (strength, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: strength,
          }),
        ),
      },
      negativeNotes: {
        "@type": "ItemList",
        itemListElement: mousepad.communityConsensus.weaknesses.map(
          (weakness, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: weakness,
          }),
        ),
      },
    },
  };
}

export function buildMousepadItemListJsonLd({
  name,
  description,
  path,
  mousepads,
}: {
  name: string;
  description: string;
  path: string;
  mousepads: Mousepad[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: getAbsoluteUrl(path),
    itemListElement: mousepads.map((mousepad, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(`/mousepads/${mousepad.slug}`),
      item: {
        "@type": "Product",
        name: `${mousepad.brand} ${mousepad.name}`,
        image: getAbsoluteUrl(mousepad.images.main),
        brand: {
          "@type": "Brand",
          name: mousepad.brand,
        },
        description: mousepad.communityConsensus.summary,
      },
    })),
  };
}

export function buildGuideArticleJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: getAbsoluteUrl(path),
    image: ogImageUrl,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
}

export function buildGlasspadsFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are glasspads good for FPS games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Glasspads are strong for tracking-heavy FPS games because they offer very low friction, consistent glide, and excellent humidity resistance. Tactical FPS players should consider whether they can handle the lower stopping power.",
        },
      },
      {
        "@type": "Question",
        name: "What makes glass mousepads different from cloth mousepads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Glass mousepads use a hard surface that stays fast and easy to clean. Cloth mousepads usually provide more natural stopping power, softness, and surface feedback.",
        },
      },
      {
        "@type": "Question",
        name: "Do glasspads need special mouse skates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Glasspads work best with skates that are suited to hard surfaces. Skate choice changes speed, noise, stopping power, and long-term comfort more noticeably than it does on many cloth pads.",
        },
      },
    ],
  };
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
