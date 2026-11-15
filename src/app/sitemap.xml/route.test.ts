import { beforeEach, expect, it, vi } from "vitest";

vi.mock("@/server/catalog/sitemap", () => ({ getPublicSitemap: vi.fn() }));
import { getPublicSitemap } from "@/server/catalog/sitemap";
import { GET } from "./route";

beforeEach(() => vi.resetAllMocks());

it("serves the sitemap as a successful XML response", async () => {
  vi.mocked(getPublicSitemap).mockResolvedValue([{ url: "https://fragbasic.fun/" }]);
  const response = await GET();
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toBe("application/xml; charset=utf-8");
  expect(await response.text()).toContain("<loc>https://fragbasic.fun/</loc>");
});

it("propagates database failures instead of serving a partial sitemap or a 404", async () => {
  vi.mocked(getPublicSitemap).mockRejectedValue(new Error("Database unavailable"));
  await expect(GET()).rejects.toThrow("Database unavailable");
});
