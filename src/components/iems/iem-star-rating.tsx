import { Star } from "lucide-react";

const formatStars = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

export function IemStarRating({ score }: { score: number }) {
  if (!Number.isFinite(score) || score < 0 || score > 10) {
    return <p className="text-sm text-muted-foreground">Editorial rating pending</p>;
  }
  const stars = score / 2;

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span aria-hidden="true" className="inline-flex gap-0.5 text-iem-hover">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.round(Math.min(1, Math.max(0, stars - index)) * 100);
          return (
            <span key={index} className="relative size-4">
              <Star className="size-full" />
              <Star
                className="absolute inset-0 size-full fill-current"
                style={{ clipPath: `inset(0 ${100 - fill}% 0 0)` }}
              />
            </span>
          );
        })}
      </span>
      <span className="font-semibold tabular-nums">
        {formatStars.format(stars)}<span aria-hidden="true">/5</span><span className="sr-only"> out of 5 stars</span>
      </span>
      <a href="#iem-score-breakdown" className="text-muted-foreground underline underline-offset-4">
        FragBasic editorial rating
      </a>
    </p>
  );
}
