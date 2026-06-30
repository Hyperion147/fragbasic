import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatIemDriverType,
  formatIemPrice,
  formatIemRating,
  formatIemSoundSignature,
  getIemFullName,
  getIemScoreTone,
} from "@/lib/iems";
import type { Iem } from "@/types/iem";

type Props = {
  iems: Iem[];
};

export function LatestAddedIemsSection({ iems }: Props) {
  const visibleIems = iems.slice(0, 3);
  const primaryIem = visibleIems[0];

  if (!primaryIem) {
    return null;
  }

  return (
    <section className="space-y-5 md:space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge
            variant="outline"
            className="gap-2 rounded-md px-3 py-1 uppercase tracking-[0.14em] text-[10px] text-brand-hover sm:text-[11px] sm:tracking-[0.18em]"
          >
            <Headphones className="size-3.5" />
            Latest IEMs
          </Badge>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:mt-5 md:text-6xl">
            {visibleIems.length === 1
              ? `${primaryIem.brand} ${primaryIem.name} joins the IEM database.`
              : `${visibleIems.length} fresh IEM additions join the database.`}
          </h2>
        </div>

        <Link
          href={`/iems/${primaryIem.slug}`}
          className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground"
        >
          Open latest IEM
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {visibleIems.map((iem) => (
          <LatestIemCard key={iem.slug} iem={iem} />
        ))}
      </div>
    </section>
  );
}

function LatestIemCard({ iem }: { iem: Iem }) {
  return (
    <Link
      href={`/iems/${iem.slug}`}
      className="group grid overflow-hidden rounded-xl border border-border bg-card/80 transition-colors hover:border-brand-hover/60 md:grid-cols-[minmax(180px,0.42fr)_1fr]"
    >
      <div className="relative min-h-[220px] bg-background/70 md:min-h-full">
        <Image
          src={iem.images.main}
          alt={getIemFullName(iem)}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 34vw, 100vw"
          className="object-cover object-right transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <Badge className="absolute left-3 top-3 rounded-md bg-brand-hover text-[10px] uppercase tracking-[0.16em] text-black">
          Latest added
        </Badge>
      </div>

      <div className="flex min-w-0 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <Badge className="text-black">
            {formatIemSoundSignature(iem.soundSignature)}
          </Badge>
          <Badge variant="outline">{formatIemDriverType(iem.driverType)}</Badge>
          <Badge variant="outline">{formatIemPrice(iem)}</Badge>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {iem.brand}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {iem.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-brand-hover">
            {iem.soundProfile.label}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {iem.communitySummary}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <LatestIemStat label="FPS" value={iem.ratings.fps} />
          <LatestIemStat label="Music" value={iem.ratings.music} />
          <LatestIemStat label="Value" value={iem.ratings.value} />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {getIemScoreTone(iem.ratings.fragbasic)}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {formatIemRating(iem.ratings.fragbasic)}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-hover">
            View IEM
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LatestIemStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-background/70 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold text-foreground">
        {formatIemRating(value)}
      </p>
    </div>
  );
}
