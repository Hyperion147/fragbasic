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
import { cn } from "@/lib/utils";
import type { Iem } from "@/types/iem";

export function IemCard({
    iem,
    isLatestAdded = false,
    featured = false,
}: {
    iem: Iem;
    isLatestAdded?: boolean;
    featured?: boolean;
}) {
    if (featured) {
        return <FeaturedIemCard iem={iem} />;
    }

    return (
        <Link
            href={`/iems/${iem.slug}`}
            className={cn("group block h-full")}
        >
            <Card
                className={cn(
                    "relative h-full overflow-hidden border-border bg-card/80 p-5 transition-colors",
                )}
            >
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
                    {isLatestAdded ? (
                        <Badge
                            variant="outline"
                            className="border-sky-300/70 bg-sky-200/10 text-sky-100"
                        >
                            Latest added
                        </Badge>
                    ) : null}
                </div>

                <div className="relative mt-5">
                    <p className="text-sm text-muted-foreground">{iem.brand}</p>
                    <h2 className="panel-title mt-1">
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
                        <p className="compact-label">
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

function FeaturedIemCard({ iem }: { iem: Iem }) {
    return (
        <Link href={`/iems/${iem.slug}`} className="group relative z-10 block">
            <Card className="overflow-hidden bg-card/90 p-4 inset-ring-2 inset-ring-violet-400/90 ring-offset-background transition-shadow hover:shadow-lg hover:shadow-violet-500/10    sm:p-5">
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(100px,0.4fr)_minmax(220px,0.4fr)] md:items-center md:gap-6">
                    <div className="min-w-0 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">Latest review</Badge>
                            <Badge variant="outline">{formatIemSoundSignature(iem.soundSignature)}</Badge>
                            <Badge variant="outline">{formatIemDriverType(iem.driverType)}</Badge>
                        </div>
                        <div>
                            <p className="mt-4 text-sm text-muted-foreground">{iem.brand}</p>
                            <h2 className="panel-title mt-1 text-2xl sm:text-3xl">{iem.name}</h2>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {iem.communitySummary}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-hover">
                            View latest review
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <MiniStat label="FPS" value={iem.ratings.fps} />
                            <MiniStat label="Music" value={iem.ratings.music} />
                            <MiniStat label="Value" value={iem.ratings.value} />
                        </div>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-background/70">
                        <Image
                            src={iem.images.main}
                            alt={getIemFullName(iem)}
                            fill
                            sizes="(min-width: 768px) 32vw, 100vw"
                            className="object-cover object-right transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                    </div>
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
