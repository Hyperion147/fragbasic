import type { Metadata } from "next";

import { MouseSkateBrowser } from "@/components/accessories/mouse-skates/mouse-skate-browser";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { getAllMouseSkates } from "@/data/accessories/mouse-skates";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const skates = getAllMouseSkates();

export const metadata: Metadata = buildMetadata({
    title: "Browse Mouse Skates",
    description:
        "Browse mouse skates by company, material, and fastest or slowest glide order with skate-specific speed, control, stopping, and surface fit ratings.",
    path: "/accessories/mouse-skates/browse",
    keywords: [
        "browse mouse skates",
        "fastest mouse skates",
        "slowest mouse skates",
        "Corepad skates",
        "Tiger ICE skates",
        "Xraypad skates",
    ],
});

export default function BrowseMouseSkatesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10 flex items-end justify-between">
                    <div className="max-w-5xl">
                        <SiteBreadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                {
                                    label: "Accessories",
                                    href: "/accessories/mouse-skates",
                                },
                                { label: "Browse skates" },
                            ]}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-sky-300 text-slate-950">
                                Mouse skates
                            </Badge>
                            <Badge variant="outline">
                                {skates.length} skate
                                {skates.length === 1 ? "" : "s"} tracked
                            </Badge>
                        </div>
                        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                            Browse skates by company, speed, and material.
                        </h1>
                    </div>
                    <div>
                      <Link
                            href="/accessories/mouse-skates/compare"
                            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-foreground"
                        >
                            Compare skates
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <MouseSkateBrowser skates={skates} />
            </section>
        </main>
    );
}
