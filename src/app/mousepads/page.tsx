// app/mousepads/page.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllMousepads } from "@/lib/mousepads";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDefaultColorway } from "@/lib/mousepads";
import { Mousepad } from "@/types/mousepad";
import Image from "next/image";

export default function MousepadsPage({ pad }: { pad: Mousepad }) {
    const mousepads = getAllMousepads();
    const colorway = getDefaultColorway(pad);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
                    <p className="text-sm text-muted-foreground">
                        Mousepad database
                    </p>

                    <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
                        Browse mousepads
                    </h1>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mousepads.map((pad) => (
                        <Link key={pad.slug} href={`/mousepads/${pad.slug}`}>
                            <Card className="group h-full border-border bg-card p-5 transition-colors hover:border-primary/50">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="default" className="text-black">
                                        {formatValue(pad.category)}
                                    </Badge>
                                    <Badge variant="outline">
                                        {formatValue(pad.softness)}
                                    </Badge>
                                    <Badge variant="outline">
                                        {formatValue(pad.surface)}
                                    </Badge>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {pad.brand}
                                </p>

                                <h2 className="text-xl font-semibold tracking-tight">
                                    {pad.name}
                                </h2>

                                <div className="flex items-center aspect-square">
                                    <Image
                                        src={pad.images.main}
                                        alt={pad.images.main}
                                        width={500}
                                        height={500}
                                        className="object-contain hover:scale-105 transition-all duration-300"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <MiniStat
                                        label="Speed"
                                        value={pad.feel.speed}
                                    />
                                    <MiniStat
                                        label="Control"
                                        value={pad.feel.control}
                                    />
                                    <MiniStat
                                        label="Stop"
                                        value={pad.feel.stoppingPower}
                                    />
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    View profile
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

function MiniStat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold">{value}</p>
        </div>
    );
}

function formatValue(value: string) {
    return value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
