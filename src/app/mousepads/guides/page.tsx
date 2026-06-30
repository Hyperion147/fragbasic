import Link from "next/link";

import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const guidePreviews = [
    {
        title: "Control vs speed mousepads",
        body: "Learn how glide, stopping power, and friction change how a pad feels in actual games.",
    },
    {
        title: "Best pads for humid climates",
        body: "See which surfaces stay more consistent when sweat, humidity, and sleeve friction become a factor.",
    },
    {
        title: "How to choose your first pad",
        body: "Use game choice, sensitivity, and preferred feel to narrow down a safe shortlist quickly.",
    },
] as const;

export default function GuidesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="page-hero">
                    <div className="max-w-4xl">
                        <SiteBreadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Mousepads", href: "/mousepads" },
                                { label: "Guides" },
                            ]}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">Guides</Badge>
                            <Badge variant="outline">Competitive FPS focus</Badge>
                        </div>

                        <h1 className="page-title mt-5">
                            Learn the feel before you buy the pad.
                        </h1>

                        <p className="body-copy mt-5 max-w-2xl">
                            This is the starter layer of the guide library:
                            quick frameworks for choosing between control,
                            balanced, speed, and humidity-friendly pads before
                            the longer breakdowns land.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/mousepads">Browse mousepads</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/mousepads/compare">Read comparisons</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-section">
                <div className="grid gap-4 md:grid-cols-3">
                    {guidePreviews.map((guide) => (
                        <article
                            key={guide.title}
                            className="border border-border bg-card/70 p-4 sm:p-5"
                        >
                            <h2 className="panel-title">
                                {guide.title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {guide.body}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
