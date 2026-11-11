"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import type { LatestAddedWriteInput } from "@/schemas/latest-added";

type Props = {
  initialData: {
    mousepads: readonly string[];
    glasspads: readonly string[];
    iems: readonly string[];
  };
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  onSubmit: (payload: LatestAddedWriteInput) => void;
};

function lines(values: readonly string[]) {
  return values.join("\n");
}

function parse(value: string) {
  return value
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function LatestAddedEditor({
  initialData,
  submitLabel,
  pending = false,
  error,
  onSubmit,
}: Props) {
  const [mousepads, setMousepads] = useState(() => lines(initialData.mousepads));
  const [glasspads, setGlasspads] = useState(() => lines(initialData.glasspads));
  const [iems, setIems] = useState(() => lines(initialData.iems));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      data: {
        mousepads: parse(mousepads),
        glasspads: parse(glasspads),
        iems: parse(iems),
      },
    });
  }

  return (
    <form className="space-y-6" onSubmit={submit}>
      <div className="grid gap-4 lg:grid-cols-3">
        <SlugList
          label="Mousepads"
          hint="Soft mousepad table"
          value={mousepads}
          onChange={setMousepads}
          disabled={pending}
        />
        <SlugList
          label="Glasspads"
          hint="Glasspad table"
          value={glasspads}
          onChange={setGlasspads}
          disabled={pending}
        />
        <SlugList
          label="IEMs"
          hint="IEM table"
          value={iems}
          onChange={setIems}
          disabled={pending}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        One slug per line. The home page resolves these against the same tables
        the CMS edits. Slugs are validated when saving.
      </p>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function SlugList({
  label,
  hint,
  value,
  onChange,
  disabled,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium">{label}</span>
      <span className="block text-xs text-muted-foreground">{hint}</span>
      <textarea
        className="min-h-48 w-full rounded-md bg-background/88 p-3 font-mono text-xs leading-5 shadow-sm outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        disabled={disabled}
      />
    </label>
  );
}
