import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  href: string;
  action: string;
};

export function SectionHeader({ title, href, action }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <Button variant="ghost" size="sm" asChild className="text-sm">
        <Link href={href}>
          {action}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
