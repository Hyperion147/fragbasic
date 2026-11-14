import { z } from "zod";

export const slugSchema = z.string().trim().min(1).max(160)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case slug.");

export const padSlugSchema = slugSchema.refine(
  (slug) => !["brand", "compare", "glasspads", "guides"].includes(slug),
  "This slug is reserved for a mousepad section.",
);
export const accessorySlugSchema = slugSchema.refine(
  (slug) => !["browse", "compare"].includes(slug), "This slug is reserved.",
);
export const iemSlugSchema = slugSchema.refine((slug) => slug !== "compare", "This slug is reserved.");

export function safeExternalUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || /[\u0000-\u0020\u007f]/.test(value)) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}
export const httpUrlSchema = z.string().trim().refine((value) => Boolean(safeExternalUrl(value)), "Use an absolute HTTP or HTTPS URL without credentials.");
export const imagePathSchema = z.string().refine((value) =>
  Boolean(safeExternalUrl(value)) || (/^\/(?!\/)/.test(value) && !/[\\\u0000-\u0020]/.test(value) && !value.split("/").includes("..")),
  "Use a local image path or an HTTP/HTTPS image URL.",
);
export const storageIdSchema = z.string().min(1).max(160).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/, "Use letters, numbers, hyphens or underscores.");
