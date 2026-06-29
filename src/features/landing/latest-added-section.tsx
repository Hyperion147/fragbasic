import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { Badge } from "@/components/ui/badge";
import {
  formatEnvironmentLabel,
  formatFeelLabel,
  formatMousepadValue,
} from "@/lib/mousepads";
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
    <section className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge
            variant="outline"
            className="gap-2 rounded-md px-3 py-1 uppercase tracking-[0.18em] text-[11px] text-brand-hover"
          >
            <Sparkles className="size-3.5" />
            Latest added
          </Badge>

          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            {visiblePads.length === 1
              ? `${primaryPad.brand} ${primaryPad.name} joins the database.`
              : `${visiblePads.length} fresh community additions join the database.`}
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            {visiblePads.length === 1 ? (
              <>
                A {formatMousepadValue(primaryPad.category)} pad with{" "}
                {formatFeelLabel(primaryPad.feel.control, "control").toLowerCase()}{" "}
                control,{" "}
                {formatFeelLabel(
                  primaryPad.feel.stoppingPower,
                  "stoppingPower",
                ).toLowerCase()}{" "}
                stopping power, and{" "}
                {formatEnvironmentLabel(
                  primaryPad.environment.humidityResistance,
                ).toLowerCase()}{" "}
                humidity handling from the latest community submission.
              </>
            ) : (
              <>
                The newest batch covers{" "}
                {visiblePads
                  .map((pad) => `${pad.brand} ${pad.name}`)
                  .join(", ")}{" "}
                with fresh control, stopping power, and surface notes from
                community submissions.
              </>
            )}
          </p>
        </div>

        <Link
          href={`/mousepads/${primaryPad.slug}`}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground"
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
