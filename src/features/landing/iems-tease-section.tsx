import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTooltip } from "@/components/ui/tooltip";

export function IemsTeaseSection() {
  return (
    <section className="relative overflow-hidden rounded-lg bg-card/40 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent)]">
      <div className="relative grid gap-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-2xl p-5 sm:p-6 md:p-8">
          <Badge
            variant="outline"
            className="rounded-md bg-background/50 text-[10px] tracking-[0.5px]"
          >
            New vertical
          </Badge>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:mt-5 md:text-4xl">
            IEMs are now part of FRAGBASIC.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
            Browse in-ear monitors by imaging, footstep clarity, comfort,
            isolation, and tuning so FPS audio picks are easier to compare than
            a pile of forum tabs.
          </p>
          <IconTooltip label="Browse IEMs by tuning, imaging, clarity, value, and price.">
            <Button asChild className="mt-5 w-full sm:mt-6 sm:w-auto">
              <Link href="/iems">
                Open IEM database
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </IconTooltip>
        </div>

        <div className="relative min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[360px] lg:translate-x-12 xl:translate-x-30">
          <Image
            src="/iem-teaser.png"
            alt="Upcoming IEM preview"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="-z-5 object-cover object-center blur-[1px] lg:blur-[2px]"
          />
        </div>
      </div>
    </section>
  );
}
