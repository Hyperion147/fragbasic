import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
};

type LinkGroup = {
  title: string;
  links: LinkItem[];
};

export function PopularSearches({
  title = "Popular searches",
  description,
  groups,
}: {
  title?: string;
  description?: string;
  groups: LinkGroup[];
}) {
  return (
    <section aria-label={title} className="soft-panel p-5 sm:p-6">
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p className="body-copy mt-3 max-w-3xl">{description}</p>
      ) : null}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-foreground">
              {group.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-start gap-1.5 text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
