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
        <div className="page-hero">
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

            <h1 className="page-title-compact mt-5">
              Compare mouse skates side by side.
            </h1>
          </div>
        </div>
      </section>

      <section className="page-section">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading skate comparison...</div>}>
          <MouseSkateCompare skates={skates} initialLeftSlug={params?.left} />
        </Suspense>
      </section>
    </main>
  );
}
