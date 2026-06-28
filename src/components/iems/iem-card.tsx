import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    formatIemDriverType,
    formatIemPrice,
    formatIemRating,
    formatIemSoundSignature,
    getIemFullName,
    getIemScoreTone,
} from "@/lib/iems";
import type { Iem } from "@/types/iem";

export function IemCard({ iem }: { iem: Iem }) {
    return (
        <Link href={`/iems/${iem.slug}`} className="group block h-full">
            <Card className="relative h-full overflow-hidden border-border bg-card/80 p-5 transition-colors">
                <div className="relative flex flex-wrap gap-2">
                    <Badge className="text-black">
                        {formatIemSoundSignature(iem.soundSignature)}
                    </Badge>
                    <Badge variant="outline">
                        {formatIemDriverType(iem.driverType)}
                    </Badge>
                    <Badge variant="outline">
                        {iem.priceTier.replace("-", " ")}
                    </Badge>
                </div>

                <div className="relative mt-5">
                    <p className="text-sm text-muted-foreground">{iem.brand}</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                        {iem.name}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {iem.communitySummary}
                    </p>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-background/70">
                    <div className="relative aspect-[16/10]">
                        <Image
                            src={iem.images.main}
                            alt={getIemFullName(iem)}
                            fill
                            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                            className="object-cover object-right transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                    </div>
                </div>

                <div className="relative mt-5 grid grid-cols-3 gap-2">
                    <MiniStat label="FPS" value={iem.ratings.fps} />
                    <MiniStat label="Imaging" value={iem.ratings.imaging} />
                    <MiniStat label="Value" value={iem.ratings.value} />
                </div>

                <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-border pt-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            {getIemScoreTone(iem.ratings.fragbasic)}
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                            {formatIemPrice(iem)}
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-hover">
                        View IEM
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </Card>
        </Link>
    );
}

function MiniStat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-border bg-background/70 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 text-lg font-semibold">
                {formatIemRating(value)}
            </p>
        </div>
    );
}
