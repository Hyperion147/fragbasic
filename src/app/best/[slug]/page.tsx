import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCell } from "@/components/data-display";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import {
    getAllBestPages,
    getBestPageBySlug,
    getBestPagePicks,
} from "@/data/best-pages";
import {
    formatEnvironmentLabel,
    formatFeelLabel,
    formatMousepadValue,
    getAllMousepads,
    getMousepadFullName,
} from "@/lib/mousepads";
import {
    buildMetadata,
} from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllBestPages().map((page) => ({
        slug: page.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getBestPageBySlug(slug);

    if (!page) {
        return {};
    }

    return buildMetadata({
        title: page.title,
        description: `${page.description} See curated picks, best-use cases, and FPS-focused reasoning for each recommendation.`,
        path: `/best/${page.slug}`,
        keywords: [
            ...page.keywords,
            "best gaming mousepads",
            "fps mousepad guide",
            `best ${page.badge.toLowerCase()} mousepads`,
        ],
    });
}

export default async function BestMousepadsPage({ params }: Props) {
    const { slug } = await params;
    const page = getBestPageBySlug(slug);

    if (!page) {
        notFound();
    }

    const picks = getBestPagePicks(page, getAllMousepads());
    const topPick = picks[0]?.mousepad;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="page-hero">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.55fr)] lg:items-end">
                        <div className="max-w-5xl">
                            <SiteBreadcrumbs
                                items={[
                                    { label: "Home", href: "/" },
                                    { label: "Best", href: "/best" },
                                    { label: page.title },
                                ]}
                            />
                            <div className="flex flex-wrap gap-2">
                                <Badge className="text-black">
                                    {page.badge}
                                </Badge>
                                <Badge variant="outline">Best mousepads</Badge>
                                <Badge variant="outline">
                                    {picks.length} picks
                                </Badge>
                            </div>

                            <p className="compact-label mt-5">
                                {page.eyebrow}
                            </p>

                            <h1 className="page-title mt-4">
                                {page.title}
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button asChild>
                                    <Link href="#picks">
                                        See the picks
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/mousepads/compare/universal">
                                        Compare these pads
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {topPick ? (
                            <aside className="border-l border-border pl-6">
                                <p className="compact-label">
                                    First pick
                                </p>
                                <h2 className="panel-title mt-3">
                                    {getMousepadFullName(topPick)}
                                </h2>
                                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                    {picks[0].reason}
                                </p>
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <MiniStat
                                        label="Control"
                                        value={formatFeelLabel(
                                            topPick.feel.control,
                                            "control",
                                        )}
                                    />
                                    <MiniStat
                                        label="Glide"
                                        value={formatFeelLabel(
                                            topPick.feel.speed,
                                            "speed",
                                        )}
                                    />
                                    <MiniStat
                                        label="Humidity"
                                        value={formatEnvironmentLabel(
                                            topPick.environment
                                                .humidityResistance,
                                        )}
                                    />
                                    <MiniStat
                                        label="Corrections"
                                        value={formatFeelLabel(
                                            topPick.feel.microAdjustments,
                                            "microAdjustments",
                                        )}
                                    />
                                </div>
                            </aside>
                        ) : null}
                    </div>
                </div>
            </section>

            <section
                id="picks"
                className="page-section soft-divider-top"
            >
                <div className="max-w-4xl">
                    <Badge variant="outline">Curated shortlist</Badge>
                    <h2 className="section-title mt-4">
                        The picks that fit the story.
                    </h2>
                    <p className="body-copy mt-4 max-w-2xl">
                        These are selected from the tracked FragBasic database
                        and ranked for the page theme, not by brand hype or raw
                        spec sheet numbers.
                    </p>
                </div>

                <div className="mt-10 soft-panel">
                    {picks.map((pick, index) => (
                        <PickRow key={pick.slug} pick={pick} index={index} />
                    ))}
                </div>
            </section>
        </main>
    );
}

function PickRow({
    pick,
    index,
}: {
    pick: ReturnType<typeof getBestPagePicks>[number];
    index: number;
}) {
    const pad = pick.mousepad;

    return (
        <article className="grid gap-5 px-4 py-5 shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] last:shadow-none lg:grid-cols-[72px_180px_1fr_360px] lg:items-center">
            <div>
                <Badge className="text-black">#{index + 1}</Badge>
            <p className="compact-label mt-3 font-mono">
                {pick.label}
            </p>
            </div>

            <Link
                href={`/mousepads/${pad.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-background/70 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)]"
            >
                <Image
                    src={pad.images.main}
                    alt={getMousepadFullName(pad)}
                    fill
                    sizes="180px"
                    className="object-contain p-4"
                />
            </Link>

            <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                        {formatMousepadValue(pad.category)}
                    </Badge>
                    <Badge variant="outline">{formatMousepadValue(pad.surface)}</Badge>
                </div>

                <Link
                    href={`/mousepads/${pad.slug}`}
                    className="panel-title mt-3 block text-foreground hover:text-primary"
                >
                    {getMousepadFullName(pad)}
                </Link>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {pick.reason}
                </p>

                <p className="mt-3 text-sm leading-6 text-foreground">
                    <span className="font-semibold">Best for: </span>
                    {pick.bestFor}
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <MetricCell
                    label={formatFeelLabel(pad.feel.stoppingPower, "stoppingPower")}
                    value={pad.feel.stoppingPower}
                />
                <MetricCell
                    label={formatFeelLabel(pad.feel.speed, "speed")}
                    value={pad.feel.speed}
                    tone="alt"
                />
                <MetricCell
                    label={formatFeelLabel(
                        pad.feel.microAdjustments,
                        "microAdjustments",
                    )}
                    value={pad.feel.microAdjustments}
                    tone="muted"
                />
                <MetricCell
                    label={formatEnvironmentLabel(
                        pad.environment.humidityResistance,
                    )}
                    value={pad.environment.humidityResistance}
                />
            </div>
        </article>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="pt-3 soft-divider-top">
            <p className="compact-label">
                {label}
            </p>
            <p className="mt-1 text-base font-semibold leading-6">{value}</p>
        </div>
    );
}
