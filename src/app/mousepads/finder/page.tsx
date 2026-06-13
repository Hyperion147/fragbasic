import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Database, ScanSearch, SlidersHorizontal } from "lucide-react";

import { MousepadFinder } from "@/components/finder/mousepad-finder";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllMousepads } from "@/lib/mousepads";

const heroFeatures = [
    {
        title: "Data-driven recommendations",
        body: "Recommendations use the actual speed, control, stopping power, and environment data in your database.",
        icon: Database,
    },
    {
        title: "Personalized for you",
        body: "Game choice, sensitivity, previous feel, and texture preference all shift the ranking logic.",
        icon: ScanSearch,
    },
    {
        title: "Transparent results",
        body: "Every recommendation shows why it matched and what tradeoffs to expect before you click through.",
        icon: SlidersHorizontal,
    },
] as const;

export const metadata = {
    title: "Mousepad Finder",
    description:
        "Answer a few questions and get mousepad recommendations based on your games, feel preferences, and environment.",
};

export default function MousepadFinderPage() {
    const mousepads = getAllMousepads();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,oklch(0.29_0.03_224/0.36),transparent_32%),linear-gradient(180deg,oklch(0.2_0.01_224),oklch(0.17_0.008_225))]">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link href="/" className="transition-colors hover:text-foreground">
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
                                <Badge className="text-black">Mousepad Finder</Badge>
                                <Badge variant="outline">{mousepads.length} pads indexed</Badge>
                            </div>

                            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                                Mousepad Finder
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                                Answer a few questions and we&apos;ll find the
                                mousepads that best match your playstyle.
                            </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            {heroFeatures.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <Card
                                        key={feature.title}
                                        className="border-border bg-card/65 p-5 shadow-lg shadow-black/5"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-background/70">
                                            <Icon className="size-4 text-foreground" />
                                        </div>
                                        <h2 className="mt-4 text-lg font-semibold tracking-tight">
                                            {feature.title}
                                        </h2>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {feature.body}
                                        </p>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    <Card className="relative min-h-[320px] overflow-hidden border-border bg-card/80 p-0 shadow-2xl shadow-black/15">
                        <Image
                            src="/hero-bg.png"
                            alt="Mousepad stack visual"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 44vw"
                            className="object-cover object-right"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,15,0.78),rgba(10,12,15,0.2),transparent)]" />
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/45 to-transparent" />
                    </Card>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
                <MousepadFinder mousepads={mousepads} />
            </section>
        </main>
    );
}
