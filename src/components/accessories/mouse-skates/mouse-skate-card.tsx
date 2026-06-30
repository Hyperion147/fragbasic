import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MouseSkateDot } from "@/components/accessories/mouse-skates/mouse-skate-dot";
import { Badge } from "@/components/ui/badge";
import {
  formatMouseSkateMaterial,
  formatMouseSkateRating,
  getMouseSkateFullName,
  getMouseSkateSurfaceFitClass,
} from "@/lib/accessories/mouse-skates";
import { cn } from "@/lib/utils";
import type { MouseSkate } from "@/types/accessory";

export function MouseSkateCard({ skate }: { skate: MouseSkate }) {
  return (
    <article className="flex h-full flex-col rounded-md soft-panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{skate.brand}</Badge>
          <Badge variant="outline">{formatMouseSkateMaterial(skate.material)}</Badge>
          <Badge variant="outline">{skate.shape}</Badge>
        </div>
        <MouseSkateDot skate={skate} size="sm" />
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{skate.series}</p>
        <p className="panel-title mt-1 text-foreground">
          {skate.name}
        </p>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {skate.communitySummary}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <StatPill label="Speed" value={skate.ratings.speed} />
        <StatPill label="Control" value={skate.ratings.control} />
        <StatPill label="Stop" value={skate.ratings.stoppingPower} />
      </div>

      <div className="mt-5">
        <p className="compact-label">
          Surface fit
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(skate.surfaceFit).map(([surface, fit]) => (
            <span
              key={surface}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] capitalize",
                getMouseSkateSurfaceFitClass(fit),
              )}
            >
              {surface}: {fit}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={`/accessories/mouse-skates/compare?left=${skate.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground"
          aria-label={`Compare ${getMouseSkateFullName(skate)}`}
        >
          Compare skate
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl soft-surface px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold">
        {formatMouseSkateRating(value)}
      </p>
    </div>
  );
}
