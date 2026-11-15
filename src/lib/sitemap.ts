import type { MetadataRoute } from "next";

const ORIGIN = "https://fragbasic.fun";
const MAX_URLS = 50_000;
const MAX_BYTES = 50 * 1024 * 1024;

function escapeXml(value: string): string {
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value)) {
    throw new Error("Sitemap contains an invalid XML character");
  }
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

function canonicalUrl(value: string): string {
  const url = new URL(value);
  if (url.origin !== ORIGIN || url.username || url.password || url.search || url.hash ||
      url.href.length >= 2048 || /\s/.test(value)) {
    throw new Error("Sitemap page URL must be an absolute canonical FragBasic URL");
  }
  return url.href;
}

/** Serialize the protocol explicitly; invalid input fails instead of publishing bad XML. */
export function serializeSitemap(entries: MetadataRoute.Sitemap): string {
  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const url = canonicalUrl(entry.url);
    const previous = unique.get(url);
    if (!previous || (entry.lastModified &&
        new Date(entry.lastModified).getTime() > new Date(previous.lastModified ?? 0).getTime())) {
      unique.set(url, { ...entry, url });
    }
  }
  if (unique.size > MAX_URLS) throw new Error("Sitemap exceeds 50,000 URLs; split it before publishing");

  const rows = [...unique.values()].sort((a, b) => a.url.localeCompare(b.url)).map((entry) => {
    const fields = [`    <loc>${escapeXml(entry.url)}</loc>`];
    if (entry.lastModified !== undefined) {
      const date = new Date(entry.lastModified);
      if (!Number.isFinite(date.getTime())) throw new Error("Sitemap lastmod is not a valid date");
      fields.push(`    <lastmod>${date.toISOString()}</lastmod>`);
    }
    for (const value of new Set(entry.images ?? [])) {
      const image = new URL(value);
      if (!['https:', 'http:'].includes(image.protocol) || image.username || image.password) {
        throw new Error("Sitemap image URL must use HTTP or HTTPS without credentials");
      }
      fields.push(`    <image:image><image:loc>${escapeXml(image.href)}</image:loc></image:image>`);
    }
    return `  <url>\n${fields.join("\n")}\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${rows.join("\n")}\n</urlset>\n`;
  if (new TextEncoder().encode(xml).byteLength > MAX_BYTES) {
    throw new Error("Sitemap exceeds 50 MB; split it before publishing");
  }
  return xml;
}
