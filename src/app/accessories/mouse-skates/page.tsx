import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SkateSpectrum } from "@/components/accessories/mouse-skates/skate-spectrum";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import {
    getAllMouseSkates,
    getMouseSkatesBySpeed,
} from "@/data/accessories/mouse-skates";
import { formatMouseSkateMaterial } from "@/lib/accessories/mouse-skates";
import { buildMetadata } from "@/lib/seo";
import type { MouseSkateMaterial } from "@/types/accessory";

export const metadata: Metadata = buildMetadata({
    title: "Mouse Skate Database",
    description:
        "Browse FragBasic's mouse skate database with popular skate speed, control, material, glasspad fit, and surface compatibility notes.",
    path: "/accessories/mouse-skates",
    keywords: [
        "mouse skates",
        "Xraypad skates",
        "Corepad skates",
        "Tiger ICE skates",
        "Pulsar Superglide skates",
        "Jade skates",
        "Obsidian skates",
        "best mouse skates",
        "glasspad mouse skates",
    ],
});

const skates = getAllMouseSkates();
const fastSlowSkates = getMouseSkatesBySpeed();

const materialNotes: Array<{
    material: MouseSkateMaterial;
    title: string;
    body: string;
}> = [
    {
        material: "ptfe",
        title: "PTFE",
        body: "Fastest and smoothest feel on cloth or hybrid pads. Standard PTFE wears faster on hard surfaces, so it is usually not the first glasspad pick.",
    },
    {
        material: "hardened-ptfe",
        title: "Hardened PTFE",
        body: "More control, stopping feedback, and durability than pure speed PTFE. This is the safer middle ground for cloth, hybrid, and many glass setups.",
    },
    {
        material: "uhmwpe",
        title: "UHMWPE / U-PE",
        body: "Durability and damped control first. Xraypad uses it on Obsidian Pro Air for glass-focused, quieter, slower glide.",
    },
    {
        material: "glass",
        title: "Glass",
        body: "Very durable and very smooth on compatible cloth pads, but surface pairing matters. Avoid glass skates on glasspads.",
    },
    {
        material: "titanium",
        title: "Titanium",
        body: "A specialized durability option. Treat it as a tuning part for hard surfaces rather than a normal PTFE replacement.",
    },
];

export default function MouseSkatesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10 flex items-end justify-between">
                    <div className="max-w-5xl">
                        <SiteBreadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Accessories" },
                                { label: "Mouse Skates" },
                            ]}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-sky-300 text-slate-950">
                                Accessories
                            </Badge>
                            <Badge variant="outline">
                                {skates.length} skate
                                {skates.length === 1 ? "" : "s"} tracked
                            </Badge>
                            <Badge variant="outline">No images yet</Badge>
                        </div>

                        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                            Mouse skates ranked from fast to slow.
                        </h1>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href="/accessories/mouse-skates/browse"
                            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                        >
                            Browse skates
                            <ArrowRight className="size-4" />
                        </Link>
                        <Link
                            href="/accessories/mouse-skates/compare"
                            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-foreground"
                        >
                            Compare skates
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <SkateSpectrum skates={fastSlowSkates} />
            </section>

            <section className="border-t border-border w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <SectionHeading eyebrow="Materials" title="What changes feel" />
                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {materialNotes.map((note) => (
                        <div
                            key={note.material}
                            className="rounded-2xl border border-border bg-card/45 p-4"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-sm font-semibold">
                                    {note.title}
                                </h2>
                                <Badge variant="outline">
                                    {formatMouseSkateMaterial(note.material)}
                                </Badge>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {note.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

function SectionHeading({
    eyebrow,
    title,
    body,
}: {
    eyebrow: string;
    title: string;
    body?: string;
}) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {body}
            </p>
        </div>
    );
}
