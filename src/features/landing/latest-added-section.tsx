import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, Grid2X2, Sparkles } from "lucide-react";

import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { Badge } from "@/components/ui/badge";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  pads: Mousepad[];
};

export function LatestAddedSection({ pads }: Props) {
  const visiblePads = pads.slice(0, 3);
  const primaryPad = visiblePads[0];

  if (!primaryPad) {
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
            <Sparkles className="size-3.5" />
            Latest added
          </Badge>

          <h2 className="mt-3 max-w-5xl text-balance text-2xl font-semibold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:mt-5 md:text-5xl">
            <span className="sm:hidden">Fresh mousepads.</span>
            <span className="hidden sm:inline">
              {visiblePads.length === 1
                ? `${primaryPad.brand} ${primaryPad.name} joins the database.`
                : `${visiblePads.length} fresh community additions join the database.`}
            </span>
          </h2>
        </div>

        <Link
          href={`/mousepads/${primaryPad.slug}`}
          className="hidden w-fit shrink-0 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground sm:inline-flex"
        >
          Open latest profile
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/8 bg-white/8 sm:hidden">
        {visiblePads.map((pad) => (
          <Link
            key={pad.slug}
            href={`/mousepads/${pad.slug}`}
            className="group flex min-h-44 min-w-0 flex-col bg-[#0d0d11] p-3"
          >
            <div className="relative h-20 w-full">
              <Image
                src={pad.images.main}
                alt={`${pad.brand} ${pad.name}`}
                fill
                sizes="45vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-auto truncate text-[9px] font-medium uppercase tracking-[.12em] text-brand-hover">
              {pad.brand}
            </p>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight">{pad.name}</h3>
          </Link>
        ))}
        {visiblePads.length < 2 ? (
          <Link
            href="/best"
            className="flex min-h-44 flex-col justify-between bg-[#17131f] p-4 text-white"
          >
            <Sparkles className="ml-auto size-5 text-brand-hover" />
            <span className="max-w-[8ch] text-base font-semibold leading-tight">See best picks</span>
          </Link>
        ) : null}
        {visiblePads.length < 3 ? (
          <Link
            href="/mousepads/compare"
            className="flex min-h-44 flex-col justify-between bg-[#17131f] p-4 text-white"
          >
            <GitCompareArrows className="ml-auto size-5 text-brand-hover" />
            <span className="max-w-[8ch] text-base font-semibold leading-tight">Compare pads</span>
          </Link>
        ) : null}
        <Link
          href="/mousepads"
          className="flex min-h-44 flex-col justify-between bg-brand p-4 text-white"
        >
          <Grid2X2 className="ml-auto size-5" />
          <span className="max-w-[8ch] text-base font-semibold leading-tight">Browse all pads</span>
        </Link>
      </div>

      <div className="hidden gap-4 sm:grid md:grid-cols-2 xl:grid-cols-3">
        {visiblePads.map((pad) => (
          <MousepadCard
            key={pad.slug}
            pad={pad}
            compact
            isLatestAdded
          />
        ))}
      </div>
    </section>
  );
}
