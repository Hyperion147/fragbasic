import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

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

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:mt-5 md:text-6xl">
            {visiblePads.length === 1
              ? `${primaryPad.brand} ${primaryPad.name} joins the database.`
              : `${visiblePads.length} fresh community additions join the database.`}
          </h2>
        </div>

        <Link
          href={`/mousepads/${primaryPad.slug}`}
          className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground"
        >
          Open latest profile
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
