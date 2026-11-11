"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GuideWriteInput } from "@/schemas/guide";

type Section = {
  heading: string;
  paragraphs: string;
  bullets: string;
};

type Props = {
  initialData: Record<string, unknown>;
  initialStatus: GuideWriteInput["status"];
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  onSubmit: (payload: GuideWriteInput) => void;
};

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function lines(value: unknown) {
  return Array.isArray(value) ? value.map(String).join("\n") : "";
}

function list(value: unknown) {
  return Array.isArray(value) ? value.map(String).join("\n") : "";
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseList(value: string) {
  return value
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function sections(value: unknown): Section[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = (item ?? {}) as Record<string, unknown>;
    return {
      heading: text(record.heading),
      paragraphs: lines(record.paragraphs),
      bullets: lines(record.bullets),
    };
  });
}

export function GuideEditor({
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
  const [description, setDescription] = useState(
    text(initialData.description),
  );
  const [category, setCategory] = useState(text(initialData.category));
  const [readingTime, setReadingTime] = useState(
    numberValue(initialData.readingTime, 5),
  );
  const [publishedAt, setPublishedAt] = useState(
    text(initialData.publishedAt) || new Date().toISOString().slice(0, 10),
  );
  const [intro, setIntro] = useState(text(initialData.intro));
  const [sectionRows, setSectionRows] = useState<Section[]>(
    sections(initialData.sections),
  );
  const [takeaways, setTakeaways] = useState(lines(initialData.takeaways));
  const [relatedPadSlugs, setRelatedPadSlugs] = useState(
    list(initialData.relatedPadSlugs),
  );
  const [keywords, setKeywords] = useState(list(initialData.keywords));
  const [status, setStatus] = useState<GuideWriteInput["status"]>(
    initialStatus,
  );
  const [message, setMessage] = useState<string | null>(null);

  function updateSection(index: number, patch: Partial<Section>) {
    setSectionRows((rows) =>
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
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.trim())) {
      setMessage("Slug must be lowercase kebab-case.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt.trim())) {
      setMessage("Published date must use YYYY-MM-DD.");
      return;
    }

    const parsedSections = sectionRows
      .map((section) => ({
        heading: section.heading.trim(),
        paragraphs: parseLines(section.paragraphs),
        bullets: parseLines(section.bullets),
      }))
      .filter((section) => section.heading || section.paragraphs.length > 0);

    if (parsedSections.length === 0) {
      setMessage("Add at least one section.");
      return;
    }
    const invalidSection = parsedSections.find(
      (section) => !section.heading || section.paragraphs.length === 0,
    );
    if (invalidSection) {
      setMessage("Every section needs a heading and at least one paragraph.");
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
        category: category.trim(),
        readingTime: Math.max(1, Math.round(readingTime)),
        publishedAt: publishedAt.trim(),
        intro: intro.trim(),
        sections: parsedSections,
        takeaways: parseLines(takeaways),
        relatedPadSlugs: parseLines(relatedPadSlugs),
        keywords: parseList(keywords),
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Eyebrow</span>
          <Input
            value={eyebrow}
            onChange={(event) => setEyebrow(event.target.value)}
            disabled={pending}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Category</span>
          <Input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={pending}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Reading time (min)</span>
          <Input
            type="number"
            min={1}
            max={60}
            value={readingTime}
            onChange={(event) =>
              setReadingTime(Number(event.target.value) || 1)
            }
            disabled={pending}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <select
            className="h-10 w-full rounded-md bg-background/88 px-3 text-sm"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as GuideWriteInput["status"])
            }
            disabled={pending}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Published date</span>
          <Input
            type="date"
            value={publishedAt}
            onChange={(event) => setPublishedAt(event.target.value)}
            disabled={pending}
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium">Keywords</span>
          <Input
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            disabled={pending}
            placeholder="control vs speed mousepad, stopping power"
          />
          <span className="block text-xs text-muted-foreground">
            Comma-separated.
          </span>
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
        <span className="block text-xs text-muted-foreground">
          Used for the guide card and meta description.
        </span>
      </label>

      <label className="space-y-2 text-sm">
        <span className="font-medium">Intro</span>
        <textarea
          className="min-h-28 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
          value={intro}
          onChange={(event) => setIntro(event.target.value)}
          disabled={pending}
        />
      </label>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Sections</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Each section renders one heading followed by its paragraphs.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setSectionRows((rows) => [
                ...rows,
                { heading: "", paragraphs: "", bullets: "" },
              ])
            }
            disabled={pending}
          >
            Add section
          </Button>
        </div>

        {sectionRows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sections yet.</p>
        ) : (
          <div className="space-y-4">
            {sectionRows.map((section, index) => (
              <div
                key={index}
                className="space-y-3 rounded-md border border-border/80 bg-card/50 p-4"
              >
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Heading</span>
                  <Input
                    value={section.heading}
                    onChange={(event) =>
                      updateSection(index, { heading: event.target.value })
                    }
                    disabled={pending}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium">Paragraphs</span>
                    <textarea
                      className="min-h-32 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
                      value={section.paragraphs}
                      onChange={(event) =>
                        updateSection(index, {
                          paragraphs: event.target.value,
                        })
                      }
                      disabled={pending}
                    />
                    <span className="block text-xs text-muted-foreground">
                      One paragraph per line.
                    </span>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium">Bullets (optional)</span>
                    <textarea
                      className="min-h-32 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
                      value={section.bullets}
                      onChange={(event) =>
                        updateSection(index, { bullets: event.target.value })
                      }
                      disabled={pending}
                    />
                    <span className="block text-xs text-muted-foreground">
                      One bullet per line.
                    </span>
                  </label>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() =>
                      setSectionRows((rows) =>
                        rows.filter((_, rowIndex) => rowIndex !== index),
                      )
                    }
                    disabled={pending}
                  >
                    Remove section
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Key takeaways</span>
          <textarea
            className="min-h-32 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
            value={takeaways}
            onChange={(event) => setTakeaways(event.target.value)}
            disabled={pending}
          />
          <span className="block text-xs text-muted-foreground">
            One takeaway per line.
          </span>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Related pad slugs</span>
          <textarea
            className="min-h-32 w-full rounded-md bg-background/88 p-3 font-mono text-xs leading-5 shadow-sm outline-none"
            value={relatedPadSlugs}
            onChange={(event) => setRelatedPadSlugs(event.target.value)}
            spellCheck={false}
            disabled={pending}
          />
          <span className="block text-xs text-muted-foreground">
            One slug per line. Slugs are validated when saving.
          </span>
        </label>
      </div>

      {message || error ? (
        <p className="text-sm text-destructive" role="alert">
          {message ?? error}
        </p>
      ) : null}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/cms67/guides">Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
