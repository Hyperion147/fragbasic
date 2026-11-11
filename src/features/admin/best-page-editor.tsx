"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BestPageWriteInput } from "@/schemas/best-page";
import { usePadSlugOptions } from "./editorial-hooks";

type Pick = { slug: string; label: string; reason: string; bestFor: string };

type Props = {
  initialData: Record<string, unknown>;
  initialStatus: BestPageWriteInput["status"];
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  onSubmit: (payload: BestPageWriteInput) => void;
};

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function lines(value: unknown) {
  return Array.isArray(value) ? value.map(String).join("\n") : "";
}

function list(value: unknown) {
  return Array.isArray(value) ? value.map(String).join(", ") : "";
}

function picks(value: unknown): Pick[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = (item ?? {}) as Record<string, unknown>;
    return {
      slug: text(record.slug),
      label: text(record.label),
      reason: text(record.reason),
      bestFor: text(record.bestFor),
    };
  });
}

export function BestPageEditor({
  initialData,
  initialStatus,
  submitLabel,
  pending = false,
  error,
  onSubmit,
}: Props) {
  const [slug, setSlug] = useState(text(initialData.slug));
  const [title, setTitle] = useState(text(initialData.title));
  const [eyebrow, setEyebrow] = useState(text(initialData.eyebrow));
  const [description, setDescription] = useState(text(initialData.description));
  const [badge, setBadge] = useState(text(initialData.badge));
  const [hero, setHero] = useState(text(initialData.hero));
  const [thesis, setThesis] = useState(text(initialData.thesis));
  const [story, setStory] = useState(lines(initialData.story));
  const [rules, setRules] = useState(lines(initialData.rules));
  const [keywords, setKeywords] = useState(list(initialData.keywords));
  const [pickRows, setPickRows] = useState<Pick[]>(picks(initialData.pickSlugs));
  const [status, setStatus] =
    useState<BestPageWriteInput["status"]>(initialStatus);
  const [message, setMessage] = useState<string | null>(null);
  const padOptions = usePadSlugOptions();

  function updatePick(index: number, patch: Partial<Pick>) {
    setPickRows((rows) =>
      rows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, ...patch } : row,
      ),
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!slug.trim() || !title.trim()) {
      setMessage("Slug and title are required.");
      return;
    }

    const invalidPick = pickRows.find(
      (pick) => !pick.slug.trim() || !pick.label.trim(),
    );
    if (invalidPick) {
      setMessage("Every pick needs a pad slug and a label.");
      return;
    }

    setMessage(null);
    onSubmit({
      status,
      data: {
        slug: slug.trim(),
        title: title.trim(),
        eyebrow: eyebrow.trim(),
        description: description.trim(),
        badge: badge.trim(),
        hero: hero.trim(),
        thesis: thesis.trim(),
        story: story
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        rules: rules
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        keywords: keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),
        pickSlugs: pickRows.map((pick) => ({
          slug: pick.slug.trim(),
          label: pick.label.trim(),
          reason: pick.reason.trim(),
          bestFor: pick.bestFor.trim(),
        })),
      },
    });
  }

  return (
    <form className="space-y-6" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Slug</span>
          <Input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            disabled={pending}
            required
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium">Title</span>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={pending}
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Eyebrow</span>
          <Input
            value={eyebrow}
            onChange={(event) => setEyebrow(event.target.value)}
            disabled={pending}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Badge</span>
          <Input
            value={badge}
            onChange={(event) => setBadge(event.target.value)}
            disabled={pending}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <select
            className="h-10 w-full rounded-md bg-background/88 px-3 text-sm"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as BestPageWriteInput["status"])
            }
            disabled={pending}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Description</span>
        <textarea
          className="min-h-20 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={pending}
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Hero</span>
        <textarea
          className="min-h-28 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
          value={hero}
          onChange={(event) => setHero(event.target.value)}
          disabled={pending}
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Thesis</span>
        <textarea
          className="min-h-24 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
          value={thesis}
          onChange={(event) => setThesis(event.target.value)}
          disabled={pending}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Story</span>
          <textarea
            className="min-h-48 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
            value={story}
            onChange={(event) => setStory(event.target.value)}
            disabled={pending}
          />
          <span className="block text-xs text-muted-foreground">
            One paragraph per line.
          </span>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Rules</span>
          <textarea
            className="min-h-48 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
            value={rules}
            onChange={(event) => setRules(event.target.value)}
            disabled={pending}
          />
          <span className="block text-xs text-muted-foreground">
            One rule per line.
          </span>
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Keywords</span>
        <Input
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          disabled={pending}
          placeholder="best control mousepad, tac fps"
        />
        <span className="block text-xs text-muted-foreground">
          Comma-separated.
        </span>
      </label>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Picks</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Each pick must reference a pad slug from mousepads or glasspads.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setPickRows((rows) => [
                ...rows,
                { slug: "", label: "", reason: "", bestFor: "" },
              ])
            }
            disabled={pending}
          >
            Add pick
          </Button>
        </div>

        {pickRows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No picks yet.</p>
        ) : (
          <div className="space-y-4">
            {pickRows.map((pick, index) => (
              <div
                key={index}
                className="space-y-3 rounded-md border border-border/80 bg-card/50 p-4"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium">Pad slug</span>
                    <Input
                      list="best-page-pad-options"
                      value={pick.slug}
                      onChange={(event) =>
                        updatePick(index, { slug: event.target.value })
                      }
                      disabled={pending}
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium">Label</span>
                    <Input
                      value={pick.label}
                      onChange={(event) =>
                        updatePick(index, { label: event.target.value })
                      }
                      disabled={pending}
                    />
                  </label>
                </div>
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Reason</span>
                  <textarea
                    className="min-h-20 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
                    value={pick.reason}
                    onChange={(event) =>
                      updatePick(index, { reason: event.target.value })
                    }
                    disabled={pending}
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Best for</span>
                  <Input
                    value={pick.bestFor}
                    onChange={(event) =>
                      updatePick(index, { bestFor: event.target.value })
                    }
                    disabled={pending}
                  />
                </label>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() =>
                      setPickRows((rows) =>
                        rows.filter((_, rowIndex) => rowIndex !== index),
                      )
                    }
                    disabled={pending}
                  >
                    Remove pick
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <datalist id="best-page-pad-options">
        {(padOptions.data ?? []).map((pad) => (
          <option key={pad.slug} value={pad.slug}>
            {pad.name}
          </option>
        ))}
      </datalist>

      {message || error ? (
        <p className="text-sm text-destructive" role="alert">
          {message ?? error}
        </p>
      ) : null}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/cms67/best-pages">Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
