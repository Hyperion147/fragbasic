import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Gauge,
    Shield,
    Sparkles,
    ThermometerSun,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MousepadCard } from "@/components/mousepads/mousepad-card";
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
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
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

                            <p className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                {page.eyebrow}
                            </p>

                            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
                                {page.title}
                            </h1>

                            <div className="mt-8 flex flex-wrap gap-3">
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
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    First pick
                                </p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
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
                className="w-full border-t border-border px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10"
            >
                <div className="max-w-4xl">
                    <Badge variant="outline">Curated shortlist</Badge>
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        The picks that fit the story.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                        These are selected from the tracked FragBasic database
                        and ranked for the page theme, not by brand hype or raw
                        spec sheet numbers.
                    </p>
                </div>

                <div className="mt-10 space-y-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {picks.map((pick, index) => (
                        <article key={pick.slug} className="p-8 border gap-4 flex flex-col">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2">
                                    <Badge className="text-black">
                                        #{index + 1}
                                    </Badge>
                                    <Badge variant="outline">
                                        {pick.label}
                                    </Badge>
                                    <Badge variant="outline">
                                        {formatMousepadValue(
                                            pick.mousepad.category,
                                        )}
                                    </Badge>
                                </div>

                                <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                                    {getMousepadFullName(pick.mousepad)}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                    {pick.reason}
                                </p>

                                <p className="mt-4 text-sm leading-6 text-foreground">
                                    <span className="font-semibold">
                                        Best for:{" "}
                                    </span>
                                    {pick.bestFor}
                                </p>

                                <div className="mt-6 grid grid-cols-4 gap-3">
                                    <SignalStat
                                        icon={Shield}
                                        label="Stop"
                                        value={formatFeelLabel(
                                            pick.mousepad.feel.stoppingPower,
                                            "stoppingPower",
                                        )}
                                    />
                                    <SignalStat
                                        icon={Gauge}
                                        label="Glide"
                                        value={formatFeelLabel(
                                            pick.mousepad.feel.speed,
                                            "speed",
                                        )}
                                    />
                                    <SignalStat
                                        icon={Sparkles}
                                        label="Corrections"
                                        value={formatFeelLabel(
                                            pick.mousepad.feel.microAdjustments,
                                            "microAdjustments",
                                        )}
                                    />
                                    <SignalStat
                                        icon={ThermometerSun}
                                        label="Humidity"
                                        value={formatEnvironmentLabel(
                                            pick.mousepad.environment
                                                .humidityResistance,
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="max-h-200">
                                <MousepadCard
                                    pad={pick.mousepad}
                                    compact
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-t border-border pt-3">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 text-base font-semibold leading-6">{value}</p>
        </div>
    );
}

function SignalStat({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Shield;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                </p>
                <Icon className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-sm font-semibold leading-5">{value}</p>
        </div>
    );
}
