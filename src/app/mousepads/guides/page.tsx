import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getPublicGuides } from "@/server/catalog/guides";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
    title: "FPS Mousepad Guides",
    description:
        "Learn how control, speed, stopping power, texture, and humidity affect mousepad feel, and compare surfaces before choosing your next FPS pad.",
    path: "/mousepads/guides",
    keywords: [
        "mousepad guide",
        "control vs speed mousepad",
        "how to choose a mousepad",
        "mousepad humidity guide",
    ],
});

export default async function GuidesPage() {
    const guides = [...(await getPublicGuides())].sort((left, right) =>
        right.publishedAt.localeCompare(left.publishedAt),
    );

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="page-hero">
                    <div className="max-w-4xl">
                        <SiteBreadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Mousepads", href: "/mousepads" },
                                { label: "Guides" },
                            ]}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">Guides</Badge>
                            <Badge variant="outline">Competitive FPS focus</Badge>
                            <Badge variant="outline">
                                {guides.length} guides
                            </Badge>
                        </div>

                        <h1 className="page-title mt-5">
                            Learn the feel before you buy the pad.
                        </h1>

                        <p className="body-copy mt-5 max-w-2xl">
                            Practical frameworks for choosing between control,
                            balanced, speed, and humidity-friendly surfaces.
                            Every guide is tied back to pads and comparisons in
                            the database.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/mousepads">Browse mousepads</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/mousepads/compare">Read comparisons</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-section">
                {guides.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No guides published yet.
                    </p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {guides.map((guide) => (
                            <article
                                key={guide.slug}
                                className="group flex flex-col border border-border bg-card/70 p-4 transition-colors hover:border-brand/40 sm:p-5"
                            >
                                <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                    <span>{guide.category}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{guide.readingTime} min read</span>
                                </div>
                                <h2 className="panel-title mt-3">
                                    <Link
                                        href={`/mousepads/guides/${guide.slug}`}
                                        className="underline-offset-4 group-hover:underline"
                                    >
                                        {guide.title}
                                    </Link>
                                </h2>
                                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                                    {guide.description}
                                </p>
                                <Link
                                    href={`/mousepads/guides/${guide.slug}`}
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-hover hover:underline"
                                >
                                    Read guide
                                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
