import type { Metadata } from "next";
import { HomeExperience } from "@/features/landing/home-experience";
import { getAllBestPages } from "@/data/best-pages";
import { getAllBrandSlugs, getBrandMousepads, brandConfig } from "@/lib/brands";
import { getPublishedComparisons } from "@/lib/comparisons";
import { getAllMousepads, getDefaultColorway, getMousepadFullName, getMousepadBySlug } from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mousepad Database, Glasspads, Comparisons & FPS Finder",
  description:
    "Browse cloth mousepads and glasspads, compare FPS pads side by side, and use the FragBasic finder to discover the right pad for Valorant, CS2, Apex, and more.",
  path: "/",
  keywords: [
    "mousepad database india",
    "best mousepads for valorant",
    "best glasspads",
    "fps mousepad finder",
    "mousepad compare",
  ],
});

export default function HomePage() {
  const mousepads = getAllMousepads();
  const glasspadCount = mousepads.filter(
    (mousepad) => mousepad.category === "glass",
  ).length;
  const bestPageCount = getAllBestPages().length;
  const publishedComparisons = getPublishedComparisons();
  const brands = getAllBrandSlugs().map((slug) => ({
    slug,
    name: brandConfig[slug].name,
    count: getBrandMousepads(slug).length,
  }));
  const comparisons = publishedComparisons
    .map((comparison) => {
      const left = getMousepadBySlug(comparison.leftSlug);
      const right = getMousepadBySlug(comparison.rightSlug);

      if (!left || !right) {
        return null;
      }

      return {
        slug: comparison.slug,
        leftName: getMousepadFullName(left),
        rightName: getMousepadFullName(right),
        leftImage: left.images.main,
        rightImage: right.images.main,
        tags: comparison.tags.slice(0, 2),
        leftColor: getDefaultColorway(left).color,
        rightColor: getDefaultColorway(right).color,
      };
    })
    .filter((comparison) => comparison !== null)
    .slice(0, 3);
  return (
    <HomeExperience
      mousepadCount={mousepads.length}
      glasspadCount={glasspadCount}
      bestPageCount={bestPageCount}
      brandCount={brands.length}
      comparisonCount={publishedComparisons.length}
      brands={brands}
      comparisons={comparisons}
    />
  );
}
