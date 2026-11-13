import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { HomeExperience } from "@/features/landing/home-experience";
import { homeFaqs } from "@/features/landing/seo-section";
import { getDefaultColorway, getMousepadFullName } from "@/lib/mousepads";
import {
  buildCollectionJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import { getPublicBestPages } from "@/server/catalog/best-pages";
import { getPublicComparisons } from "@/server/catalog/comparisons";
import { getPublicIems } from "@/server/catalog/iems";
import { getPublicLatestAdded } from "@/server/catalog/latest-added";
import { getPublicPads } from "@/server/catalog/pads";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "FPS Mousepad Database & Gear Comparisons",
  description:
    "Compare FPS mousepads, glasspads, gaming IEMs, and mouse skates by speed, control, stopping power, comfort, price, and India availability.",
  path: "/",
  keywords: [
    ...seoKeywords.mousepads,
    ...seoKeywords.glasspads,
    ...seoKeywords.iems,
    ...seoKeywords.skates,
    ...seoKeywords.bestLists,
    ...seoKeywords.comparisons,
    ...seoKeywords.games,
    ...seoKeywords.questions,
  ],
});

export default async function HomePage() {
  const [
    mousepads,
    iems,
    latestAddedSlugs,
    publishedComparisons,
    bestPages,
  ] = await Promise.all([
    getPublicPads(),
    getPublicIems(),
    getPublicLatestAdded(),
    getPublicComparisons(),
    getPublicBestPages(),
  ]);
  const mousepadsBySlug = new Map(
    mousepads.map((mousepad) => [mousepad.slug, mousepad]),
  );
  const latestAdded = latestAddedSlugs.mousepads
    .map((slug) => mousepadsBySlug.get(slug))
    .filter((mousepad) => mousepad !== undefined);
  const latestAddedIems = latestAddedSlugs.iems
    .map((slug) => iems.find((iem) => iem.slug === slug))
    .filter((iem) => iem !== undefined);
  const glasspadCount = mousepads.filter(
    (mousepad) => mousepad.category === "glass",
  ).length;
  const mousepadCount = mousepads.length - glasspadCount;
  const bestPageCount = bestPages.length;
  const comparisons = publishedComparisons
    .map((comparison) => {
      const left = mousepadsBySlug.get(comparison.leftSlug);
      const right = mousepadsBySlug.get(comparison.rightSlug);

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
          itemCount: mousepadCount + glasspadCount + iems.length,
        })}
      />
      <JsonLd data={buildFaqJsonLd(homeFaqs)} />
      <HomeExperience
        mousepadCount={mousepadCount}
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
