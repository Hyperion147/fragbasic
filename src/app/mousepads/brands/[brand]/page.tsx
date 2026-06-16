import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BrandPageShell } from "@/components/brands/brand-page-shell";
import {
  brandConfig,
  getAllBrandSlugs,
  getBrandNameFromSlug,
  getBrandOverview,
  type BrandSlug,
} from "@/lib/brands";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    brand: string;
  }>;
};

export function generateStaticParams() {
  return getAllBrandSlugs().map((brand) => ({
    brand,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const brandName = getBrandNameFromSlug(brand);

  if (!brandName) {
    notFound();
  }

  const brandEntry = brandConfig[brand as BrandSlug];

  return buildMetadata({
    title: `${brandName} Mousepads`,
    description: brandEntry.description,
    path: `/mousepads/brands/${brand}`,
    keywords: [
      `${brandName} mousepads`,
      `${brandName} mousepad review`,
      `${brandName} pad comparison`,
    ],
  });
}

export default async function BrandPage({ params }: PageProps) {
  const { brand } = await params;
  const brandName = getBrandNameFromSlug(brand);

  if (!brandName) {
    notFound();
  }

  const brandSlug = brand as BrandSlug;
  const overview = getBrandOverview(brandSlug);

  if (!overview) {
    notFound();
  }

  return (
    <BrandPageShell
        brand={overview.brand}
        mousepads={overview.mousepads}
        averageRating={overview.averageRating}
      />
  );
}
