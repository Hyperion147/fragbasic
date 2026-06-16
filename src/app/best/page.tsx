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
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
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

                            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
                                Find the right kind of best.
                            </h1>

                            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
                                A mousepad is only best after you know what it
                                needs to solve: stopping, tracking, tac-FPS
                                stability, glass speed, or humid-room
                                consistency. Start with the problem, then pick
                                the surface.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button asChild>
                                    <Link href="#guides">
                                        Browse guides
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/mousepads/finder">
                                        Use the finder
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative min-h-[320px] overflow-hidden border border-border bg-card/70 p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        Current routes
                                    </p>
                                    <p className="mt-2 text-3xl font-semibold tracking-tight">
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
                                        className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 border border-border bg-background/70 p-3 transition-colors hover:border-[color:var(--brand-hover)]"
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
                                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
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
                className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10"
            >
                <div className="max-w-4xl">
                    <Badge variant="outline">Choose a lane</Badge>
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        Six shortlists, six different reasons to care.
                    </h2>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {pages.map((page, index) => {
                        const Icon = pageIcons[page.slug];
                        const firstPick = getBestPagePicks(page, mousepads)[0];

                        return (
                            <Link
                                key={page.slug}
                                href={`/best/${page.slug}`}
                                className="group flex min-h-[300px] flex-col justify-between border border-border bg-card/80 p-6 transition-colors hover:border-[color:var(--brand-hover)] hover:shadow-[0_0_28px_color-mix(in_srgb,var(--brand-glow)_14%,transparent)]"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-4">
                                        <Badge variant="outline">
                                            {pageTone[page.slug]}
                                        </Badge>
                                        <span className="flex size-10 items-center justify-center border border-border bg-background/80 text-primary">
                                            <Icon className="size-5" />
                                        </span>
                                    </div>

                                    <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        0{index + 1}
                                    </p>
                                    <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                                        {page.title}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                        {page.hero}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-5">
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
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
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
