import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  formatMousepadValue,
  getDefaultColorway,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  source: Mousepad;
  mousepads: Mousepad[];
};

export function SimilarMousepads({ source, mousepads }: Props) {
  if (mousepads.length === 0) {
    return null;
  }

  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Similar pads</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Similar to {source.name}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            These picks are ranked by category match, feel closeness, and
            overlap in recommended games.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {mousepads.map((mousepad) => {
          const color = getDefaultColorway(mousepad).color;

          return (
            <Card
              key={mousepad.slug}
              className="border-border bg-background/75 p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="size-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
                <p className="font-medium text-foreground">
                  {getMousepadFullName(mousepad)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="text-black">
                  {formatMousepadValue(mousepad.category)}
                </Badge>
                <Badge variant="outline">{mousepad.feel.control}/10 control</Badge>
                <Badge variant="outline">{mousepad.feel.speed}/10 speed</Badge>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Best for {mousepad.recommendedFor.games.slice(0, 2).map(formatMousepadValue).join(", ")}.
              </p>

              <Button variant="ghost" className="px-0" asChild>
                <Link href={`/mousepads/${mousepad.slug}`}>
                  View mousepad
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
