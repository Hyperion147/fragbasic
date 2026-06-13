import Link from "next/link";

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
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">Guides</Badge>
                            <Badge variant="outline">Competitive FPS focus</Badge>
                        </div>

                        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                            Learn the feel before you buy the pad.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                            This section is being expanded into a proper guide
                            library. For now, use the mousepad database and
                            compare tools while the written breakdowns are being
                            added.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
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

            <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {guidePreviews.map((guide) => (
                        <article
                            key={guide.title}
                            className="rounded-3xl border border-border bg-card/70 p-6"
                        >
                            <h2 className="text-2xl font-semibold tracking-tight">
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
