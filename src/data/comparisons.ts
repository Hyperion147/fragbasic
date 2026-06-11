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
      "Two of the most talked-about balanced FPS mousepads compared across speed, control, stopping power, and micro-adjustment freedom.",
    status: "published",
    tags: ["Valorant", "CS2", "Control", "Balanced"],
  },
  {
    slug: "lgg-saturn-pro-soft-vs-artisan-type-99-soft",
    title: "LGG Saturn Pro Soft vs Artisan Type-99 Soft ",
    leftSlug: "lgg-saturn-pro-soft",
    rightSlug: "artisan-type-99-soft",
    excerpt:
      "Two premium control pads with very different approaches to speed, stopping power, and overall aim feel.",
    status: "published",
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
