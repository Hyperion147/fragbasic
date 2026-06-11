import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllMousepads, getMousepadBySlug } from "@/lib/mousepads";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MousepadFeelChart } from "@/components/mousepads/mousepad-feel-chart";
import { MousepadSpecGrid } from "@/components/mousepads/mousepad-spec-grid";
import { MousepadImageGallery } from "@/components/mousepads/mousepad-image-gallery";
import type { Mousepad } from "@/types/mousepad";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return getAllMousepads().map((pad) => ({
        slug: pad.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const pad = getMousepadBySlug(slug);
    if (!pad) {
        notFound();
    }
    if (!pad) {
        return {
            title: "Mousepad not found",
        };
    }

    return {
        title: `${pad.brand} ${pad.name} Review & Specs`,
        description: `${pad.brand} ${pad.name} feel profile, specs, humidity resistance, control, speed, and FPS recommendations.`,
    };
}

export default async function MousepadPage({ params }: PageProps) {
    const { slug } = await params;
    const pad = getMousepadBySlug(slug);

    if (!pad) notFound();

    const galleryImages = [pad.images.main, ...(pad.images.gallery ?? [])];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
                    <div>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <Badge className="text-black">{pad.category}</Badge>
                            <Badge variant="outline">{pad.softness}</Badge>
                            <Badge variant="outline">{pad.surface}</Badge>
                            <Badge variant="outline">{pad.base}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {pad.brand}
                        </p>

                        <h1 className="mt-2 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                            {pad.name}
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                            A feel-first breakdown of speed, control, stopping
                            power, humidity resistance, surface texture, and
                            competitive FPS fit.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/compare">
                                    Compare this pad
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>

                            <Button variant="outline" asChild>
                                <Link href="/mousepads">Browse all pads</Link>
                            </Button>
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-2">
                            <HeroStat label="Speed" value={pad.feel.speed} />
                            <HeroStat
                                label="Control"
                                value={pad.feel.control}
                            />
                            <HeroStat
                                label="Stop"
                                value={pad.feel.stoppingPower}
                            />
                        </div>
                    </div>

                    <Card className="overflow-hidden border-border bg-card p-5">
                        <MousepadImageGallery
                            brand={pad.brand}
                            name={pad.name}
                            images={galleryImages}
                        />
                    </Card>
                </div>
            </section>

            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_360px] md:px-8">
                <div className="space-y-6">
                    <MousepadFeelChart pad={pad} />
                    <MousepadSpecGrid pad={pad} />
                    <PersonalNotes pad={pad} />
                </div>

                <aside className="space-y-6">
                    <RecommendationCard pad={pad} />
                    <AvailabilityCard pad={pad} />
                </aside>
            </div>
        </main>
    );
}

function HeroStat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
    );
}

function RecommendationCard({ pad }: { pad: Mousepad }) {
    return (
        <Card className="border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Best for</p>

            <div className="mt-4 flex flex-wrap gap-2">
                {pad.recommendedFor.games.map((game: string) => (
                    <Badge key={game} className="text-black">
                        {formatValue(game)}
                    </Badge>
                ))}
            </div>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <p>
                    Aim style:{" "}
                    <span className="text-foreground">
                        {pad.recommendedFor.aimStyles
                            .map(formatValue)
                            .join(", ")}
                    </span>
                </p>

                <p>
                    Sensitivity:{" "}
                    <span className="text-foreground">
                        {pad.recommendedFor.sensitivity
                            .map(formatValue)
                            .join(", ")}
                    </span>
                </p>
            </div>
        </Card>
    );
}

function AvailabilityCard({ pad }: { pad: Mousepad }) {
    return (
        <Card className="border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Availability</p>

            <h3 className="mt-2 text-xl font-semibold">
                {formatValue(pad.availability.india)} in India
            </h3>

            {pad.price.inr ? (
                <p className="mt-3 text-sm text-muted-foreground">
                    Estimated India price:{" "}
                    <span className="text-foreground">
                        ₹{pad.price.inr.toLocaleString("en-IN")}
                    </span>
                </p>
            ) : null}

            {pad.availability.notes ? (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {pad.availability.notes}
                </p>
            ) : null}
        </Card>
    );
}

function PersonalNotes({ pad }: { pad: Mousepad }) {
    return (
        <Card className="border-border bg-card p-5 md:p-6">
            <p className="text-sm text-muted-foreground">Personal notes</p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Tested experience
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
                {pad.personal.notes ||
                    "Personal testing notes will be added later."}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                    <p className="font-medium">Pros</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {(pad.personal.pros || []).map((pro: string) => (
                            <li key={pro}>• {pro}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="font-medium">Cons</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {(pad.personal.cons || []).map((con: string) => (
                            <li key={con}>• {con}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

function formatValue(value: string) {
    return value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
