import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDefaultColorway, getMousepadFullName } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  control: Mousepad;
  speed: Mousepad;
  value: Mousepad;
};

export function BrandBestPicks({ control, speed, value }: Props) {
  return (
    <section className="space-y-4">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight">Best picks</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Quick shortcuts for the three most common brand-level questions:
          which pad controls best, which one moves fastest, and which one gives
          the strongest overall return for the price.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <PickCard
          label="Best for control"
          mousepad={control}
          metric={`${control.feel.control}/10 control`}
        />
        <PickCard
          label="Best for speed"
          mousepad={speed}
          metric={`${speed.feel.speed}/10 speed`}
        />
        <PickCard
          label="Best for value"
          mousepad={value}
          metric={
            value.price.inr
              ? `Rs ${value.price.inr.toLocaleString("en-IN")}`
              : "Price varies"
          }
        />
      </div>
    </section>
  );
}

function PickCard({
  label,
  mousepad,
  metric,
}: {
  label: string;
  mousepad: Mousepad;
  metric: string;
}) {
  const color = getDefaultColorway(mousepad).color;

  return (
    <Link href={`/mousepads/${mousepad.slug}`} className="h-full">
      <Card className="h-full border-border bg-card/95 transition-all duration-200 hover:border-primary/45 hover:shadow-lg hover:shadow-black/10">
        <CardHeader>
          <Badge variant="outline" className="w-fit">
            {label}
          </Badge>
          <CardTitle className="mt-4 text-2xl tracking-tight">
            {mousepad.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{mousepad.brand}</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-border bg-background/75 p-4">
            <div className="flex items-center gap-3">
              <span
                className="size-3 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
              <p className="font-medium text-foreground">
                {getMousepadFullName(mousepad)}
              </p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{metric}</p>
          </div>

          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
            View mousepad
            <ArrowRight className="size-4" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
