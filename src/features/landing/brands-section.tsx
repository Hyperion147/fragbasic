import Image from "next/image";
import Link from "next/link";

import { SectionHeader } from "@/features/landing/section-header";
import type { BrandPreview } from "@/features/landing/types";

type BrandPanelEntry = {
  slug: string;
  name: string;
  countLabel: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
};

const brandLogoMap = {
  artisan: "/brands-logo/artisan-logo.png",
  lgg: "/brands-logo/lgg-logo.png",
  steelseries: "/brands-logo/steelseries-logo.png",
  xraypad: "/brands-logo/xraypad-logo.png",
  zowie: "/brands-logo/zowie-logo.png",
} as const;

const featuredBrandEntries: BrandPanelEntry[] = [
  {
    slug: "pulsar",
    name: "Pulsar",
    countLabel: "1 collab product",
    href: "/mousepads/pulsar-lgg-hyperion-soft",
    logoSrc: "/brands-logo/pulsar-logo.png",
    logoAlt: "Pulsar logo",
  },
];

export function BrandsSection({ brands }: { brands: BrandPreview[] }) {
  const brandEntries: BrandPanelEntry[] = [
    ...brands.map((brand) => ({
      slug: brand.slug,
      name: brand.name,
      countLabel: `${brand.count} products`,
      href: `/mousepads/brands/${brand.slug}`,
      logoSrc: brandLogoMap[brand.slug as keyof typeof brandLogoMap] ?? "",
      logoAlt: `${brand.name} logo`,
    })),
    ...featuredBrandEntries,
  ].filter((brand) => brand.logoSrc);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 md:p-8">
      <div className="relative">
        <SectionHeader
          title="All Brands"
          href="/mousepads/brands/artisan"
          action="View brands"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-6">
          {brandEntries.map((brand) => (
            <Link
              key={brand.slug}
              href={brand.href}
              className="group px-4 py-5 text-center"
            >
              <div className="relative flex h-16 items-center justify-center">
                <Image
                  src={brand.logoSrc}
                  alt={brand.logoAlt}
                  width={260}
                  height={88}
                  className="h-auto w-auto object-contain brightness-[1.08] contrast-[1.02] invert"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <p className="mt-6 text-sm text-muted-foreground transition-colors group-hover:text-foreground/72">
                {brand.countLabel}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
