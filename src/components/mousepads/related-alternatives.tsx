import Link from "next/link";
import { ArrowRight, Gauge, Scale, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  formatFeelLabel,
  formatMousepadValue,
  getDefaultColorway,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

export type RelatedAlternativeGroup = {
  label: "Similar feeling" | "More control" | "More speed";
  description: string;
  mousepads: Mousepad[];
};

type Props = {
  source: Mousepad;
  groups: RelatedAlternativeGroup[];
};

const groupIcons = {
  "Similar feeling": Scale,
  "More control": SlidersHorizontal,
  "More speed": Gauge,
} as const;

export function RelatedAlternatives({ source, groups }: Props) {
  const visibleGroups = groups.filter((group) => group.mousepads.length > 0);

  if (visibleGroups.length === 0) {
    return null;
  }

  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <div>
        <p className="text-sm text-muted-foreground">Related alternatives</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          Around {source.name}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Curated by feel: closest swaps first, then cleaner moves toward
          control or speed.
        </p>
      </div>

      {source.relatedAlternatives?.notes ? (
        <p className="mt-4 rounded-lg border border-[color:color-mix(in_srgb,var(--brand-hover)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--brand)_8%,transparent)] px-3 py-2 text-sm leading-6 text-muted-foreground">
          {source.relatedAlternatives.notes}
        </p>
      ) : null}

      <div className="mt-5 space-y-5">
        {visibleGroups.map((group) => {
          const Icon = groupIcons[group.label];

          return (
            <section key={group.label}>
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[color:color-mix(in_srgb,var(--brand-hover)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--brand)_10%,transparent)] text-brand-hover">
                  <Icon className="size-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {group.label}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {group.mousepads.map((mousepad) => (
                  <RelatedAlternativeItem
                    key={`${group.label}-${mousepad.slug}`}
                    mousepad={mousepad}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Card>
  );
}

function RelatedAlternativeItem({ mousepad }: { mousepad: Mousepad }) {
  const color = getDefaultColorway(mousepad).color;

  return (
    <Link
      href={`/mousepads/${mousepad.slug}`}
      className="group block rounded-lg border border-border bg-background/70 p-3 transition-colors hover:border-[color:color-mix(in_srgb,var(--brand-hover)_42%,transparent)] hover:bg-background"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: color }}
            />
            <p className="truncate text-sm font-medium text-foreground">
              {getMousepadFullName(mousepad)}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {formatMousepadValue(mousepad.category)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatFeelLabel(mousepad.feel.control, "control")} control
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatFeelLabel(mousepad.feel.speed, "speed")} glide
            </Badge>
          </div>
        </div>

        <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
