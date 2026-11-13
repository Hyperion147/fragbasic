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
  "FragBasic is an FPS gear database for gaming mousepads, glasspads, gaming IEMs, and mouse skates. Compare speed, control, stopping power, humidity resistance, imaging, comfort, price, and India availability with best-pick guides and side-by-side matchups for VALORANT, CS2, Apex, and more.";

/**
 * Keyword groups are shared by the metadata helpers and individual pages.
 * They mirror real autocomplete/query language: product names, game names,
 * buying modifiers (India, budget, under 2000), and comparison phrasings.
 */
export const seoKeywords = {
  core: [
    "FPS gear",
    "FPS gear database",
    "gaming gear database",
    "gaming peripherals database",
    "mousepad database",
    "mousepad reviews",
    "gaming mousepad reviews",
    "esports gear",
    "competitive FPS gear",
    "FragBasic",
    "fragbasic.fun",
  ],
  mousepads: [
    "mousepad",
    "mouse pad",
    "gaming mousepad",
    "best mousepad",
    "best gaming mousepad",
    "best mousepad for gaming",
    "best mousepad for fps",
    "best mousepad for fps games",
    "best fps mousepads",
    "best mousepads 2026",
    "best gaming mousepads 2026",
    "mousepad for valorant",
    "best mousepad for valorant",
    "mousepad for cs2",
    "best mousepad for cs2",
    "mousepad for apex",
    "best mousepad for apex legends",
    "mousepad for tracking",
    "best mousepad for tracking",
    "mousepad for low sens",
    "best mousepad for low sens",
    "control mousepad",
    "control mousepads",
    "speed mousepad",
    "speed mousepads",
    "balanced mousepad",
    "balanced control mousepad",
    "hybrid mousepad",
    "cloth mousepad",
    "cloth mousepads",
    "poron mousepad",
    "poron base mousepad",
    "soft mousepad",
    "mousepad for tac fps",
    "mousepad for tracking games",
    "mousepad for fortnite",
    "mousepad for overwatch",
    "mousepad for warzone",
    "mousepad for pubg",
    "mousepad for rainbow six siege",
    "mousepad size for fps",
    "mousepad thickness",
    "mousepad stitched edges",
    "desk mat vs mousepad",
    "mousepad vs desk mat",
    "how to clean mousepad",
    "how often replace mousepad",
    "does mousepad matter",
    "do mouse skates matter",
    "mousepad india",
    "gaming mousepad india",
    "best gaming mousepad india",
    "mousepad under 1000",
    "mousepad under 2000",
    "best mousepad under 1000",
    "best mousepad under 2000",
  ],
  glasspads: [
    "glasspad",
    "glass pad",
    "glass mousepad",
    "glass mousepads",
    "glass pad mouse",
    "glasspad mousepad",
    "gaming glass mousepad",
    "glass mousepad gaming",
    "glass mousepad india",
    "glass mousepad under 1000",
    "glass mousepad under 2000",
    "glass mousepad price",
    "glass mousepad valorant",
    "glass mousepad cs2",
    "glass mousepad apex",
    "glass mousepad for fps",
    "glasspad for valorant",
    "glasspad for cs2",
    "glasspad vs cloth",
    "glass mousepad vs cloth",
    "cloth vs glass mousepad",
    "is glass mousepad better than cloth",
    "best glasspads",
    "best glass mousepads",
    "best glasspad for fps",
    "best glass mousepad",
    "glass mousepad skates",
    "mouse skates for glass pad",
    "glasspad tracking",
    "glasspad control",
    "glasspad speed",
    "are glasspads good for fps",
    "do glasspads need special skates",
  ],
  iems: [
    "IEM",
    "IEMs",
    "in ear monitor",
    "in ear monitors",
    "in ear monitor gaming",
    "gaming IEM",
    "gaming IEMs",
    "gaming iem earphones",
    "gaming iem with mic",
    "gaming iem type c",
    "best IEM",
    "best iem for gaming",
    "best iem for gaming and music",
    "best iem for fps",
    "best iem for fps gaming",
    "best iem for valorant",
    "best iem for cs2",
    "best iem for apex",
    "best iem for warzone",
    "best iem for footsteps",
    "best iem for hearing footsteps",
    "iem for footsteps",
    "iem for fps gaming",
    "budget iem",
    "best budget iem",
    "best budget iem for gaming",
    "iem under 1000",
    "iem under 2000",
    "iem under 3000",
    "iem under 5000",
    "best iem under 1000",
    "best iem under 2000",
    "best iem under 3000",
    "iem for gaming india",
    "best iem for gaming india",
    "best iem for valorant india",
    "budget iem india",
    "iem vs headset",
    "iem vs headset for gaming",
    "iem or headset for gaming",
    "in ear monitor vs gaming headset",
    "wired earbuds for gaming",
    "best earbuds for cs2",
    "best earphones for cs2",
    "best earbuds for valorant",
    "IEM database",
    "IEM reviews",
    "IEM comparison",
  ],
  skates: [
    "mouse skates",
    "mouse skate",
    "mouse feet",
    "mouse feet skates",
    "gaming mouse skates",
    "best mouse skates",
    "best mouse skates for glass mousepad",
    "best mouse skates for glass pad",
    "mouse skates for glass mousepad",
    "mouse skates for cloth pad",
    "mouse skates for cloth",
    "do mouse skates matter",
    "do mouse skates make a difference",
    "what are mouse skates",
    "how long do mouse skates last",
    "mouse skates vs mouse feet",
    "ptfe mouse skates",
    "hardened ptfe mouse skates",
    "uhmwpe mouse skates",
    "glass mouse skates",
    "titanium mouse skates",
    "dot mouse skates",
    "mouse skates dots",
    "mouse skates india",
    "glass mouse skates india",
    "corepad skates",
    "xraypad skates",
    "tiger ice skates",
    "pulsar superglide skates",
    "jade skates",
    "obsidian skates",
    "mouse skate compare",
    "compare mouse skates",
    "glasspad mouse skates",
    "fastest mouse skates",
    "slowest mouse skates",
  ],
  comparisons: [
    "mousepad comparison",
    "mousepad comparisons",
    "compare mousepads",
    "compare mousepads side by side",
    "mousepad compare tool",
    "mousepad vs mousepad",
    "fps pad comparison",
    "glasspad vs cloth pad",
    "mousepad stats comparison",
    "which mousepad is better",
    "what is the difference between mousepads",
    "best mousepad matchup",
    "artisan zero vs lgg saturn pro",
    "artisan zero soft vs lgg saturn pro soft",
    "artisan zero vs type 99",
    "artisan hien vs hayate otsu",
    "artisan hayate otsu vs hien",
    "zowie g sr iii vs artisan zero",
    "atk crimson vs wallhack sp-005",
    "tekkusai phantom vs singularity",
  ],
  bestLists: [
    "best mousepads",
    "best gaming mousepads",
    "best fps mousepads",
    "best mousepad for valorant",
    "best valorant mousepads",
    "best mousepad for cs2",
    "best cs2 mousepads",
    "best control mousepads",
    "best speed mousepads",
    "best glasspads",
    "best glass mousepads",
    "best humidity resistant mousepads",
    "best mousepads for humid climate",
    "best mousepad for sweaty hands",
    "best mousepad for apex legends",
    "best mousepad for tracking",
    "best budget mousepad",
    "what mousepad do pro gamers use",
    "what mousepad do valorant pros use",
    "what mousepad do cs2 pros use",
  ],
  guides: [
    "mousepad guide",
    "gaming mousepad guide",
    "how to choose a mousepad",
    "how to choose your first gaming mousepad",
    "control vs speed mousepad",
    "control vs speed mousepad for valorant",
    "mousepad humidity guide",
    "best mousepad for humid climate",
    "mousepad buying guide",
    "mousepad size guide",
    "mousepad cleaning guide",
    "glasspad guide",
    "mouse skate guide",
    "iem buying guide",
  ],
  brands: [
    "Artisan mousepad",
    "Artisan Zero",
    "Artisan Hien",
    "Artisan Hayate Otsu",
    "Artisan Type-99",
    "Artisan Raiden",
    "LGG Saturn Pro",
    "LGG Jupiter Pro",
    "LGG Neptune Pro",
    "Pulsar x LGG Hyperion",
    "Zowie G-SR",
    "Zowie G-SR III",
    "Zowie G-SR-SE",
    "Xraypad Aqua Control",
    "Xraypad Aqua Control II",
    "Xraypad Equate Plus",
    "SteelSeries QcK",
    "SteelSeries QcK Heavy",
    "SteelSeries QcK Performance",
    "Kurosun Samurai",
    "Kurosun Shogun",
    "ESP Tiger Wuxiang",
    "Wallhack SP-005",
    "Tekkusai Phantom",
    "Tekkusai Singularity",
    "ATK Crimson",
    "Yuki Aim Monokuro",
    "Truthear Zero Red",
    "Moondrop Chu II",
    "Tangzu Wan'er",
    "Simgot EW200",
    "KZ EDX Pro",
    "Dunu Titan X",
    "7Hz Salnotes Zero",
  ],
  questions: [
    "what mousepad is best for valorant",
    "what mousepad is best for cs2",
    "is a glass mousepad better than cloth",
    "are glass mousepads good for fps",
    "does a mousepad matter for gaming",
    "do mouse skates matter",
    "what mouse skates are best for glass",
    "are iems good for gaming",
    "are iems better than headsets for fps",
    "what iem is best for hearing footsteps",
    "what is the best budget iem",
    "how often should you replace a mousepad",
    "how do you clean a mousepad",
    "what mousepad size do i need",
  ],
  games: [
    "VALORANT",
    "CS2",
    "Counter-Strike 2",
    "Apex Legends",
    "Fortnite",
    "Overwatch 2",
    "Call of Duty Warzone",
    "Rainbow Six Siege",
    "PUBG",
    "tracking FPS",
    "tactical FPS",
    "competitive FPS",
  ],
} as const;

