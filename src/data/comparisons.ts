export type ComparisonEntry = {
  slug: string
  title: string
  leftSlug: string
  rightSlug: string
  excerpt: string
  status: "published" | "planned"
  tags: string[]
}

export const comparisons: ComparisonEntry[] = [
  {
    slug: "artisan-zero-soft-vs-pulsar-lgg-hyperion-soft",
    title: "Artisan Zero Soft vs Pulsar x LGG Hyperion Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "pulsar-lgg-hyperion-soft",
    excerpt:
      "A control-first benchmark against a smoother modern alternative for players who want more freedom in micro-corrections.",
    status: "published",
    tags: ["Valorant", "CS2", "Control", "Balanced"],
  },
  {
    slug: "artisan-zero-soft-vs-lgg-saturn-pro-soft",
    title: "Artisan Zero Soft vs LGG Saturn Pro Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "lgg-saturn-pro-soft",
    excerpt:
      "A closer look at classic control versus a slower, more planted Saturn-style experience.",
    status: "planned",
    tags: ["Control", "Stopping Power", "Tac FPS"],
  },
  {
    slug: "artisan-zero-soft-vs-type99-soft",
    title: "Artisan Zero Soft vs Type-99 Soft",
    leftSlug: "artisan-zero-soft",
    rightSlug: "type99-soft",
    excerpt:
      "For players deciding between balanced control and a more dedicated slow-control pad.",
    status: "planned",
    tags: ["Mud-Control", "Valorant", "Stability"],
  },
]
