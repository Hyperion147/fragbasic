import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/mousepads/repo", () => ({ listMousepads: vi.fn() }));
vi.mock("@/server/glasspads/repo", () => ({ listGlasspads: vi.fn() }));
vi.mock("@/server/iems/repo", () => ({ listIems: vi.fn() }));
vi.mock("@/server/accessories/repo", () => ({ listMouseSkates: vi.fn() }));
vi.mock("@/server/comparisons/repo", () => ({ listComparisons: vi.fn() }));
vi.mock("@/server/best-pages/repo", () => ({ listBestPages: vi.fn() }));
vi.mock("@/server/guides/repo", () => ({ listGuides: vi.fn() }));

import { listMousepads } from "@/server/mousepads/repo";
import { listGlasspads } from "@/server/glasspads/repo";
import { listIems } from "@/server/iems/repo";
import { listMouseSkates } from "@/server/accessories/repo";
import { listComparisons } from "@/server/comparisons/repo";
import { listBestPages } from "@/server/best-pages/repo";
import { listGuides } from "@/server/guides/repo";
import { getCatalogSitemap } from "./sitemap";

// Only the fields consumed by the sitemap are needed in these database fixtures.
function rows(loader: (...args: never[]) => unknown, values: unknown[]) {
  vi.mocked(loader).mockResolvedValue(values as never);
}
const updatedAt = new Date("2026-10-01T00:00:00Z");
const pad = { slug: "test", brand: "ESPTiger", status: "published", updatedAt, data: { images: { main: "/test.png" } } };

beforeEach(() => {
  for (const loader of [listMousepads, listGlasspads, listIems, listMouseSkates, listComparisons, listBestPages, listGuides]) rows(loader, []);
});

describe("catalog sitemap", () => {
  it("excludes drafts and preserves database timestamps and images", async () => {
    rows(listMousepads, [pad, { ...pad, slug: "draft", status: "draft" }]);
    const entries = await getCatalogSitemap();
    expect(entries).toHaveLength(2);
    expect(entries[0]).toEqual({ url: "https://fragbasic.fun/mousepads/test", lastModified: updatedAt, images: ["https://fragbasic.fun/test.png"] });
    expect(entries[1].url).toBe("https://fragbasic.fun/mousepads/brand/esports-tiger");
  });
  it("excludes comparisons whose products cannot render publicly", async () => {
    rows(listMousepads, [pad]);
    rows(listComparisons, [
      { slug: "valid", status: "published", updatedAt, data: { leftSlug: "test", rightSlug: "test" } },
      { slug: "broken", status: "published", updatedAt, data: { leftSlug: "test", rightSlug: "draft" } },
      { slug: "draft", status: "draft", updatedAt, data: { leftSlug: "test", rightSlug: "test" } },
    ]);
    const urls = (await getCatalogSitemap()).map((entry) => entry.url);
    expect(urls).toContain("https://fragbasic.fun/mousepads/compare/valid");
    expect(urls.some((url) => /broken|draft/.test(url))).toBe(false);
  });
  it("deduplicates product URLs across cloth and glass catalogs", async () => {
    rows(listMousepads, [pad]); rows(listGlasspads, [pad]);
    const urls = (await getCatalogSitemap()).map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
  it("includes published editorial and accessory routes with real dates", async () => {
    for (const loader of [listGuides, listBestPages, listMouseSkates]) rows(loader, [{ slug: "test", status: "published", updatedAt }]);
    const entries = await getCatalogSitemap();
    expect(entries.map((entry) => entry.url)).toEqual(expect.arrayContaining([
      "https://fragbasic.fun/mousepads/guides/test", "https://fragbasic.fun/best/test", "https://fragbasic.fun/accessories/mouse-skates/test",
    ]));
    expect(entries.every((entry) => entry.lastModified === updatedAt)).toBe(true);
  });
});
