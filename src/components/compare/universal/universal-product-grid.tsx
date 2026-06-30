import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    formatConfidenceLabel,
    formatEnvironmentLabel,
    formatFeelLabel,
    formatMousepadValue,
    getDefaultColorway,
    getMousepadFullName,
} from "@/lib/mousepads";
import { getPadUseCaseSummary } from "@/lib/compare";
import { formatSize } from "@/lib/utils/format";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    mousepads: Mousepad[];
};

export function UniversalProductGrid({ mousepads }: Props) {
    return (
        <div className="grid gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
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
                        <div className="relative aspect-[16/8] border-b border-border sm:aspect-video">
                            <Image
                                src={mousepad.images.main}
                                alt={getMousepadFullName(mousepad)}
                                fill
                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                                className="object-contain p-3 sm:p-5"
                            />
                        </div>

                        <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                            <CardTitle className="text-lg tracking-tight sm:text-xl">
                                {mousepad.name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground sm:text-sm">
                                {mousepad.brand}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-4 p-4 pt-2 sm:space-y-5 sm:p-6 sm:pt-3">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                <Badge className="text-black">
                                    {formatMousepadValue(mousepad.category)}
                                </Badge>
                                <Badge variant="outline">
                                    {formatMousepadValue(mousepad.surface)}
                                </Badge>
                                <Badge variant="outline" className="hidden sm:inline-flex">
                                    {formatMousepadValue(mousepad.base)}
                                </Badge>
                                <Badge variant="outline" className="hidden sm:inline-flex">
                                    {formatMousepadValue(mousepad.softness)}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <StatPill
                                    label="Glide"
                                    value={formatFeelLabel(
                                        mousepad.feel.speed,
                                        "speed",
                                    )}
                                />
                                <StatPill
                                    label="Control"
                                    value={formatFeelLabel(
                                        mousepad.feel.control,
                                        "control",
                                    )}
                                />
                                <StatPill
                                    label="Stopping"
                                    value={formatFeelLabel(
                                        mousepad.feel.stoppingPower,
                                        "stoppingPower",
                                    )}
                                />
                            </div>

                            <details className="group rounded-lg border border-border bg-background/50 md:hidden">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-semibold text-foreground">
                                    More details
                                    <span className="text-muted-foreground transition-transform group-open:rotate-180">
                                        v
                                    </span>
                                </summary>
                                <div className="grid gap-2 border-t border-border p-3">
                                    <DetailPill
                                        label="Texture"
                                        value={formatMousepadValue(mousepad.texture.feel)}
                                    />
                                    <DetailPill
                                        label="Size"
                                        value={formatSize(mainSize)}
                                    />
                                    <DetailPill
                                        label="Humidity"
                                        value={formatEnvironmentLabel(mousepad.environment.humidityResistance)}
                                    />
                                    <DetailPill
                                        label="Price in India"
                                        value={
                                            mousepad.price.inr
                                                ? `Rs ${mousepad.price.inr.toLocaleString("en-IN")}`
                                                : "N/A"
                                        }
                                    />
                                </div>
                            </details>

                            <div className="hidden gap-3 md:grid md:grid-cols-2">
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
                                    label="Humidity handling"
                                    value={formatEnvironmentLabel(
                                        mousepad.environment.humidityResistance,
                                    )}
                                />
                                <DetailPill
                                    label="Sweat handling"
                                    value={formatEnvironmentLabel(
                                        mousepad.environment.sweatResistance,
                                    )}
                                />
                                <DetailPill
                                    label="Dust / hair handling"
                                    value={formatEnvironmentLabel(
                                        mousepad.environment.dustHairResistance,
                                    )}
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
                                    label="Data confidence"
                                    value={formatConfidenceLabel(
                                        mousepad.feel.ratingConfidence,
                                    )}
                                />
                                <DetailPill
                                    label="Price in India"
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
                            <p className="hidden text-sm leading-6 text-muted-foreground sm:block">
                                {getPadUseCaseSummary(mousepad)}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

function StatPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-border bg-background p-2 sm:rounded-2xl sm:p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-foreground sm:text-sm">
                {value}
            </p>
        </div>
    );
}

function DetailPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-border bg-background/70 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-xs font-medium text-foreground sm:text-sm">{value}</p>
        </div>
    );
}
