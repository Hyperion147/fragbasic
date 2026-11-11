"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ComparisonWriteInput } from "@/schemas/comparison";
import { usePadSlugOptions } from "./editorial-hooks";

type Props = {
  initialData: Record<string, unknown>;
  initialStatus: ComparisonWriteInput["status"];
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  onSubmit: (payload: ComparisonWriteInput) => void;
};

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function ComparisonEditor({
  initialData,
  initialStatus,
  submitLabel,
  pending = false,
  error,
  onSubmit,
}: Props) {
  const [slug, setSlug] = useState(text(initialData.slug));
  const [title, setTitle] = useState(text(initialData.title));
  const [leftSlug, setLeftSlug] = useState(text(initialData.leftSlug));
  const [rightSlug, setRightSlug] = useState(text(initialData.rightSlug));
  const [excerpt, setExcerpt] = useState(text(initialData.excerpt));
  const [tags, setTags] = useState(
    Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
  );
  const [status, setStatus] =
    useState<ComparisonWriteInput["status"]>(initialStatus);
  const [message, setMessage] = useState<string | null>(null);
  const pads = usePadSlugOptions();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!slug.trim() || !title.trim() || !leftSlug.trim() || !rightSlug.trim()) {
      setMessage("Slug, title, left pad, and right pad are required.");
      return;
    }
    if (leftSlug === rightSlug) {
      setMessage("Choose two different pads.");
      return;
    }

    setMessage(null);
    onSubmit({
      status,
      data: {
        slug: slug.trim(),
        title: title.trim(),
        leftSlug: leftSlug.trim(),
        rightSlug: rightSlug.trim(),
        excerpt: excerpt.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
    });
  }

  return (
    <form className="space-y-6" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Slug</span>
          <Input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            disabled={pending}
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <select
            className="h-10 w-full rounded-md bg-background/88 px-3 text-sm"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ComparisonWriteInput["status"])
            }
            disabled={pending}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Title</span>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={pending}
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Left pad slug</span>
          <Input
            list="pad-slug-options"
            value={leftSlug}
            onChange={(event) => setLeftSlug(event.target.value)}
            disabled={pending}
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Right pad slug</span>
          <Input
            list="pad-slug-options"
            value={rightSlug}
            onChange={(event) => setRightSlug(event.target.value)}
            disabled={pending}
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Excerpt</span>
        <textarea
          className="min-h-24 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          disabled={pending}
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Tags</span>
        <Input
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          disabled={pending}
          placeholder="Control, Tac FPS, Artisan"
        />
        <span className="block text-xs text-muted-foreground">
          Comma-separated.
        </span>
      </label>

      <datalist id="pad-slug-options">
        {(pads.data ?? []).map((pad) => (
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
          <Link href="/cms67/comparisons">Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
