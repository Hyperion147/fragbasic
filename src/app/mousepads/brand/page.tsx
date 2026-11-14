import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { getBrandName, getBrandSlug } from "@/lib/brands";
import { buildCollectionJsonLd, buildMetadata, seoKeywords } from "@/lib/seo";
import { getPublicPads } from "@/server/catalog/pads";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Mousepad Brands: Every Brand We Track",
  description:
    "Browse every mousepad brand we track — Artisan, Xraypad, LGG, Zowie, SteelSeries, and more — with model counts and India availability.",
  path: "/mousepads/brand",
  keywords: [
    ...seoKeywords.brands,
    ...seoKeywords.mousepads,
    "mousepad brands",
    "gaming mousepad brands",
    "best mousepad brand",
    "mousepad brands in india",
  ],
});

export default async function BrandIndexPage() {
  const pads = await getPublicPads();
  const brands = Array.from(new Set(pads.map((pad) => getBrandSlug(pad.brand))))
    .map((slug) => {
      const brandPads = pads.filter((pad) => getBrandSlug(pad.brand) === slug);
      return {
        slug,
        name: getBrandName(brandPads[0].brand),
        count: brandPads.length,
        glassCount: brandPads.filter((pad) => pad.category === "glass").length,
        indiaCount: brandPads.filter(
          (pad) =>
            pad.availability.india === "available" ||
            pad.availability.india === "limited",
        ).length,
      };
    })
    .sort(
      (left, right) =>
        right.count - left.count || left.name.localeCompare(right.name),
    );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={buildCollectionJsonLd({
          name: "Gaming Mousepad Brands",
          description:
            "Every mousepad brand tracked by FragBasic with model counts, glasspad coverage, and India availability.",
          path: "/mousepads/brand",
          itemCount: brands.length,
        })}
      />

      <section className="border-b border-border bg-background">
        <div className="page-hero">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Mousepads", href: "/mousepads" },
                { label: "Brands" },
              ]}
            />
            <h1 className="page-title mt-5">
              Mousepad brands: every brand in the database.
            </h1>
            <p className="body-copy mt-4 max-w-3xl">
              Pick a brand to see every model we track, including feel ratings,
              surface type, price, and India availability. Brand pages make it
              easy to compare a lineup before you shortlist a single pad.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/mousepads/brand/${brand.slug}`}
              className="soft-panel group flex items-start justify-between gap-4 p-5 transition-colors hover:border-primary/40"
            >
              <div>
                <p className="panel-title text-foreground group-hover:text-primary">
                  {brand.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {brand.count} model{brand.count === 1 ? "" : "s"}
                  {brand.glassCount > 0
                    ? ` · ${brand.glassCount} glasspad${brand.glassCount === 1 ? "" : "s"}`
                    : ""}
                  {brand.indiaCount > 0
                    ? ` · ${brand.indiaCount} in India`
                    : " · import only"}
                </p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section border-t border-border">
        <h2 className="section-title">Not sure which brand to start with?</h2>
        <p className="body-copy mt-3 max-w-3xl">
          Brand matters less than the surface, size, and feel you need. Start
          with the game-specific best lists, then use a brand page to check
          whether that lineup covers your budget and sensitivity.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link href="/best/valorant-mousepads" className="text-primary hover:underline">
            Best mousepads for VALORANT
          </Link>
          <Link href="/best/cs2-mousepads" className="text-primary hover:underline">
            Best mousepads for CS2
          </Link>
          <Link href="/mousepads/glasspads" className="text-primary hover:underline">
            Glass mousepad database
          </Link>
          <Link href="/mousepads/compare/universal" className="text-primary hover:underline">
            Compare any two mousepads
          </Link>
        </div>
      </section>
    </main>
  );
}
