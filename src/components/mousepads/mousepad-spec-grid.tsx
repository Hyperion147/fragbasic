import { Card } from "@/components/ui/card";
import { formatValue } from "@/lib/utils/format";
import type { Mousepad } from "@/types/mousepad";

export function MousepadSpecGrid({ pad }: { pad: Mousepad }) {
    const size = pad.sizes[0];
    const glassFinishValue =
        pad.category === "glass" && pad.glassSurfaceFinish
            ? pad.glassSurfaceFinish === "unknown"
                ? "Unknown"
                : formatValue(pad.glassSurfaceFinish)
            : null;

    const specs = [
        ["Category", formatValue(pad.category)],
        ["Surface", formatValue(pad.surface)],
        ...(glassFinishValue ? [["Glass finish", glassFinishValue]] : []),
        ...(pad.coatingDurability
            ? [["Coating durability", pad.coatingDurability]]
            : []),
        ["Base", formatValue(pad.base)],
        ["Softness", formatValue(pad.softness)],
        ["Main size", size ? `${size.width} × ${size.height}mm` : "Unknown"],
        ["Thickness", size?.thickness ? `${size.thickness}mm` : "Unknown"],
        ["Texture", formatValue(pad.texture.feel)],
        ["Sleeve friendly", pad.texture.sleeveFriendly ? "Yes" : "No"],
        ["Humidity", `${pad.environment.humidityResistance}/10`],
        ["Sweat", `${pad.environment.sweatResistance}/10`],
        ["Dust / hair", `${pad.environment.dustHairResistance}/10`],
        ["Confidence", formatValue(pad.feel.ratingConfidence)],
    ];

    return (
        <Card className="border-border bg-card p-5 md:p-6">
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Spec sheet</p>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Specs that matter
                </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {specs.map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-xl border border-border bg-background p-4"
                    >
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-medium">{value}</p>
                    </div>
                ))}
            </div>

            {pad.environment.notes ? (
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    {pad.environment.notes}
                </p>
            ) : null}

            {pad.category === "glass" && pad.glassSurfaceFinishNotes ? (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Finish note: {pad.glassSurfaceFinishNotes}
                </p>
            ) : null}

            {pad.includedAccessories?.length ? (
                <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
                    <p className="text-sm font-medium text-foreground">
                        Included kit mentioned by some listings
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {pad.includedAccessories.map((accessory) => (
                            <span
                                key={accessory}
                                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                            >
                                {accessory}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}
        </Card>
    );
}
