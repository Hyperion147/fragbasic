import { HomeExperience } from "@/components/home/home-experience";
import { getAllBrandSlugs, getBrandMousepads, brandConfig } from "@/lib/brands";
import { getPublishedComparisons } from "@/lib/comparisons";
import {
  getAllMousepads,
  getDefaultColorway,
  getMousepadFullName,
  getMousepadBySlug,
} from "@/lib/mousepads";

export default function HomePage() {
  const mousepads = getAllMousepads();
  const brands = getAllBrandSlugs().map((slug) => ({
    slug,
    name: brandConfig[slug].name,
    count: getBrandMousepads(slug).length,
  }));
  const comparisons = getPublishedComparisons()
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
      brandCount={brands.length}
      brands={brands}
      comparisons={comparisons}
    />
  );
}
