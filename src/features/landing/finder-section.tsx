import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const games = ["Valorant", "CS2", "Apex", "More"] as const;
const preferences = ["More Control", "Balanced", "More Speed"] as const;

const gameIcons = {
  Valorant: "/games-icon/valo-icon.png",
  CS2: "/games-icon/cs2-icon.png",
  Apex: "/games-icon/apex-icon.png",
  More: "/games-icon/more-icon.png",
} as const;

const preferenceIcons = {
  "More Control": "/games-icon/stability.png",
  Balanced: "/games-icon/cruise-control.png",
  "More Speed": "/games-icon/speedometer.png",
} as const;

const homeFinderCtas = [
  {
    title: "Tracking-first setup",
    body: "Jump into the full finder with fast-game context.",
    image: "/mousepads/artisan/raiden-orange.png",
    href: buildFinderRedirectHref({
      game: "Apex",
      preference: "More Speed",
    }),
  },
  {
    title: "Balanced all-rounder",
    body: "Start from the safest middle-ground finder path.",
    image: "/mousepads/lgg/saturn-blue.png",
    href: buildFinderRedirectHref({ game: "CS2", preference: "Balanced" }),
  },
  {
    title: "Tac-FPS control bias",
    body: "Open the real finder with a steadier control lean.",
    image: "/mousepads/artisan/zero-dai-dai-orange.png",
    href: buildFinderRedirectHref({
      game: "Valorant",
      preference: "More Control",
    }),
  },
] as const;

export function FinderSection() {
  return (
    <section className="grid gap-6 rounded-2xl border border-border bg-card/40 p-6 md:p-8 lg:grid-cols-[1.05fr_1fr_1fr_1fr]">
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Not sure what to choose?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Answer a few quick questions and get mousepads that fit your
            playstyle.
          </p>
        </div>
      </div>

      <FinderStep label="Step 1" title="What do you play?">
        {games.map((game) => (
          <FinderButton
            key={game}
            label={game}
            iconSrc={gameIcons[game]}
            href={buildFinderRedirectHref({ game })}
          />
        ))}
      </FinderStep>

      <FinderStep label="Step 2" title="What do you prefer?">
        {preferences.map((preference) => (
          <FinderButton
            key={preference}
            label={preference}
            iconSrc={preferenceIcons[preference]}
            href={buildFinderRedirectHref({ preference })}
          />
        ))}
      </FinderStep>

      <FinderStep label="Step 3" title="Open the real finder">
        <Button asChild className="mt-6 w-fit">
          <Link href="/mousepads/finder">
            Find your mousepad
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </FinderStep>
    </section>
  );
}

function FinderStep({
  label,
  title,
  children,
}: {
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Badge
        variant="outline"
        className="rounded-md text-[10px] tracking-[0.5px]"
      >
        {label}
      </Badge>
      {title ? (
        <h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function FinderButton({
  label,
  iconSrc,
  href,
}: {
  label: string;
  iconSrc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 text-center"
    >
      <span className="flex size-16 items-center justify-center rounded-full border border-border bg-background/70 transition-all duration-200 group-hover:border-foreground/25 group-hover:bg-background">
        <Image
          src={iconSrc}
          alt=""
          width={44}
          height={44}
          className="h-8 w-8 object-contain opacity-80 transition-opacity duration-200 invert group-hover:opacity-95"
        />
      </span>
      <span className="text-[11px] leading-none text-muted-foreground transition-colors group-hover:text-foreground">
        {label}
      </span>
    </Link>
  );
}

function buildFinderRedirectHref({
  game,
  preference,
}: {
  game?: (typeof games)[number];
  preference?: (typeof preferences)[number];
}) {
  const params = new URLSearchParams();

  if (game) {
    params.set("game", game);
  }

  if (preference) {
    params.set("preference", preference);
  }

  const query = params.toString();
  return query ? `/mousepads/finder?${query}` : "/mousepads/finder";
}
