import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    formatMousepadValue,
    getMousepadFullName,
} from "@/lib/mousepads";
import { buildArticleJsonLd, buildMetadata, seoKeywords } from "@/lib/seo";
import {
    getPublicGuideBySlug,
    getPublicGuides,
    getPublicGuideSlugs,
} from "@/server/catalog/guides";
import { getPublicPads } from "@/server/catalog/pads";

export const revalidate = 300;

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return (await getPublicGuideSlugs()).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = await getPublicGuideBySlug(slug);

    if (!guide) {
        return {};
    }

    return buildMetadata({
        title: guide.title,
        description: guide.description,
        path: `/mousepads/guides/${guide.slug}`,
        keywords: [
            ...guide.keywords,
            ...seoKeywords.guides,
            ...seoKeywords.questions,
            guide.category,
            "mousepad guide",
        ],
    });
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const [guide, allGuides, pads] = await Promise.all([
        getPublicGuideBySlug(slug),
        getPublicGuides(),
        getPublicPads(),
    ]);

    if (!guide) {
        notFound();
    }

    const padsBySlug = new Map(pads.map((pad) => [pad.slug, pad]));
    const relatedPads = guide.relatedPadSlugs
        .map((padSlug) => padsBySlug.get(padSlug))
        .filter((pad): pad is NonNullable<typeof pad> => Boolean(pad));

    const relatedGuides = allGuides
        .filter((entry) => entry.slug !== guide.slug)
        .sort((left, right) => {
            const leftSame = left.category === guide.category ? 0 : 1;
            const rightSame = right.category === guide.category ? 0 : 1;
            return leftSame - rightSame ||
                right.publishedAt.localeCompare(left.publishedAt);
        })
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <JsonLd
                data={buildArticleJsonLd({
                    title: guide.title,
                    description: guide.description,
                    path: `/mousepads/guides/${guide.slug}`,
                    datePublished: guide.publishedAt,
                    keywords: guide.keywords,
                })}
            />

            <article>
                <header className="border-b border-border bg-background">
                    <div className="page-hero">
                        <div className="max-w-4xl">
                            <SiteBreadcrumbs
                                items={[
                                    { label: "Home", href: "/" },
                                    { label: "Mousepads", href: "/mousepads" },
                                    {
                                        label: "Guides",
                                        href: "/mousepads/guides",
                                    },
                                    { label: guide.title },
                                ]}
                            />

                            <div className="flex flex-wrap gap-2">
                                <Badge className="text-black">
                                    {guide.category}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="gap-1.5"
                                >
                                    <Clock className="size-3" />
                                    {guide.readingTime} min read
                                </Badge>
                            </div>

                            <p className="compact-label mt-5">
                                {guide.eyebrow}
                            </p>

                            <h1 className="page-title mt-4">{guide.title}</h1>

                            <p className="body-copy mt-5 max-w-2xl">
                                {guide.description}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="page-section">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="min-w-0">
                            <p className="text-base leading-7 text-foreground">
                                {guide.intro}
                            </p>

                            {guide.sections.map((section, index) => (
                                <section
                                    key={`${section.heading}-${index}`}
                                    className="mt-10"
                                >
                                    <h2 className="text-xl font-semibold tracking-tight">
                                        {section.heading}
                                    </h2>
                                    {section.paragraphs.map(
                                        (paragraph, paragraphIndex) => (
                                            <p
                                                key={paragraphIndex}
                                                className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base"
                                            >
                                                {paragraph}
                                            </p>
                                        ),
                                    )}
                                    {section.bullets.length > 0 ? (
                                        <ul className="mt-4 space-y-2 border-l border-border pl-5">
                                            {section.bullets.map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="text-sm leading-6 text-foreground/85"
                                                >
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </section>
                            ))}

                            <aside className="mt-12 border border-border bg-card/60 p-5 sm:p-6">
                                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-hover">
                                    Key takeaways
                                </h2>
                                <ul className="mt-4 space-y-2">
                                    {guide.takeaways.map((takeaway) => (
                                        <li
                                            key={takeaway}
                                            className="text-sm leading-6 text-foreground/90"
                                        >
                                            {takeaway}
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </div>

                        <aside className="space-y-6">
                            {relatedPads.length > 0 ? (
                                <div className="border border-border bg-card/40 p-4">
                                    <h2 className="text-sm font-semibold">
                                        Pads in this guide
                                    </h2>
                                    <div className="mt-4 space-y-4">
                                        {relatedPads.map((pad) => (
                                            <Link
                                                key={pad.slug}
                                                href={`/mousepads/${pad.slug}`}
                                                className="group flex items-center gap-3"
                                            >
                                                <span className="relative block size-14 shrink-0 overflow-hidden bg-background/70">
                                                    <Image
                                                        src={pad.images.main}
                                                        alt={getMousepadFullName(pad)}
                                                        fill
                                                        sizes="56px"
                                                        className="object-contain p-1"
                                                    />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block truncate text-sm font-medium group-hover:text-primary">
                                                        {getMousepadFullName(pad)}
                                                    </span>
                                                    <span className="block text-xs text-muted-foreground">
                                                        {formatMousepadValue(pad.category)} ·{" "}
                                                        {formatMousepadValue(pad.surface)}
                                                    </span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-4 w-full"
                                        asChild
                                    >
                                        <Link href="/mousepads/compare/universal">
                                            Compare these pads
                                        </Link>
                                    </Button>
                                </div>
                            ) : null}

                            <div className="border border-border bg-card/40 p-4">
                                <h2 className="text-sm font-semibold">
                                    Keep reading
                                </h2>
                                <div className="mt-3 space-y-3">
                                    {relatedGuides.map((entry) => (
                                        <Link
                                            key={entry.slug}
                                            href={`/mousepads/guides/${entry.slug}`}
                                            className="group block"
                                        >
                                            <span className="block text-sm font-medium group-hover:text-primary">
                                                {entry.title}
                                            </span>
                                            <span className="mt-1 block text-xs text-muted-foreground">
                                                {entry.category} · {entry.readingTime} min
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/mousepads/guides"
                                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-hover hover:underline"
                                >
                                    All guides
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </main>
    );
}
