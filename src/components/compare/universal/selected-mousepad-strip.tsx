"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
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
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          Current comparison set
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {mousepads.map((mousepad) => {
            const colorway = getDefaultColorway(mousepad);

            return (
              <div
                key={mousepad.slug}
                className="flex items-start justify-between gap-4 rounded-3xl border border-border bg-background/80 px-4 py-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: colorway.color }}
                    />
                    <p className="truncate font-medium text-foreground">
                      {getMousepadFullName(mousepad)}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {formatMousepadValue(mousepad.category)}
                    </Badge>
                    <Badge variant="outline">
                      {mousepad.feel.speed}/10 speed
                    </Badge>
                    <Badge variant="outline">
                      {mousepad.feel.control}/10 control
                    </Badge>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onRemove(mousepad.slug)}
                  aria-label={`Remove ${getMousepadFullName(mousepad)}`}
                >
                  <X className="size-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
