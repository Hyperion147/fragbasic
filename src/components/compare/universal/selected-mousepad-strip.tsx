"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTooltip } from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatFeelLabel,
  formatMousepadValue,
  getDefaultColorway,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
  onRemove: (slug: string) => void;
};

export function SelectedMousepadStrip({ mousepads, onRemove }: Props) {
  return (
    <Card className="border-border bg-card/90">
      <CardHeader className="pb-3">
        <CardTitle className="panel-title">
          Current comparison set
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {mousepads.map((mousepad) => {
            const colorway = getDefaultColorway(mousepad);

            return (
              <div
                key={mousepad.slug}
                className="flex min-w-[245px] items-start justify-between gap-3 rounded-md border border-border bg-background/80 px-3 py-3 md:min-w-0 md:px-4 md:py-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: colorway.color }}
                    />
                    <p className="truncate text-sm font-medium text-foreground md:text-base">
                      {getMousepadFullName(mousepad)}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 md:hidden">
                    <Badge variant="outline">
                      {formatMousepadValue(mousepad.category)}
                    </Badge>
                    <Badge variant="outline">
                      {formatFeelLabel(mousepad.feel.speed, "speed")} glide
                    </Badge>
                  </div>

                  <div className="mt-3 hidden flex-wrap gap-2 md:flex">
                    <Badge variant="outline">
                      {formatMousepadValue(mousepad.category)}
                    </Badge>
                    <Badge variant="outline">
                      {formatFeelLabel(mousepad.feel.speed, "speed")} glide
                    </Badge>
                    <Badge variant="outline">
                      {formatFeelLabel(mousepad.feel.control, "control")} control
                    </Badge>
                  </div>
                </div>

                <IconTooltip label={`Remove ${getMousepadFullName(mousepad)}`} side="left">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onRemove(mousepad.slug)}
                    aria-label={`Remove ${getMousepadFullName(mousepad)}`}
                  >
                    <X className="size-4" />
                  </Button>
                </IconTooltip>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
