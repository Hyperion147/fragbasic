import type { Metadata } from "next";
import { Suspense } from "react";

import { MouseSkateCompare } from "@/components/accessories/mouse-skates/mouse-skate-compare";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { getAllMouseSkates } from "@/data/accessories/mouse-skates";
import { buildMetadata } from "@/lib/seo";

const skates = getAllMouseSkates();

export const metadata: Metadata = buildMetadata({
  title: "Mouse Skate Compare",
  description:
    "Compare mouse skates side by side using skate-specific speed, control, stopping, durability, smoothness, noise, and surface compatibility ratings.",
  path: "/accessories/mouse-skates/compare",
  keywords: [
    "mouse skate compare",
    "compare mouse skates",
    "Tiger ICE vs Corepad",
    "Xraypad Jade vs Obsidian",
    "glasspad skate comparison",
  ],
});

type CompareMouseSkatesPageProps = {
  searchParams?: Promise<{
    left?: string;
  }>;
};

export default async function CompareMouseSkatesPage({
  searchParams,
}: CompareMouseSkatesPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Accessories", href: "/accessories/mouse-skates" },
                { label: "Compare skates" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-sky-300 text-slate-950">Compare</Badge>
              <Badge variant="outline">
                {skates.length} skate{skates.length === 1 ? "" : "s"} available
              </Badge>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Compare mouse skates side by side.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              Pick two or three skates and compare glide, stopping, smoothness,
              noise, durability, and surface fit without using the mousepad
              comparison scale.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading skate comparison...</div>}>
          <MouseSkateCompare skates={skates} initialLeftSlug={params?.left} />
        </Suspense>
      </section>
    </main>
  );
}
