import {
    formatConfidenceLabel,
    formatEnvironmentLabel,
} from "@/lib/mousepads";
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
        ["Humidity handling", formatEnvironmentLabel(pad.environment.humidityResistance)],
        ["Sweat handling", formatEnvironmentLabel(pad.environment.sweatResistance)],
        ["Dust / hair handling", formatEnvironmentLabel(pad.environment.dustHairResistance)],
        ["Data confidence", formatConfidenceLabel(pad.feel.ratingConfidence)],
    ];

    return (
        <div>
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Spec sheet</p>
                <h2 className="panel-title">
                    Specs that matter
                </h2>
            </div>

            <div className="overflow-hidden soft-surface">
                <table className="data-table">
                    <tbody>
                        {specs.map(([label, value]) => (
                            <tr key={label}>
                                <td className="w-1/3 text-xs uppercase text-muted-foreground">
                                    {label}
                                </td>
                                <td className="font-medium text-foreground">
                                    {value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                <div className="mt-5 soft-surface p-4">
                    <p className="text-sm font-medium text-foreground">
                        Included kit mentioned by some listings
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {pad.includedAccessories.map((accessory) => (
                            <span
                                key={accessory}
                                className="bg-background/70 px-3 py-1 text-xs text-muted-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]"
                            >
                                {accessory}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
