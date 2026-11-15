import { describe, expect, it } from "vitest";
import { serializeSitemap } from "./sitemap";

describe("sitemap XML", () => {
  it("emits UTF-8 XML and escapes image URL entities", () => {
    const xml = serializeSitemap([{ url: "https://fragbasic.fun/iems/test", lastModified: new Date("2026-11-01"), images: ["https://images.example/test?a=1&b=2"] }]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain("<lastmod>2026-11-01T00:00:00.000Z</lastmod>");
    expect(xml).toContain("test?a=1&amp;b=2</image:loc>");
  });
  it("deduplicates canonicals and keeps the newest modification", () => {
    const url = "https://fragbasic.fun/iems/test";
    const xml = serializeSitemap([{ url, lastModified: "2026-11-02" }, { url, lastModified: "2026-11-01" }]);
    expect(xml.match(/<url>/g)).toHaveLength(1);
    expect(xml).toContain("2026-11-02T00:00:00.000Z");
  });
  it.each(["/relative", "https://www.fragbasic.fun/", "http://fragbasic.fun/", "https://other.example/", "https://fragbasic.fun/iems?q=test", "https://fragbasic.fun/iems#test", "https://user:password@fragbasic.fun/"])("rejects noncanonical page URL %s", (url) => {
    expect(() => serializeSitemap([{ url }])).toThrow();
  });
  it("does not invent modification dates or ranking hints", () => {
    const xml = serializeSitemap([{ url: "https://fragbasic.fun/" }]);
    expect(xml).not.toMatch(/lastmod|priority|changefreq/);
  });
  it("rejects invalid dates and oversized URL lists", () => {
    expect(() => serializeSitemap([{ url: "https://fragbasic.fun/", lastModified: "invalid" }])).toThrow(/date/);
    expect(() => serializeSitemap(Array.from({ length: 50001 }, (_, i) => ({ url: `https://fragbasic.fun/mousepads/${i}` })))).toThrow(/50,000/);
  });
});
