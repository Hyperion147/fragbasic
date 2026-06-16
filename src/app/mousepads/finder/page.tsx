import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
} from "lucide-react";

import { MousepadFinder } from "@/components/finder/mousepad-finder";
import { SiteSection } from "@/components/SiteSection";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllMousepads } from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Mousepad Finder for VALORANT, CS2, and FPS Games",
    description:
        "Answer a few questions and get mousepad recommendations based on your game, feel preference, sensitivity, humidity, and aiming style.",
    path: "/mousepads/finder",
    keywords: [
        "mousepad finder",
        "best mousepad for valorant",
        "best mousepad for cs2",
        "mousepad recommendation tool",
        "find the right mousepad",
        "mousepad recommendation",
    ],
});

export default function MousepadFinderPage() {
    const mousepads = getAllMousepads();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Home
                                </Link>
                                <ChevronRight className="size-4" />
                                <Link
                                    href="/mousepads"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Mousepads
                                </Link>
                                <ChevronRight className="size-4" />
                                <span className="text-foreground">Finder</span>
                            </div>

                            <div className="max-w-3xl">
                                <div className="flex flex-wrap gap-2">
                                    <Badge className="text-black">
                                        Mousepad Finder
                                    </Badge>
                                    <Badge variant="outline">
                                        {mousepads.length} pads indexed
                                    </Badge>
                                </div>

                                <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                                    Mousepad Finder
                                </h1>

                                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                                    Answer a few questions and we&apos;ll find
                                    the mousepads that best match your
                                    playstyle, game, sensitivity, and control
                                    versus speed preference.
                                </p>
                            </div>
                        </div>

                        <Card className="relative overflow-hidden border-border bg-card/80 p-0 shadow-2xl shadow-black/15">
                            <Image
                                src="/hero-bg.png"
                                alt="Mousepad stack visual"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 44vw"
                                className="object-cover object-right"
                            />
                        </Card>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <SiteSection className="bg-card/70">
                    <MousepadFinder mousepads={mousepads} />
                </SiteSection>
            </section>
        </main>
    );
}
