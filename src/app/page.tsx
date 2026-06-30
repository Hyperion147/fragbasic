import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { HomeExperience } from "@/features/landing/home-experience";
import { getAllBestPages } from "@/data/best-pages";
import { latestAddedIemSlugs, latestAddedMousepadSlugs } from "@/data/latest-added";
import { getPublishedComparisons } from "@/lib/comparisons";
import { getAllIems, getIemBySlug } from "@/lib/iems";
import { getAllMousepads, getDefaultColorway, getMousepadFullName, getMousepadBySlug } from "@/lib/mousepads";
import { buildCollectionJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mousepad Database, Glasspads, IEMs & Comparisons",
  description:
    "Browse FPS mousepads, glasspads, and IEMs, then compare gear side by side for VALORANT, CS2, Apex, and more.",
  path: "/",
  keywords: [
    "mousepad database india",
    "best mousepads for valorant",
    "best glasspads",
    "mousepad compare",
  ],
});

export default function HomePage() {
  const mousepads = getAllMousepads();
  const iems = getAllIems();
  const latestAdded = latestAddedMousepadSlugs
    .map((slug) => getMousepadBySlug(slug))
    .filter((mousepad) => mousepad !== undefined);
  const latestAddedIems = latestAddedIemSlugs
    .map((slug) => getIemBySlug(slug))
    .filter((iem) => iem !== undefined);
  const glasspadCount = mousepads.filter(
    (mousepad) => mousepad.category === "glass",
  ).length;
  const bestPageCount = getAllBestPages().length;
  const publishedComparisons = getPublishedComparisons();
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
    <>
      <JsonLd
        data={buildCollectionJsonLd({
          name: "FragBasic FPS Gear Database",
          description:
            "A searchable FPS gear database for mousepads, glasspads, IEMs, mouse skates, best lists, and side-by-side comparisons.",
          path: "/",
          itemCount: mousepads.length + iems.length,
        })}
      />
      <HomeExperience
        mousepadCount={mousepads.length}
        glasspadCount={glasspadCount}
        bestPageCount={bestPageCount}
        iemCount={iems.length}
        comparisons={comparisons}
        latestAdded={latestAdded}
        latestAddedIems={latestAddedIems}
      />
    </>
  );
}
