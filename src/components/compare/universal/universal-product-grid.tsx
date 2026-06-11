import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    formatMousepadValue,
    getDefaultColorway,
    getMousepadFullName,
} from "@/lib/mousepads";
import { getPadUseCaseSummary } from "@/lib/compare";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    mousepads: Mousepad[];
};

export function UniversalProductGrid({ mousepads }: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mousepads.map((mousepad) => {
                const colorway = getDefaultColorway(mousepad);
                const mainSize = mousepad.sizes[0];

                return (
                    <Card
                        key={mousepad.slug}
                        className="border-border bg-card/95 shadow-lg shadow-black/10"
                        style={{
                            background: `radial-gradient(circle at top, ${colorway.color}22, transparent 55%)`,
                        }}
                    >
                        <div className="relative aspect-video border-b border-border">
                            <Image
                                src={mousepad.images.main}
                                alt={getMousepadFullName(mousepad)}
                                fill
                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                                className="object-contain p-5"
                            />
                        </div>

                        <CardHeader>
                            <CardTitle className="text-xl tracking-tight">
                                {mousepad.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {mousepad.brand}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div className="flex flex-wrap gap-2">
                                <Badge className="text-black">
                                    {formatMousepadValue(mousepad.category)}
                                </Badge>
                                <Badge variant="outline">
                                    {formatMousepadValue(mousepad.surface)}
                                </Badge>
                                <Badge variant="outline">
                                    {formatMousepadValue(mousepad.base)}
                                </Badge>
                                <Badge variant="outline">
                                    {formatMousepadValue(mousepad.softness)}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <StatPill
                                    label="Speed"
                                    value={mousepad.feel.speed}
                                />
                                <StatPill
                                    label="Control"
                                    value={mousepad.feel.control}
                                />
                                <StatPill
                                    label="Stop"
                                    value={mousepad.feel.stoppingPower}
                                />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <DetailPill
                                    label="Texture"
                                    value={formatMousepadValue(
                                        mousepad.texture.feel,
                                    )}
                                />
                                <DetailPill
                                    label="Main size"
                                    value={formatSize(mainSize)}
                                />
                                <DetailPill
                                    label="Thickness"
                                    value={
                                        mainSize?.thickness
                                            ? `${mainSize.thickness}mm`
                                            : "Unknown"
                                    }
                                />
                                <DetailPill
                                    label="Humidity"
                                    value={`${mousepad.environment.humidityResistance}/10`}
                                />
                                <DetailPill
                                    label="Sweat"
                                    value={`${mousepad.environment.sweatResistance}/10`}
                                />
                                <DetailPill
                                    label="Dust / Hair"
                                    value={`${mousepad.environment.dustHairResistance}/10`}
                                />
                                <DetailPill
                                    label="India"
                                    value={formatMousepadValue(
                                        mousepad.availability.india,
                                    )}
                                />
                                <DetailPill
                                    label="Sleeve friendly"
                                    value={
                                        mousepad.texture.sleeveFriendly
                                            ? "Yes"
                                            : "No"
                                    }
                                />
                                <DetailPill
                                    label="Washable"
                                    value={
                                        mousepad.environment.washable
                                            ? "Yes"
                                            : "No"
                                    }
                                />
                                <DetailPill
                                    label="Confidence"
                                    value={formatMousepadValue(
                                        mousepad.feel.ratingConfidence,
                                    )}
                                />
                                <DetailPill
                                    label="India price"
                                    value={
                                        mousepad.price.inr
                                            ? `Rs ${mousepad.price.inr.toLocaleString("en-IN")}`
                                            : "N/A"
                                    }
                                />
                                <DetailPill
                                    label="Aim fit"
                                    value={mousepad.recommendedFor.aimStyles
                                        .slice(0, 2)
                                        .map(formatMousepadValue)
                                        .join(", ")}
                                />
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                    Best game fit
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {mousepad.recommendedFor.games
                                        .slice(0, 3)
                                        .map((game) => (
                                            <Badge
                                                key={game}
                                                variant="secondary"
                                            >
                                                {formatMousepadValue(game)}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                            <p className="text-sm leading-6 text-muted-foreground">
                                {getPadUseCaseSummary(mousepad)}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

function StatPill({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-2xl border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
                {value}
            </p>
        </div>
    );
}

function DetailPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
        </div>
    );
}

function formatSize(size?: {
    label: string;
    width: number;
    height: number;
    thickness?: number;
    unit: "mm";
}) {
    if (!size) {
        return "Unknown";
    }

    return `${size.label} - ${size.width} x ${size.height}${size.unit}`;
}
