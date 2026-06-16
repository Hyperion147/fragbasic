import type { Metadata } from "next";
import { BrandDirectory } from "@/components/brands/brand-directory";
import {
  brandConfig,
  getAllBrandSlugs,
  getBrandMousepads,
} from "@/lib/brands";
import { buildMetadata } from "@/lib/seo";

const brandDescriptions: Record<string, string> = {
  artisan: "Precision. Performance. Perfection.",
  lgg: "Science. Surface. Superior.",
  steelseries: "Classic control feel with mainstream familiarity.",
  xraypad: "Born for precision.",
  zowie: "Designed for esports.",
};

const brandLogos: Record<string, string> = {
  artisan: "/brands-logo/artisan-logo.png",
  lgg: "/brands-logo/lgg-logo.png",
  steelseries: "/brands-logo/steelseries-logo.png",
  xraypad: "/brands-logo/xraypad-logo.png",
  zowie: "/brands-logo/zowie-logo.png",
};

export const metadata: Metadata = buildMetadata({
  title: "Mousepad Brands",
  description:
    "Browse mousepad brands tracked on FragBasic, including Artisan, LGG, SteelSeries, Xraypad, and Zowie, with brand-specific pad pages and comparisons.",
  path: "/mousepads/brands",
  keywords: [
    "mousepad brands",
    "artisan mousepads",
    "lgg mousepads",
    "xraypad mousepads",
    "zowie mousepads",
  ],
});

export default function BrandsIndexPage() {
  const brands = getAllBrandSlugs().map((slug) => ({
    ...brandConfig[slug],
    count: getBrandMousepads(slug).length,
    description: brandDescriptions[slug],
    logoSrc: brandLogos[slug],
    kind: "mousepads" as const,
    featured: slug === "artisan",
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BrandDirectory brands={brands} />
    </main>
  );
}
