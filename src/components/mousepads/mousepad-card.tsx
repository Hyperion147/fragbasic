import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  formatMousepadValue,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

export function MousepadCard({ pad }: { pad: Mousepad }) {
  return (
    <Link href={`/mousepads/${pad.slug}`} className="h-full">
      <Card className="group h-full border-border bg-card/95 p-5 transition-all duration-200 hover:border-primary/45 hover:shadow-lg hover:shadow-black/10">
        <div className="flex flex-wrap gap-2">
          <Badge className="text-black">{formatMousepadValue(pad.category)}</Badge>
          <Badge variant="outline">{formatMousepadValue(pad.surface)}</Badge>
          <Badge variant="outline">
            {formatMousepadValue(pad.availability.india)} in India
          </Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{pad.brand}</p>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {pad.name}
          </h2>
        </div>

        <div className="relative aspect-4/3 rounded-3xl border border-border bg-card">
          <Image
            src={pad.images.main}
            alt={getMousepadFullName(pad)}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 100vw"
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatPill label="Control" value={pad.feel.control} />
          <StatPill label="Speed" value={pad.feel.speed} />
          <StatPill label="Stopping" value={pad.feel.stoppingPower} />
          <StatPill label="Micro" value={pad.feel.microAdjustments} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{formatMousepadValue(pad.texture.feel)} feel</span>
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            View profile
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