export function getSiteUrl() {
  return siteUrl;
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getSiteName() {
  return siteName;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getDefaultDescription() {
  return defaultDescription;
}

/**
 * Search engines truncate meta descriptions around 160 characters. Generated
 * descriptions concatenate database copy with page-specific suffixes, so clamp
 * at a word boundary instead of letting rows run past the snippet limit.
 */
export function clampDescription(text: string, maxLength = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const cut = normalized.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const clipped = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;

  return `${clipped.trimEnd()}…`;
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
  // Long product names would be truncated in search results once the site
  // suffix is appended. Drop the suffix for those pages so the product name
  // stays intact.
  const documentTitle = socialTitle.length > 62 ? { absolute: title } : title;
  const socialImage = image.startsWith("http") ? image : getAbsoluteUrl(image);
  const mergedKeywords = Array.from(
    new Set([...seoKeywords.core, ...keywords]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: documentTitle,
    description: clampDescription(description),
    keywords: mergedKeywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    alternates: {
      canonical: url,
      types: {
        "text/plain": "/llms.txt",
      },
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
      description: clampDescription(description),
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
      description: clampDescription(description),
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
      default: "FragBasic | Mousepad, Glasspad & Gaming IEM Database",
      template: `%s | ${siteName}`,
    },
    description: clampDescription(defaultDescription),
    keywords: Array.from(
      new Set([
        ...seoKeywords.core,
        ...seoKeywords.mousepads.slice(0, 30),
        ...seoKeywords.glasspads.slice(0, 12),
        ...seoKeywords.iems.slice(0, 16),
        ...seoKeywords.skates.slice(0, 12),
      ]),
    ),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteUrl,
      types: {
        "text/plain": "/llms.txt",
      },
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
      title: "FragBasic | Mousepad, Glasspad & Gaming IEM Database",
      description: clampDescription(defaultDescription),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "FragBasic FPS gear database",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FragBasic | FPS Mousepad, Glasspad & IEM Database",
      description: clampDescription(defaultDescription),
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
    alternateName: "FragBasic FPS Gear Database",
    url: siteUrl,
    description: clampDescription(defaultDescription),
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: getAbsoluteUrl("/logo.png"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/mousepads?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: getAbsoluteUrl("/logo.png"),
    description:
      "Independent FPS gear research covering gaming mousepads, glasspads, gaming IEMs, mouse skates, comparisons, and best-pick guides.",
    sameAs: ["https://x.com/suryansu87"],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "gaming mousepads",
      "glass mousepads",
      "gaming IEMs",
      "mouse skates",
      "VALORANT gear",
      "CS2 gear",
      "Apex Legends gear",
      "FPS peripherals",
    ],
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ label: string; href?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? getAbsoluteUrl(item.href) : undefined,
    })),
  };
}

