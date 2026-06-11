export type ComparisonStatus = "published" | "draft";

export interface MousepadComparison {
  slug: string;
  title: string;
  leftSlug: string;
  rightSlug: string;
  excerpt: string;
  status: ComparisonStatus;
  tags: string[];
}

export const comparisons: MousepadComparison[] = [
  {
    slug: "artisan-zero-soft-vs-pulsar-lgg-hyperion-soft",
    title: "Artisan Zero Soft vs Pulsar x LGG Hyperion Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "pulsar-lgg-hyperion-soft",
    excerpt:
      "A close balanced-control versus balanced-speed matchup for players choosing between safer tac FPS control and easier glide freedom.",
    status: "published",
    tags: ["Control", "Balanced", "Tac FPS", "Artisan", "Pulsar"],
  },
  {
    slug: "artisan-zero-soft-vs-lgg-saturn-pro-soft",
    title: "Artisan Zero Soft vs LGG Saturn Pro Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "lgg-saturn-pro-soft",
    excerpt:
      "Two premium control-first pads with different textures, humidity behavior, and micro-adjustment freedom.",
    status: "published",
    tags: ["Control", "Tac FPS", "Artisan", "LGG"],
  },
  {
    slug: "artisan-zero-soft-vs-artisan-type-99-soft",
    title: "Artisan Zero Soft vs Artisan Type-99 Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "artisan-type-99-soft",
    excerpt:
      "A classic balanced-control recommendation against Artisan's more dedicated slow-control option with heavier stopping power.",
    status: "published",
    tags: ["Control", "Tac FPS", "Artisan"],
  },
  {
    slug: "artisan-zero-soft-vs-artisan-hayate-otsu-soft",
    title: "Artisan Zero Soft vs Artisan Hayate Otsu Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "artisan-hayate-otsu-soft",
    excerpt:
      "A strong control baseline versus an all-rounder that trades some stopping power for more speed and micro-correction freedom.",
    status: "published",
    tags: ["Balanced", "Control", "Artisan", "Tac FPS", "Tracking"],
  },
  {
    slug: "artisan-zero-soft-vs-artisan-hien-soft",
    title: "Artisan Zero Soft vs Artisan Hien Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "artisan-hien-soft",
    excerpt:
      "A direct comparison between safe tac FPS control and a more textured balanced-speed glide with stronger tracking bias.",
    status: "published",
    tags: ["Control", "Speed", "Artisan", "Tac FPS", "Tracking"],
  },
  {
    slug: "artisan-hayate-otsu-soft-vs-artisan-hien-soft",
    title: "Artisan Hayate Otsu Soft vs Artisan Hien Soft",
    leftSlug: "artisan-hayate-otsu-soft",
    rightSlug: "artisan-hien-soft",
    excerpt:
      "Two fast Artisan favorites separated by texture, stopping power, and how loose they feel during tracking and corrections.",
    status: "published",
    tags: ["Balanced", "Speed", "Tracking", "Artisan"],
  },
  {
    slug: "artisan-hayate-otsu-soft-vs-lgg-venus-pro-soft",
    title: "Artisan Hayate Otsu Soft vs LGG Venus Pro Soft",
    leftSlug: "artisan-hayate-otsu-soft",
    rightSlug: "lgg-venus-pro-soft",
    excerpt:
      "A premium cloth all-rounder versus LGG's hybrid-leaning balanced-speed pad for players chasing versatile FPS performance.",
    status: "published",
    tags: ["Balanced", "Tracking", "Artisan", "LGG"],
  },
  {
    slug: "artisan-raiden-soft-vs-lgg-neptune-pro-soft",
    title: "Artisan Raiden Soft vs LGG Neptune Pro Soft",
    leftSlug: "artisan-raiden-soft",
    rightSlug: "lgg-neptune-pro-soft",
    excerpt:
      "A speed-focused cloth duel for players who want maximum glide, low friction, and tracking-first aim feel without moving to glass.",
    status: "published",
    tags: ["Speed", "Tracking", "Artisan", "LGG"],
  },
  {
    slug: "lgg-saturn-pro-soft-vs-lgg-jupiter-pro-soft",
    title: "LGG Saturn Pro Soft vs LGG Jupiter Pro Soft",
    leftSlug: "lgg-saturn-pro-soft",
    rightSlug: "lgg-jupiter-pro-soft",
    excerpt:
      "A control-versus-mud comparison inside LGG's lineup, focused on how much stopping power and freedom you want for tac FPS.",
    status: "published",
    tags: ["Control", "Tac FPS", "LGG"],
  },
  {
    slug: "lgg-saturn-pro-soft-vs-artisan-type-99-soft",
    title: "LGG Saturn Pro Soft vs Artisan Type-99 Soft",
    leftSlug: "lgg-saturn-pro-soft",
    rightSlug: "artisan-type-99-soft",
    excerpt:
      "Two premium control pads with different humidity behavior, texture, and stopping-power ceilings for tactical shooters.",
    status: "published",
    tags: ["Control", "Tac FPS", "LGG", "Artisan"],
  },
  {
    slug: "lgg-saturn-pro-soft-vs-pulsar-lgg-hyperion-soft",
    title: "LGG Saturn Pro Soft vs Pulsar x LGG Hyperion Soft",
    leftSlug: "lgg-saturn-pro-soft",
    rightSlug: "pulsar-lgg-hyperion-soft",
    excerpt:
      "A slower control pad against a more modern balanced-speed option for players deciding between planted aim and looser corrections.",
    status: "published",
    tags: ["Control", "Balanced", "LGG", "Pulsar", "Tac FPS"],
  },
  {
    slug: "lgg-venus-pro-soft-vs-lgg-neptune-pro-soft",
    title: "LGG Venus Pro Soft vs LGG Neptune Pro Soft",
    leftSlug: "lgg-venus-pro-soft",
    rightSlug: "lgg-neptune-pro-soft",
    excerpt:
      "LGG's versatile balanced-speed hybrid compared with its faster cloth speed pad for players who want more control or more glide.",
    status: "published",
    tags: ["Balanced", "Speed", "Tracking", "LGG"],
  },
];
