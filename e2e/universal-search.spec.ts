import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const item = {
  id: "pad-artisan-zero-soft", kind: "mousepad", title: "Artisan Zero Soft",
  subtitle: "Control · Cloth", href: "/mousepads/artisan-zero-soft",
  keywords: ["artisan", "zero", "soft", "control"],
};

test("search covers the viewport from scrolled public pages", async ({ page }) => {
  await page.route("**/api/search-index", (route) => route.fulfill({ json: { items: [item] } }));
  for (const path of ["/", "/mousepads", "/iems", "/best", "/mousepads/compare/universal"]) {
    await page.goto(path);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const scrollY = await page.evaluate(() => window.scrollY);
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Search FragBasic" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("combobox")).toBeFocused();
    const overlay = await page.locator(".search-overlay").boundingBox();
    expect(overlay).toEqual({ x: 0, y: 0, ...page.viewportSize() });
    expect(await page.locator(".search-overlay").evaluate((node) => getComputedStyle(node).backdropFilter)).toBe("blur(3px)");
    expect(await dialog.evaluate((node) => node.closest("header"))).toBeNull();
    await page.mouse.click(8, page.viewportSize()!.height - 8);
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
  }
});

test("outside click, focus trapping and Escape work without refetching", async ({ page }) => {
  let indexRequests = 0;
  await page.route("**/api/search-index", (route) => {
    indexRequests++;
    return route.fulfill({ json: { items: [item] } });
  });
  await page.goto("/mousepads");
  const trigger = page.getByRole("button", { name: "Search FragBasic", exact: true }).filter({ visible: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Search FragBasic" });
  const input = dialog.getByRole("combobox");
  await input.fill("artisan zero");
  await expect(dialog.getByRole("option", { name: /Artisan Zero Soft/ })).toBeVisible();
  await input.click();
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  }
  const scan = await new AxeBuilder({ page }).include('[role="dialog"]').withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(scan.violations.map(({ id }) => id)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(8, 8);
  await expect(dialog).toHaveCount(0);
  expect(indexRequests).toBe(1);
});

test("search opens while the index is pending and keeps keyboard navigation", async ({ page }) => {
  let releaseIndex: (() => void) | undefined;
  const ready = new Promise<void>((resolve) => { releaseIndex = resolve; });
  await page.route("**/api/search-index", async (route) => {
    await ready;
    await route.fulfill({ json: { items: [item] } });
  });
  await page.goto("/mousepads");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Search FragBasic" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("combobox").fill("artisan");
  await expect(dialog.getByText("Loading catalog…")).toBeVisible();
  releaseIndex!();
  await expect(dialog.getByRole("option", { name: /Artisan Zero Soft/ })).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/mousepads\/artisan-zero-soft$/);
  await expect(dialog).toHaveCount(0);
});
