"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Boxes,
  CornerDownLeft,
  Headphones,
  Search,
  Sparkles,
  SquareStack,
  Trophy,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  buildSearchIndex,
  normalizeSearchText,
  searchAndGroup,
  type SearchGroup,
  type SearchItem,
  type SearchKind,
} from "@/lib/search";

const KIND_ICONS: Record<SearchKind, typeof Boxes> = {
  mousepad: Boxes,
  glasspad: SquareStack,
  iem: Headphones,
  skate: Sparkles,
  guide: Trophy,
  comparison: CornerDownLeft,
};

const QUICK_LINKS = [
  { label: "Browse mousepads", href: "/mousepads" },
  { label: "Browse glasspads", href: "/mousepads/glasspads" },
  { label: "Browse IEMs", href: "/iems" },
  { label: "Browse skates", href: "/accessories/mouse-skates/browse" },
  { label: "Best guides", href: "/best" },
  { label: "Universal compare", href: "/mousepads/compare/universal" },
] as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedTitle({ title, query }: { title: string; query: string }) {
  const tokens = normalizeSearchText(query)
    .split(" ")
    .filter((token) => token.length > 1);
  const pattern = tokens.map(escapeRegExp).join("|");

  if (!pattern) {
    return <>{title}</>;
  }

  const parts = title.split(new RegExp(`(${pattern})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark
            key={index}
            className="bg-transparent font-semibold text-brand-hover"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export function UniversalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildSearchIndex(), []);
  const deferredQuery = useDeferredValue(query);
  const groups: SearchGroup[] = useMemo(
    () => searchAndGroup(index, deferredQuery),
    [index, deferredQuery],
  );
  const flatItems: SearchItem[] = useMemo(
    () => groups.flatMap((group) => group.items),
    [groups],
  );
  const hasQuery = deferredQuery.trim().length > 0;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-search-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function goTo(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((previous) =>
        flatItems.length === 0 ? 0 : (previous + 1) % flatItems.length,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((previous) =>
        flatItems.length === 0
          ? 0
          : (previous - 1 + flatItems.length) % flatItems.length,
      );
    } else if (event.key === "Enter") {
      const item = flatItems[activeIndex];
      if (item) {
        event.preventDefault();
        goTo(item.href);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  let runningIndex = -1;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search FragBasic"
        className="hidden h-9 items-center gap-2 rounded-md border border-transparent bg-background/60 px-3 text-sm text-muted-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] transition-colors hover:text-foreground md:flex lg:w-56"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Search FragBasic</span>
        <kbd className="hidden shrink-0 rounded border border-white/10 bg-white/4 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline-block">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search FragBasic"
        className="flex size-9 items-center justify-center rounded-md border border-transparent bg-background/60 text-muted-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] transition-colors hover:text-foreground md:hidden"
      >
        <Search className="size-4" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search FragBasic"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/12 bg-[#101014] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/8 px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pads, IEMs, skates, guides…"
                aria-label="Search FragBasic"
                aria-expanded="true"
                aria-controls="fragbasic-search-results"
                aria-activedescendant={
                  flatItems[activeIndex]
                    ? `search-option-${flatItems[activeIndex].id}`
                    : undefined
                }
                role="combobox"
                autoComplete="off"
                spellCheck={false}
                className="h-13 flex-1 bg-transparent py-3.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear search"
                  className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
              <kbd className="shrink-0 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              id="fragbasic-search-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-[50vh] overflow-y-auto p-2"
            >
              {flatItems.length > 0 ? (
                groups.map((group) => (
                  <div key={group.kind} className="mt-1 first:mt-0">
                    <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {group.label}
                    </p>
                    {group.items.map((item) => {
                      runningIndex += 1;
                      const itemIndex = runningIndex;
                      const isActive = itemIndex === activeIndex;
                      const Icon = KIND_ICONS[item.kind];
                      return (
                        <button
                          key={item.id}
                          id={`search-option-${item.id}`}
                          data-search-index={itemIndex}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(itemIndex)}
                          onClick={() => goTo(item.href)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                            isActive ? "bg-brand/15" : "bg-transparent",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-md border border-white/8 bg-white/[0.03]",
                              isActive ? "text-brand-hover" : "text-muted-foreground",
                            )}
                          >
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-foreground">
                              <HighlightedTitle
                                title={item.title}
                                query={deferredQuery}
                              />
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                              {item.subtitle}
                            </span>
                          </span>
                          {isActive ? (
                            <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : hasQuery ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-medium text-foreground">
                    No results for &ldquo;{deferredQuery.trim()}&rdquo;
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Try a brand, product name, or category like glass, control,
                    or planar.
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Jump to
                  </p>
                  <div className="grid gap-1 sm:grid-cols-2">
                    {QUICK_LINKS.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-brand/15 hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-brand-hover" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden items-center gap-4 border-t border-white/8 px-4 py-2.5 text-[11px] text-muted-foreground sm:flex">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 font-mono text-[10px]">
                  ↑↓
                </kbd>
                navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 font-mono text-[10px]">
                  ↵
                </kbd>
                open
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 font-mono text-[10px]">
                  esc
                </kbd>
                close
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
