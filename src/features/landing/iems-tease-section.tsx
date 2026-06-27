import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export function IemsTeaseSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card/40">
      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-2xl p-6 md:p-8">
          <Badge
            variant="outline"
            className="rounded-md bg-background/50 text-[10px] tracking-[0.5px]"
          >
            Coming next
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            In-Ear Monitors are coming to FRAGBASIC.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            The next expansion will rank in-ear monitors by imaging, footstep
            clarity, comfort, isolation, and tuning so FPS audio picks are easier
            to compare than a pile of forum tabs.
          </p>
        </div>

        <div className="relative min-h-[360px] translate-x-30 overflow-hidden">
          <Image
            src="/iem-teaser.png"
            alt="Upcoming IEM preview"
            fill
            className="-z-5 object-cover blur-[2px]"
          />
        </div>
      </div>
    </section>
  );
}
