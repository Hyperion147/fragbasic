import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Crosshair,
    Gauge,
    Shield,
    Sparkles,
    ThermometerSun,
    Trophy,
    Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { getAllBestPages, getBestPagePicks } from "@/data/best-pages";
import { getAllMousepads, getMousepadFullName } from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Best Mousepads for FPS Games",
    description:
        "Browse FragBasic's best mousepad guides for FPS games, including control, speed, VALORANT, CS2, glasspads, and humidity-resistant picks.",
    path: "/best",
    keywords: [
        "best mousepads",
        "best fps mousepads",
        "best mousepads for fps",
        "best gaming mousepads",
        "best valorant mousepads",
        "best cs2 mousepads",
        "best glasspads",
        "best control mousepads",
        "best speed mousepads",
    ],
});

const pageIcons = {
    "control-mousepads": Shield,
    "speed-mousepads": Zap,
    "valorant-mousepads": Crosshair,
    "cs2-mousepads": Trophy,
    glasspads: Sparkles,
    "humidity-resistant-mousepads": ThermometerSun,
} as const;

const pageTone = {
    "control-mousepads": "Brake feel",
    "speed-mousepads": "Fast glide",
    "valorant-mousepads": "Tac precision",
    "cs2-mousepads": "Rifle control",
    glasspads: "Hard surface",
    "humidity-resistant-mousepads": "Climate stable",
} as const;

export default function BestPage() {
    const pages = getAllBestPages();
    const mousepads = getAllMousepads();
    const featured = pages.slice(0, 3).map((page) => ({
        page,
        pick: getBestPagePicks(page, mousepads)[0],
    }));

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-x-0 top-0 h-px bg-[color:var(--brand-hover)] shadow-[0_0_28px_var(--brand-glow)]" />
                <div className="page-hero">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.58fr)] lg:items-end">
                        <div className="max-w-5xl">
                            <SiteBreadcrumbs
                                items={[
                                    { label: "Home", href: "/" },
                                    { label: "Best" },
                                ]}
                            />
                            <div className="flex flex-wrap gap-2">
                                <Badge className="text-black">Best picks</Badge>
                                <Badge variant="outline">6 guide paths</Badge>
                                <Badge variant="outline">FPS focused</Badge>
                            </div>

                            <h1 className="page-title mt-5">
                                Find the right kind of best.
                            </h1>

                            <p className="body-copy mt-5 max-w-3xl">
                                A mousepad is only best after you know what it
                                needs to solve: stopping, tracking, tac-FPS
                                stability, glass speed, or humid-room
                                consistency. Start with the problem, then pick
                                the surface.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button asChild>
                                    <Link href="/mousepads/compare/universal">
                                        Visit Universal Compare
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative min-h-[320px] overflow-hidden soft-panel p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="compact-label">
                                        Current routes
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold">
                                        6
                                    </p>
                                </div>
                                <Gauge className="size-9 text-primary" />
                            </div>

                            <div className="mt-8 grid gap-3">
                                {featured.map(({ page, pick }, index) => (
                                    <Link
                                        key={page.slug}
                                        href={`/best/${page.slug}`}
                                        className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 soft-surface p-3 transition-colors hover:bg-background/90"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-card">
                                            {pick ? (
                                                <Image
                                                    src={pick.mousepad.images.main}
                                                    alt={getMousepadFullName(
                                                        pick.mousepad,
                                                    )}
                                                    fill
                                                    sizes="72px"
                                                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : null}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="compact-label">
                                                0{index + 1}
                                            </p>
                                            <p className="truncate text-sm font-semibold text-foreground">
                                                {page.title}
                                            </p>
                                        </div>
                                        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="guides"
                className="page-section"
            >
                <div className="max-w-4xl">
                    <Badge variant="outline">Choose a lane</Badge>
                    <h2 className="section-title mt-4">
                        Six shortlists, six different reasons to care.
                    </h2>
                </div>

                <div className="mt-10 soft-panel">
                    {pages.map((page, index) => {
                        const Icon = pageIcons[page.slug];
                        const firstPick = getBestPagePicks(page, mousepads)[0];

                        return (
                            <Link
                                key={page.slug}
                                href={`/best/${page.slug}`}
                                className="group grid gap-4 px-4 py-4 shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-colors last:shadow-none hover:bg-foreground/[0.035] md:grid-cols-[72px_1fr_180px_260px_auto] md:items-center"
                            >
                                <div className="flex items-center gap-3 md:block">
                                    <span className="flex size-10 items-center justify-center bg-background/80 text-primary shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]">
                                        <Icon className="size-5" />
                                    </span>
                                    <p className="compact-label font-mono md:mt-2">
                                        0{index + 1}
                                    </p>
                                </div>

                                <div className="min-w-0">
                                    <h3 className="panel-title">
                                        {page.title}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                        {page.hero}
                                    </p>
                                </div>

                                <Badge variant="outline" className="w-fit">
                                    {pageTone[page.slug]}
                                </Badge>

                                <div className="min-w-0">
                                    <p className="compact-label">
                                        First pick
                                    </p>
                                    <p className="mt-1 truncate text-sm font-medium">
                                        {firstPick
                                            ? getMousepadFullName(
                                                  firstPick.mousepad,
                                              )
                                            : "Open shortlist"}
                                    </p>
                                </div>

                                <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
