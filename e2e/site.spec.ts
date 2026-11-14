import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/mousepads", "/mousepads/compare/universal", "/iems", "/accessories/mouse-skates/browse", "/best", "/mousepads/guides", "/editorial-policy", "/cms67"];
for (const route of routes) {
  test(`accessible responsive route ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(scan.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  });
}

test("skip navigation is keyboard accessible", async ({ page }) => {
  await page.goto("/"); await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile navigation closes with Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation only");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click(); await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).toHaveCount(0); await expect(trigger).toBeFocused();
});

test("product details preserve evidence, links and structured data", async ({ page, request }) => {
  const index = await (await request.get("/api/search-index")).json();
  const product = index.items.find((item: { href: string }) => /^\/mousepads\/[^/]+$/.test(item.href) && !/compare|guides|glasspads|brand/.test(item.href));
  test.skip(!product, "Catalog is empty");
  await page.goto(product.href);
  await expect(page.getByText(/Record updated/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Methodology, sources and disclosures" })).toBeVisible();
  expect(await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) => nodes.every((node) => Boolean(JSON.parse(node.textContent ?? "{}"))))).toBe(true);
  const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(scan.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
});

test("admin reads and writes reject anonymous requests", async ({ request }) => {
  for (const catalogModule of ["mousepads", "glasspads", "iems", "accessories", "comparisons", "best-pages", "guides"]) {
    const base = `/api/admin/${catalogModule}`;
    expect((await request.get(base)).status()).toBe(401);
    expect((await request.post(base, { data: {} })).status()).toBe(401);
    expect((await request.patch(`${base}/nonexistent`, { data: {} })).status()).toBe(401);
    expect((await request.delete(`${base}/nonexistent`)).status()).toBe(401);
  }
});


test("canonical host redirect, private indexing and missing pages", async ({ request }) => {
  const redirect = await request.get("/mousepads", { headers: { host: "www.fragbasic.fun" }, maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe("https://fragbasic.fun/mousepads");
  const cms = await (await request.get("/cms67")).text();
  expect(cms).toContain('content="noindex, nofollow"');
  for (const path of ["/mousepads/nonexistent-audit-product", "/iems/nonexistent-audit-product", "/best/nonexistent-audit-guide"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});


test("reduced-motion preferences are respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  const motion = await page.locator("a").first().evaluate((element) => ({ animation: getComputedStyle(element).animationDuration, transition: getComputedStyle(element).transitionDuration }));
  expect(parseFloat(motion.animation)).toBeLessThan(0.001);
  expect(parseFloat(motion.transition)).toBeLessThan(0.001);
});
