import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getMousepadFullName } from "@/lib/mousepads";
import type { MousepadComparison } from "@/data/comparisons";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    comparison: MousepadComparison;
    left: Mousepad;
    right: Mousepad;
};

export function ComparisonCard({ comparison, left, right }: Props) {
    return (
        <Link href={`/compare/${comparison.slug}`} className="h-full">
            <Card className="group h-full border-border bg-card/95 p-5 transition-all duration-200 hover:border-primary/45 hover:shadow-lg hover:shadow-black/10">
                <div className="grid gap-3 rounded-3xl md:grid-cols-[1fr_auto_1fr] md:items-center">
                    <PadSummary
                        brand={left.brand}
                        name={left.name}
                        topMetric={`${left.feel.control}/10 control`}
                        secondMetric={`${left.feel.stoppingPower}/10 stop`}
                    />
                    <div className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        vs
                    </div>
                    <PadSummary
                        brand={right.brand}
                        name={right.name}
                        topMetric={`${right.feel.speed}/10 speed`}
                        secondMetric={`${right.feel.microAdjustments}/10 micro`}
                        align="right"
                    />
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                    {comparison.excerpt}
                </p>

                <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <div className="flex flex-wrap gap-2">
                        {comparison.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <span className="inline-flex items-center gap-2 font-medium text-foreground">
                        Open comparison
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </Card>
        </Link>
    );
}

function PadSummary({
    brand,
    name,
    topMetric,
    secondMetric,
    align = "left",
}: {
    brand: string;
    name: string;
    topMetric: string;
    secondMetric: string;
    align?: "left" | "right";
}) {
    return (
        <div className={align === "right" ? "text-left md:text-right" : ""}>
            <p className="text-sm text-muted-foreground">{brand}</p>
            <p className="text-lg font-semibold tracking-tight">{name}</p>
            <div
                className={[
                    "mt-3 flex flex-wrap gap-2",
                    align === "right" ? "md:justify-end" : "",
                ].join(" ")}
            >
                <Badge className="text-black">{topMetric}</Badge>
                <Badge variant="outline">{secondMetric}</Badge>
            </div>
        </div>
    );
}
