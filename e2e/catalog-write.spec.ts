import { expect, test } from "@playwright/test";
import { encode } from "next-auth/jwt";
import { createEmptyMousepad } from "../src/features/admin/empty-mousepad";

const disposable = process.env.E2E_DATABASE === "1" &&
  ["127.0.0.1", "localhost"].includes(new URL(process.env.DATABASE_URL ?? "https://invalid").hostname);

test("catalog lifecycle remains consistent across authenticated API writes", async ({ playwright, baseURL }, testInfo) => {
  test.skip(!disposable, "Mutating integration checks require the local disposable test database");
  expect(["127.0.0.1", "localhost"]).toContain(new URL(baseURL!).hostname);
  const token = await encode({ secret: process.env.AUTH_SECRET!, salt: "authjs.session-token", token: { sub: "admin", email: "ci@fragbasic.test", role: "admin" } });
  const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { Cookie: `authjs.session-token=${token}` } });
  const prefix = `e2e-${testInfo.project.name}`;
  const first = `${prefix}-first`; const second = `${prefix}-second`; const matchup = `${prefix}-matchup`;
  const pad = (slug: string) => ({ ...createEmptyMousepad(), id: slug, slug, brand: "Test", name: slug, communityConsensus: { summary: "Synthetic integration fixture", commonComparisons: [], strengths: [], weaknesses: [] } });
  const comparison = { slug: matchup, title: "Integration fixture", leftSlug: first, rightSlug: second, excerpt: "Synthetic integration fixture", tags: [] };
  try {
    for (const slug of [first, second]) {
      const created = await api.post("/api/admin/mousepads", { data: { status: "published", data: pad(slug) } });
      expect(created.status(), await created.text()).toBe(201);
    }
    const race = `${prefix}-race`;
    const collision = await Promise.all([
      api.post("/api/admin/mousepads", { data: { status: "published", data: pad(race) } }),
      api.post("/api/admin/glasspads", { data: { status: "published", data: { ...pad(race), category: "glass", surface: "glass" } } }),
    ]);
    expect(collision.map((response) => response.status()).sort()).toEqual([201, 409]);
    expect((await api.post("/api/admin/glasspads", { data: { status: "published", data: { ...pad(first), category: "glass", surface: "glass" } } })).status()).toBe(409);
    expect((await api.post("/api/admin/mousepads", { data: { data: { ...pad(`${prefix}-reserved`), slug: "compare" } } })).status()).toBe(400);
    expect((await api.post("/api/admin/comparisons", { data: { status: "published", data: comparison } })).status()).toBe(201);
    expect((await api.patch(`/api/admin/mousepads/${first}`, { data: { status: "draft", data: pad(first) } })).status()).toBe(409);
    expect((await api.patch(`/api/admin/mousepads/${first}`, { data: { status: "published", data: { ...pad(first), slug: `${first}-renamed` } } })).status()).toBe(409);
    expect((await api.delete(`/api/admin/mousepads/${first}`)).status()).toBe(409);
    expect((await api.patch(`/api/admin/comparisons/${matchup}`, { data: { status: "draft", data: comparison } })).status()).toBe(200);
    expect((await api.patch(`/api/admin/mousepads/${first}`, { data: { status: "draft", data: pad(first) } })).status()).toBe(200);
    expect((await api.post("/api/admin/comparisons", { data: { status: "published", data: { ...comparison, slug: `${matchup}-invalid` } } })).status()).toBe(400);
    expect((await api.delete(`/api/admin/mousepads/${first}`)).status()).toBe(409);
    expect((await api.post("/api/admin/uploads/mousepads", { multipart: { mousepadId: first, file: { name: "fake.png", mimeType: "image/png", buffer: Buffer.from("<svg onload='alert(1)'/>") } } })).status()).toBe(415);
    expect((await api.post("/api/admin/uploads/mousepads", { multipart: { mousepadId: "../unsafe", file: { name: "fake.png", mimeType: "image/png", buffer: Buffer.from("fake") } } })).status()).toBe(400);
  } finally {
    await api.delete(`/api/admin/comparisons/${matchup}`);
    await api.delete(`/api/admin/comparisons/${matchup}-invalid`);
    for (const slug of [first, second, `${prefix}-reserved`]) await api.delete(`/api/admin/mousepads/${slug}`);
    await api.delete(`/api/admin/mousepads/${prefix}-race`);
    await api.delete(`/api/admin/glasspads/${prefix}-race`);
    await api.dispose();
  }
});
