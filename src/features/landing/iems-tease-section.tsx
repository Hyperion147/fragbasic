import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function IemsTeaseSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card/40">
      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-2xl p-6 md:p-8">
          <Badge
            variant="outline"
            className="rounded-md bg-background/50 text-[10px] tracking-[0.5px]"
          >
            New vertical
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            IEMs are now part of FRAGBASIC.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Browse in-ear monitors by imaging, footstep clarity, comfort,
            isolation, and tuning so FPS audio picks are easier to compare than
            a pile of forum tabs.
          </p>
          <Button asChild className="mt-6">
            <Link href="/iems">
              Open IEM database
              <ArrowRight className="size-4" />
            </Link>
          </Button>
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
