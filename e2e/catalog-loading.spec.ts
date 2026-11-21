import { expect, test } from "@playwright/test";

// A production build must include the catalog, even before JS hydrates filters.
test.describe("server-rendered catalogs", () => {
  test.use({ javaScriptEnabled: false });

  for (const route of ["/mousepads", "/mousepads/glasspads", "/iems", "/accessories/mouse-skates/browse"]) {
    test(`catalog is visible without JavaScript: ${route}`, async ({ page }) => {
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator("main table")).toBeVisible();
      await expect(page.locator("main table tbody tr").first()).toBeVisible();
      await expect(page.getByText(/Loading .* filters/)).toHaveCount(0);
    });
  }
});

test("mousepad deep links, search and reset stay local", async ({ page }) => {
  await page.goto("/mousepads?q=zz-no-matching-pad");
  await expect(page.getByText("No mousepads match these filters")).toBeVisible();
  await expect(page.getByRole("textbox").first()).toHaveValue("zz-no-matching-pad");
  // Let initial route hydration finish before observing filter requests.
  const serverNavigations: string[] = [];
  page.on("request", (request) => {
    if (request.headers()["next-router-prefetch"] !== "1" &&
        new URL(request.url()).pathname === "/mousepads" &&
        (request.isNavigationRequest() || request.headers()["rsc"] === "1")) {
      serverNavigations.push(request.url());
    }
  });
  await page.getByRole("button", { name: "Clear all filters", exact: true }).click();
  await expect(page.locator("main table")).toBeVisible();
  await expect(page).toHaveURL(/\/mousepads$/);
  const input = page.getByRole("textbox").first();
  await input.fill("artisan zero");
  await expect(input).toHaveValue("artisan zero");
  await expect(page).toHaveURL(/q=artisan\+zero/);
  await expect(page.locator("main table tbody tr").first()).toContainText(/Artisan Zero/i);
  expect(serverNavigations).toEqual([]);
  await page.reload();
  await expect(input).toHaveValue("artisan zero");
  await expect(page.locator("main table tbody tr").first()).toContainText(/Artisan Zero/i);
});

test("universal comparison preserves a shared empty selection over saved defaults", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("fragbasic_last_mousepad_compare", JSON.stringify(["artisan-zero-soft"]));
  });
  await page.goto("/mousepads/compare/universal?pads=");
  await expect(page.getByText("0/3 selected", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\?pads=$/);
});

test("URL history restores mousepad filters", async ({ page }) => {
  await page.goto("/mousepads?q=artisan+zero");
  const search = page.getByRole("textbox").first();
  await expect(search).toHaveValue("artisan zero");
  await page.evaluate(() => window.history.pushState(null, "", "?q=zz-no-matching-pad"));
  await expect(page.getByText("No mousepads match these filters")).toBeVisible();
  await page.goBack();
  await expect(page.locator("main table")).toBeVisible();
  await expect(search).toHaveValue("artisan zero");
});
