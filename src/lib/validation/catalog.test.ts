import { describe, expect, it } from "vitest";
import { accessorySlugSchema, httpUrlSchema, iemSlugSchema, padSlugSchema, safeExternalUrl, storageIdSchema } from "./catalog";

describe("catalog boundaries", () => {
  it.each(["../other", "Bad Slug", "pad/foo", "pad?draft=1", "pad#x", "pad--name"])("rejects malformed slugs: %s", (slug) => {
    expect(padSlugSchema.safeParse(slug).success).toBe(false);
  });
  it.each(["brand", "compare", "glasspads", "guides"])("protects reserved pad routes: %s", (slug) => expect(padSlugSchema.safeParse(slug).success).toBe(false));
  it("protects other category routes", () => {
    expect(iemSlugSchema.safeParse("compare").success).toBe(false);
    expect(accessorySlugSchema.safeParse("browse").success).toBe(false);
    expect(padSlugSchema.parse("artisan-zero-soft")).toBe("artisan-zero-soft");
  });
  it.each(["javascript:alert(1)", "data:text/html,x", "//example.com", "https://user:pass@example.com", "https://example.com/\nfoo"])("rejects unsafe outgoing links: %s", (url) => {
    expect(httpUrlSchema.safeParse(url).success).toBe(false);
    expect(safeExternalUrl(url)).toBeUndefined();
  });
  it("retains source links with legitimate query parameters", () => {
    expect(safeExternalUrl("https://example.com/product?a=1&b=2")).toBe("https://example.com/product?a=1&b=2");
  });
  it.each(["../pad", "pad/other", "pad\\other", " pad ", "", "x".repeat(161)])("rejects storage path identifiers: %s", (id) => expect(storageIdSchema.safeParse(id).success).toBe(false));
});