export function buildItemListJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: getAbsoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: getAbsoluteUrl(item.url),
    })),
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
  review,
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
  brand: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
  category: string;
  review: {
    name: string;
    body: string;
    author: string;
    authorUrl?: string;
    datePublished?: string;
    rating?: number;
    bestRating?: number;
    positiveNotes?: string[];
    negativeNotes?: string[];
  };
}) {
  const hasValidPrice =
    typeof price === "number" && Number.isFinite(price) && price > 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: getAbsoluteUrl(path),
    image: image ? getAbsoluteUrl(image) : undefined,
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    review: {
      "@type": "Review",
      name: review.name,
      reviewBody: review.body,
      author: {
        "@type": "Person",
        name: review.author,
        url: review.authorUrl,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      datePublished: review.datePublished,
      reviewRating:
        typeof review.rating === "number"
          ? {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: review.bestRating ?? 10,
              worstRating: 1,
            }
          : undefined,
      positiveNotes: buildReviewNotes(review.positiveNotes),
      negativeNotes: buildReviewNotes(review.negativeNotes),
    },
    offers: hasValidPrice
      ? {
          "@type": "Offer",
          price,
          priceCurrency,
          availability: availability
            ? `https://schema.org/${availability}`
            : undefined,
          url: getAbsoluteUrl(path),
          itemCondition: "https://schema.org/NewCondition",
        }
      : undefined,
  };
}

function buildReviewNotes(notes?: string[]) {
  if (!notes?.length) {
    return undefined;
  }

  return {
    "@type": "ItemList",
    itemListElement: notes.map((note, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: note,
    })),
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords = [],
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: getAbsoluteUrl(path),
    mainEntityOfPage: getAbsoluteUrl(path),
    image: image ? getAbsoluteUrl(image) : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    articleSection: "FPS gear guides",
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/logo.png"),
      },
    },
  };
}

export function buildFaqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
