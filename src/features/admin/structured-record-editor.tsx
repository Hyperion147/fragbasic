"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { ZodType } from "zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type JsonSchema = {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  format?: string;
  description?: string;
  minimum?: number;
  maximum?: number;
  minItems?: number;
};

type WriteStatus = "draft" | "published";

type ImageUpload = {
  id: string;
  endpoint: string;
  field: string;
};

type Props = {
  schema: ZodType;
  initialData: Record<string, unknown>;
  initialStatus: WriteStatus;
  submitLabel: string;
  cancelHref: string;
  pending?: boolean;
  error?: string | null;
  imageUpload?: ImageUpload;
  onSubmit: (payload: { status: WriteStatus; data: unknown }) => void;
};

const LONG_TEXT = new Set([
  "description",
  "summary",
  "notes",
  "note",
  "excerpt",
  "hero",
  "thesis",
  "verdict",
  "communitySummary",
  "communityConsensus",
  "label",
  "reason",
  "bestFor",
  "subtitle",
  "eyebrow",
  "coatingDurability",
  "glassSurfaceFinishNotes",
  "testingDuration",
  "warranty",
]);

const ACRONYMS = new Set(["id", "url", "db", "hz", "usd", "inr", "eur", "gbp", "mm"]);

function humanize(key: string) {
  if (ACRONYMS.has(key.toLowerCase())) return key.toUpperCase();

  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function singular(label: string) {
  if (label.endsWith("ies")) return `${label.slice(0, -3)}y`;
  if (label.endsWith("s")) return label.slice(0, -1);
  return label;
}

function typeOf(schema: JsonSchema) {
  return Array.isArray(schema.type) ? schema.type[0] : schema.type;
}

function defaultValue(schema: JsonSchema, key = ""): unknown {
  if (schema.enum?.length) return schema.enum[0];

  switch (typeOf(schema)) {
    case "boolean":
      return false;
    case "number":
    case "integer":
      return schema.minimum ?? 0;
    case "array":
      return [];
    case "object": {
      const required = new Set(schema.required ?? []);
      return Object.fromEntries(
        Object.entries(schema.properties ?? {})
          .filter(([name]) => required.has(name))
          .map(([name, property]) => [name, defaultValue(property, name)]),
      );
    }
    default:
      if (/hex$/i.test(key) || key === "color") return "#000000";
      return "";
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function StructuredRecordEditor({
  schema,
  initialData,
  initialStatus,
  submitLabel,
  cancelHref,
  pending = false,
  error,
  imageUpload,
  onSubmit,
}: Props) {
  const [data, setData] = useState<Record<string, unknown>>(() => ({
    ...initialData,
  }));
  const [status, setStatus] = useState<WriteStatus>(initialStatus);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonDirty, setJsonDirty] = useState(false);

  const jsonSchema = useMemo(
    () => z.toJSONSchema(schema, { io: "input" }) as JsonSchema,
    [schema],
  );

  const requiredTopLevel = new Set(jsonSchema.required ?? []);

  function toggleAdvanced() {
    if (!advancedOpen) {
      setJsonDraft(JSON.stringify(data, null, 2));
      setJsonDirty(false);
    }
    setAdvancedOpen((open) => !open);
  }

  function applyJson() {
    try {
      const parsed: unknown = JSON.parse(jsonDraft);
      if (!isObject(parsed)) throw new Error("JSON must be an object.");
      setData(parsed);
      setJsonDirty(false);
      setMessage(null);
    } catch (jsonError) {
      setMessage(
        jsonError instanceof Error ? jsonError.message : "JSON is invalid.",
      );
    }
  }

  async function uploadImage(file: File | undefined) {
    if (!file || !imageUpload) return;

    setUploading(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append(imageUpload.field, imageUpload.id);
      form.append("file", file);

      const response = await fetch(imageUpload.endpoint, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const result = (await response.json().catch(() => null)) as {
        url?: string;
        error?: string;
      } | null;

      if (!response.ok || !result?.url) {
        throw new Error(result?.error ?? "Image upload failed");
      }

      setData((current) => {
        const images = isObject(current.images) ? current.images : {};
        return { ...current, images: { ...images, main: result.url } };
      });
    } catch (uploadError) {
      setMessage(
        uploadError instanceof Error ? uploadError.message : "Image upload failed",
      );
    } finally {
      setUploading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (advancedOpen && jsonDirty) {
      setMessage("Apply or discard the advanced JSON changes first.");
      return;
    }

    const candidate = JSON.parse(JSON.stringify(data)) as unknown;
    const result = schema.safeParse(candidate);

    if (!result.success) {
      const issue = result.error.issues[0];
      const path = issue.path.length ? `${issue.path.join(".")}: ` : "";
      setMessage(`${path}${issue.message}`);
      return;
    }

    setMessage(null);
    onSubmit({ status, data: result.data });
  }

  return (
    <form className="space-y-6" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <select
            className="h-10 w-full rounded-md bg-background/88 px-3 text-sm"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as WriteStatus)
            }
            disabled={pending}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        {imageUpload ? (
          <div className="space-y-2 text-sm sm:col-span-2">
            <span className="font-medium">Main image</span>
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-background/78 px-3 text-xs font-medium shadow-sm hover:bg-muted has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50">
                {uploading ? "Uploading..." : "Upload image"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="sr-only"
                  onChange={(event) => void uploadImage(event.target.files?.[0])}
                  disabled={pending || uploading}
                />
              </label>
              <span className="line-clamp-1 break-all text-xs text-muted-foreground">
                {typeof data.images === "object" &&
                data.images &&
                typeof (data.images as Record<string, unknown>).main === "string"
                  ? String((data.images as Record<string, unknown>).main)
                  : "No image set"}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-5">
        {Object.entries(jsonSchema.properties ?? {}).map(([key, property]) => (
          <SchemaField
            key={key}
            name={key}
            schema={property}
            required={requiredTopLevel.has(key)}
            value={data[key]}
            depth={0}
            onChange={(value) =>
              setData((current) => ({ ...current, [key]: value }))
            }
          />
        ))}
      </div>

      <div className="rounded-md border border-border/80 bg-card/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Advanced JSON</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Edit the complete record directly. Use this for fields not shown above.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleAdvanced}
            disabled={pending}
          >
            {advancedOpen ? "Hide JSON" : "Show JSON"}
          </Button>
        </div>

        {advancedOpen ? (
          <div className="mt-4 space-y-3">
            <textarea
              className="min-h-80 w-full rounded-md bg-background/88 p-4 font-mono text-xs leading-5 shadow-sm outline-none"
              value={jsonDraft}
              onChange={(event) => {
                setJsonDraft(event.target.value);
                setJsonDirty(true);
              }}
              spellCheck={false}
              disabled={pending || uploading}
            />
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setJsonDraft(JSON.stringify(data, null, 2));
                  setJsonDirty(false);
                }}
                disabled={pending || !jsonDirty}
              >
                Discard
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={applyJson}
                disabled={pending || !jsonDirty}
              >
                Apply JSON
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {message || error ? (
        <p className="text-sm text-destructive" role="alert">
          {message ?? error}
        </p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" asChild>
          <Link href={cancelHref}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending || uploading}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function SchemaField({
  name,
  schema,
  required,
  value,
  depth,
  onChange,
}: {
  name: string;
  schema: JsonSchema;
  required: boolean;
  value: unknown;
  depth: number;
  onChange: (value: unknown) => void;
}) {
  const type = typeOf(schema);
  const label = humanize(name);

  if (schema.enum) {
    return (
      <label className="block space-y-2 text-sm">
        <span className="font-medium">
          {label}
          {required ? "" : " (optional)"}
        </span>
        <select
          className="h-10 w-full rounded-md bg-background/88 px-3 text-sm"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        >
          {!required ? <option value="">Not set</option> : null}
          {schema.enum.map((option) => (
            <option key={String(option)} value={String(option)}>
              {humanize(String(option))}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-4 rounded border-border"
          checked={value === true}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="font-medium">{label}</span>
      </label>
    );
  }

  if (type === "number" || type === "integer") {
    return (
      <label className="block space-y-2 text-sm">
        <span className="font-medium">
          {label}
          {required ? "" : " (optional)"}
        </span>
        <Input
          type="number"
          min={schema.minimum}
          max={schema.maximum}
          step={type === "integer" ? 1 : "any"}
          value={typeof value === "number" ? value : ""}
          onChange={(event) => {
            const next = event.target.value;
            onChange(next === "" ? undefined : Number(next));
          }}
        />
      </label>
    );
  }

  if (type === "array") {
    return (
      <ArrayField
        name={name}
        schema={schema}
        required={required}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === "object") {
    return (
      <ObjectField
        name={name}
        schema={schema}
        required={required}
        value={value}
        depth={depth}
        onChange={onChange}
      />
    );
  }

  const long = LONG_TEXT.has(name);
  const isUrl = schema.format === "uri";

  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium">
        {label}
        {required ? "" : " (optional)"}
      </span>
      {long ? (
        <textarea
          className="min-h-24 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => {
            const next = event.target.value;
            onChange(next === "" && !required ? undefined : next);
          }}
        />
      ) : (
        <Input
          type={isUrl ? "url" : "text"}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => {
            const next = event.target.value;
            onChange(next === "" && !required ? undefined : next);
          }}
        />
      )}
    </label>
  );
}

function ObjectField({
  name,
  schema,
  required,
  value,
  depth,
  onChange,
}: {
  name: string;
  schema: JsonSchema;
  required: boolean;
  value: unknown;
  depth: number;
  onChange: (value: unknown) => void;
}) {
  const object = isObject(value) ? value : undefined;
  const label = humanize(name);

  if (!object && !required) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/60 bg-card/30 px-3 py-2">
        <span className="text-sm font-medium">{label} (optional)</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(defaultValue(schema, name))}
        >
          Add {label.toLowerCase()}
        </Button>
      </div>
    );
  }

  const current = object ?? (defaultValue(schema, name) as Record<string, unknown>);
  const requiredKeys = new Set(schema.required ?? []);

  return (
    <details
      className="rounded-md border border-border/70 bg-card/30"
      open={depth < 1 || required}
    >
      <summary className="cursor-pointer px-3 py-2 text-sm font-medium">
        {label}
        {required ? "" : " (optional)"}
      </summary>
      <div className="space-y-4 border-t border-border/60 p-3">
        {Object.entries(schema.properties ?? {}).map(([key, property]) => (
          <SchemaField
            key={key}
            name={key}
            schema={property}
            required={requiredKeys.has(key)}
            value={current[key]}
            depth={depth + 1}
            onChange={(next) => onChange({ ...current, [key]: next })}
          />
        ))}
        {!required ? (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => onChange(undefined)}
            >
              Remove {label.toLowerCase()}
            </Button>
          </div>
        ) : null}
      </div>
    </details>
  );
}

function ArrayField({
  name,
  schema,
  required,
  value,
  onChange,
}: {
  name: string;
  schema: JsonSchema;
  required: boolean;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  const itemSchema = schema.items ?? {};
  const itemType = typeOf(itemSchema);
  const label = humanize(name);
  const itemLabel = singular(label);

  function add() {
    onChange([...items, defaultValue(itemSchema, itemLabel)]);
  }

  function remove(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  if (itemSchema.enum) {
    return (
      <div className="space-y-2 text-sm">
        <span className="font-medium">{label}</span>
        <div className="flex flex-wrap gap-3 rounded-md border border-border/60 bg-card/30 p-3">
          {itemSchema.enum.map((option) => {
            const optionValue = String(option);
            const checked = items.includes(optionValue);
            return (
              <label key={optionValue} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border-border"
                  checked={checked}
                  onChange={(event) =>
                    onChange(
                      event.target.checked
                        ? [...items, optionValue]
                        : items.filter((item) => item !== optionValue),
                    )
                  }
                />
                <span>{humanize(optionValue)}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  if (itemType === "object") {
    const itemRequired = new Set(itemSchema.required ?? []);
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium">
            {label}
            {required ? "" : " (optional)"}
          </span>
          <Button type="button" variant="outline" size="sm" onClick={add}>
            Add {itemLabel.toLowerCase()}
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">No {label.toLowerCase()} yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const object = isObject(item) ? item : {};
              return (
                <div
                  key={index}
                  className="space-y-3 rounded-md border border-border/70 bg-card/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {itemLabel} {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  {Object.entries(itemSchema.properties ?? {}).map(
                    ([key, property]) => (
                      <SchemaField
                        key={key}
                        name={key}
                        schema={property}
                        required={itemRequired.has(key)}
                        value={object[key]}
                        depth={1}
                        onChange={(next) =>
                          onChange(
                            items.map((entry, itemIndex) =>
                              itemIndex === index
                                ? { ...object, [key]: next }
                                : entry,
                            ),
                          )
                        }
                      />
                    ),
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const numeric = itemType === "number" || itemType === "integer";
  const textValue = items
    .map((item) => (typeof item === "number" ? String(item) : String(item ?? "")))
    .join("\n");

  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium">
        {label}
        {required ? "" : " (optional)"}
      </span>
      <textarea
        className="min-h-24 w-full rounded-md bg-background/88 p-3 text-sm shadow-sm outline-none"
        value={textValue}
        onChange={(event) => {
          const lines = event.target.value.split("\n");
          if (numeric) {
            onChange(
              lines
                .map((line) => line.trim())
                .filter(Boolean)
                .map(Number)
                .filter((number) => Number.isFinite(number)),
            );
          } else {
            onChange(lines);
          }
        }}
        placeholder="One item per line"
      />
      <span className="block text-xs text-muted-foreground">
        One item per line.
      </span>
    </label>
  );
}
