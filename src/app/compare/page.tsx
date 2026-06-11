import Link from "next/link";
import { ArrowRight, Clock3, Radar, Scale } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    getAllComparisons,
    getPlannedComparisons,
    getPublishedComparisons,
} from "@/lib/comparisons";
import { getMousepadBySlug } from "@/lib/mousepads";

export default function CompareIndexPage() {
    const published = getPublishedComparisons();
    const planned = getPlannedComparisons();
    const all = getAllComparisons();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,oklch(0.28_0.05_215/0.38),transparent_35%),linear-gradient(180deg,oklch(0.22_0.02_224),oklch(0.21_0.02_224))]">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">
                                Compare mousepads
                            </Badge>
                            <Badge variant="outline">
                                Competitive FPS focused
                            </Badge>
                            <Badge variant="outline">
                                {all.length} tracked matchups
                            </Badge>
                        </div>

                        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                            Find the matchup that actually answers your buying
                            question.
                        </h1>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Published
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Comparisons
                        </h2>
                    </div>
                </div>

                <div className="grid gap-4">
                    {published.map((comparison) => {
                        const left = getMousepadBySlug(comparison.leftSlug);
                        const right = getMousepadBySlug(comparison.rightSlug);

                        if (!left || !right) {
                            return null;
                        }

                        return (
                            <Link
                                key={comparison.slug}
                                href={`/compare/${comparison.slug}`}
                            >
                                <Card className="group h-full border-border bg-card p-5 transition-colors hover:border-primary/50">
                                    <div className="flex justify-between items-center">
                                        <div className="text-start">
                                          <ComparisonPadSummary
                                            brand={left.brand}
                                            name={left.name}
                                            metricA={`${left.feel.control}/10 control`}
                                            metricB={`${left.feel.stoppingPower}/10 stopping`}
                                        />
                                        </div>

                                        <div className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground md:block">
                                            V/S
                                        </div>

                                        <div className="text-end">
                                          <ComparisonPadSummary
                                            brand={right.brand}
                                            name={right.name}
                                            metricA={`${right.feel.speed}/10 speed`}
                                            metricB={`${right.feel.microAdjustments}/10 micro`}
                                        />
                                        </div>
                                    </div>

                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {comparison.excerpt}
                                    </p>

                                    <div className="flex items-center  justify-between text-sm text-muted-foreground">
                                        <div className="flex flex-wrap gap-2">
                                            {comparison.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            Open comparison
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-16">
                <Card className="border-border bg-card p-6 md:p-8">
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                        Planned comparisons
                    </h2>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {planned.map((comparison) => (
                            <div
                                key={comparison.slug}
                                className="rounded-3xl border border-border bg-background/70 p-5"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-lg font-semibold text-foreground">
                                        {comparison.title}
                                    </p>
                                    <Badge variant="outline">Planned</Badge>
                                </div>

                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    {comparison.excerpt}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/mousepads">
                                Browse mousepads first
                            </Link>
                        </Button>
                    </div>
                </Card>
            </section>
        </main>
    );
}

function ComparisonPadSummary({
    brand,
    name,
    metricA,
    metricB,
}: {
    brand: string;
    name: string;
    metricA: string;
    metricB: string;
}) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{brand}</p>
            <h3 className="text-2xl font-semibold tracking-tight">{name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="text-black">{metricA}</Badge>
                <Badge variant="outline">{metricB}</Badge>
            </div>
        </div>
    );
}

function GuideCard({
    icon,
    title,
    body,
}: {
    icon: React.ReactNode;
    title: string;
    body: string;
}) {
    return (
        <Card className="border-border bg-card p-5">
            <div className="inline-flex rounded-full border border-border bg-background/80 p-2">
                {icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {body}
            </p>
        </Card>
    );
}
