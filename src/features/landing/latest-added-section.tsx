import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { Badge } from "@/components/ui/badge";
import { formatMousepadValue } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  pad: Mousepad;
};

export function LatestAddedSection({ pad }: Props) {
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
          {pad.brand} {pad.name} joins the database.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          A {formatMousepadValue(pad.category)} pad with{" "}
          {pad.feel.control}/10 control, {pad.feel.stoppingPower}/10 stopping
          power, and {pad.environment.humidityResistance}/10 humidity
          resistance from the latest community submission.
        </p>

        <Link
          href={`/mousepads/${pad.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-hover transition-colors hover:text-foreground"
        >
          Open profile
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <MousepadCard pad={pad} compact />
    </section>
  );
}
