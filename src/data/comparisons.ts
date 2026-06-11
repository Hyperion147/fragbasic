export type ComparisonStatus = "published" | "draft"

export interface MousepadComparison {
  slug: string
  title: string
  leftSlug: string
  rightSlug: string
  excerpt: string
  status: ComparisonStatus
  tags: string[]
}

export const comparisons: MousepadComparison[] = [
  {
    slug: "artisan-zero-soft-vs-pulsar-lgg-hyperion-soft",
    title: "Artisan Zero Soft vs Pulsar x LGG Hyperion Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "pulsar-lgg-hyperion-soft",
    excerpt:
      "A balanced-control benchmark compared with a smoother, slightly faster modern all-rounder.",
    status: "published",
    tags: ["Popular", "Balanced", "Tac FPS", "Artisan", "Pulsar"],
  },
  {
    slug: "artisan-zero-soft-vs-lgg-saturn-pro-soft",
    title: "Artisan Zero Soft vs LGG Saturn Pro Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "lgg-saturn-pro-soft",
    excerpt:
      "Two of the safest premium control recommendations compared across glide, stopping power, and consistency.",
    status: "published",
    tags: ["Popular", "Control", "Tac FPS", "Artisan", "LGG"],
  },
  {
    slug: "artisan-zero-soft-vs-artisan-type-99-soft",
    title: "Artisan Zero Soft vs Artisan Type-99 Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "artisan-type-99-soft",
    excerpt:
      "Artisan's balanced-control staple compared with its slower, more planted control option.",
    status: "published",
    tags: ["Popular", "Control", "Artisan", "Tac FPS"],
  },
  {
    slug: "artisan-hayate-otsu-soft-vs-artisan-hien-soft",
    title: "Artisan Hayate Otsu Soft vs Artisan Hien Soft",
    leftSlug: "artisan-hayate-otsu-soft",
    rightSlug: "artisan-hien-soft",
    excerpt:
      "Two fast Artisan favorites compared by texture, stopping power, and tracking freedom.",
    status: "published",
    tags: ["Popular", "Speed", "Tracking", "Artisan"],
  },
  {
    slug: "artisan-raiden-soft-vs-lgg-neptune-pro-soft",
    title: "Artisan Raiden Soft vs LGG Neptune Pro Soft",
    leftSlug: "artisan-raiden-soft",
    rightSlug: "lgg-neptune-pro-soft",
    excerpt:
      "A high-speed cloth matchup for players chasing low friction and tracking-first aim feel.",
    status: "published",
    tags: ["Popular", "Speed", "Tracking", "Artisan", "LGG"],
  },
  {
    slug: "lgg-saturn-pro-soft-vs-artisan-type-99-soft",
    title: "LGG Saturn Pro Soft vs Artisan Type-99 Soft",
    leftSlug: "lgg-saturn-pro-soft",
    rightSlug: "artisan-type-99-soft",
    excerpt:
      "Two premium control pads compared for stopping power, consistency, and tactical FPS precision.",
    status: "published",
    tags: ["Popular", "Control", "Tac FPS", "LGG", "Artisan"],
  },
  {
    slug: "zowie-g-sr-iii-vs-lgg-saturn-pro-soft",
    title: "Zowie G-SR III vs LGG Saturn Pro Soft",
    leftSlug: "zowie-g-sr-iii",
    rightSlug: "lgg-saturn-pro-soft",
    excerpt:
      "A classic esports control pad compared with a modern premium Poron-base control option.",
    status: "published",
    tags: ["Popular", "Control", "Tac FPS", "Zowie", "LGG"],
  },
  {
    slug: "zowie-g-sr-se-gris-vs-artisan-zero-soft",
    title: "Zowie G-SR-SE Gris vs Artisan Zero Soft",
    leftSlug: "zowie-g-sr-se-gris",
    rightSlug: "artisan-zero-soft",
    excerpt:
      "A mainstream balanced-control esports pad compared with one of the safest premium Artisan picks.",
    status: "published",
    tags: ["Popular", "Balanced", "Control", "Zowie", "Artisan"],
  },
]