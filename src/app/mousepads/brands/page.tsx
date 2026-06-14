import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  brandConfig,
  getAllBrandSlugs,
  getBrandMousepads,
} from "@/lib/brands";

const brandDescriptions: Record<string, string> = {
  artisan: "Premium Japanese cloth lineup with standout control, speed, and base quality.",
  lgg: "Broad enthusiast lineup covering Saturn, Neptune, Hyperion, and value-focused options.",
  steelseries: "Classic mainstream control references many players still use as feel benchmarks.",
  xraypad: "Huge variety across Aqua Control, Equate, and hybrid-leaning surfaces.",
  zowie: "Tac-FPS staples built around controlled glide and familiar tournament-ready feel.",
};

export default function BrandsIndexPage() {
  const brands = getAllBrandSlugs().map((slug) => ({
    ...brandConfig[slug],
    count: getBrandMousepads(slug).length,
    description: brandDescriptions[slug],
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">Brands</Badge>
              <Badge variant="outline">
                {brands.length} tracked brand{brands.length === 1 ? "" : "s"}
              </Badge>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Explore the mousepad database by brand.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              Jump into each lineup to see every tracked pad, the
              speed-to-control spread, best-value picks, and published
              comparisons.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/mousepads/brands/${brand.slug}`}>
              <Card className="group h-full border-border bg-card/90 p-6 transition-all duration-200 hover:border-primary/45 hover:shadow-lg hover:shadow-black/10">
                <div className="flex items-center justify-between gap-3">
                  <Badge className="text-black">{brand.name}</Badge>
                  <Badge variant="outline">
                    {brand.count} pad{brand.count === 1 ? "" : "s"}
                  </Badge>
                </div>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                  {brand.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {brand.description}
                </p>

                <div className="mt-6">
                  <Button variant="outline" size="sm">
                    Open brand page
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
