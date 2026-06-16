import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export function SleevesTeaseSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-2xl p-6 md:p-8">
          <Badge
            variant="outline"
            className="rounded-md bg-background/50 text-[10px] tracking-[0.5px]"
          >
            Coming next
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Gaming arm sleeves are coming to FRAGBASIC.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            The next expansion will rank sleeves by glide feel, comfort, and
            consistency, then map them against mousepad compatibility so you can
            find combos that actually work together.
          </p>
        </div>

        <div className="relative min-h-[360px] translate-x-30 overflow-hidden">
          <Image
            src="/teaser.png"
            alt="Upcoming sleeves preview"
            fill
            className="-z-5 object-cover blur-[2px]"
          />
        </div>
      </div>
    </section>
  );
}
