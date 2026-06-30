import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClientShareButton } from "@/components/ClientShareButton";
import {
    getCompareHeroBody,
    getComparisonHighlights,
    getCompareVerdictRows,
} from "@/lib/compare";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    left: Mousepad;
    right: Mousepad;
    comparisonSlug: string;
};

export function CompareHero({ left, right, comparisonSlug }: Props) {
    const highlights = getComparisonHighlights(left, right);
    const verdictRows = getCompareVerdictRows(left, right);

    return (
        <section className="border-b border-border bg-background">
            <div className="page-hero">
              <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        <Badge>Mousepad comparison</Badge>
                        <Badge variant="outline">Valorant / CS2 focused</Badge>
                        <Badge variant="outline">Soft base</Badge>
                    </div>

                    <h1 className="page-title-compact max-w-4xl">
                        {left.brand} {left.name}
                        <div className="flex items-center gap-2 text-xl text-muted-foreground">
                            <ArrowUpDown className="size-4" />
                            vs
                        </div>
                        {right.brand} {right.name}
                    </h1>

                    <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                        {getCompareHeroBody(left, right)}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Button asChild>
                            <Link
                                href={`/mousepads/compare/universal?pads=${left.slug},${right.slug}`}
                            >
                                <SlidersHorizontal className="size-4" />
                                Open in Universal Compare
                            </Link>
                        </Button>
                        <ClientShareButton
                            href={`/mousepads/compare/${comparisonSlug}`}
                            label="Share matchup"
                            iconOnly
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {highlights.map((item) => (
                            <HighlightCard
                                key={item.label}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>

                <div className="border border-border bg-card/90 p-5 shadow-lg shadow-black/10 backdrop-blur">
                    <p className="text-sm text-muted-foreground">
                        Quick verdict
                    </p>
                    <h2 className="panel-title mt-2">
                        Choose based on how much freedom you want in your glide.
                    </h2>

                    <div className="mt-5 space-y-4">
                        {verdictRows.map((row) => (
                            <VerdictRow
                                key={row.label}
                                label={row.label}
                                value={row.value}
                            />
                        ))}
                    </div>
                </div>
              </div>
            </div>
        </section>
    );
}

function HighlightCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="border border-border bg-card/60 p-4 backdrop-blur-sm">
            <p className="compact-label">
                {label}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
        </div>
    );
}

function VerdictRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-background/80 px-4 py-3">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
        </div>
    );
}
