import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { Badge } from "@/components/ui/badge";
import { formatMousepadValue } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  pads: Mousepad[];
};

export function LatestAddedSection({ pads }: Props) {
  const primaryPad = pads[0];

  if (!primaryPad) {
    return null;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <Badge
          variant="outline"
          className="gap-2 rounded-md px-3 py-1 uppercase tracking-[0.18em] text-[11px] text-brand-hover"
        >
          <Sparkles className="size-3.5" />
          Latest added
        </Badge>

        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          {pads.length === 1
            ? `${primaryPad.brand} ${primaryPad.name} joins the database.`
            : `${pads.length} fresh community additions join the database.`}
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {pads.length === 1 ? (
            <>
              A {formatMousepadValue(primaryPad.category)} pad with{" "}
              {primaryPad.feel.control}/10 control,{" "}
              {primaryPad.feel.stoppingPower}/10 stopping power, and{" "}
              {primaryPad.environment.humidityResistance}/10 humidity resistance
              from the latest community submission.
            </>
          ) : (
            <>
              The newest batch covers{" "}
              {pads.map((pad) => `${pad.brand} ${pad.name}`).join(", ")} with
              fresh control, stopping power, and surface notes from community
              submissions.
            </>
          )}
        </p>

        <Link
          href={`/mousepads/${primaryPad.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground"
        >
          Open latest profile
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pads.map((pad) => (
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
