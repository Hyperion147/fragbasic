import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("finder preserves saved pads across a search and opens their comparison", async ({ page }) => {
  await page.goto("/mousepads/finder");
  const results = page.getByRole("list", { name: "Mousepads ranked by fit" });
  const save = results.getByRole("button", { name: /^Save /, pressed: false });
  await save.first().click();
  await save.first().click();
  await page.getByLabel("Maximum budget").fill("1");
  await page.getByRole("button", { name: "Find my matches" }).click();
  await expect(page.getByText("No pads meet these limits")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your matches" })).toBeFocused();
  await expect(page.getByRole("heading", { name: "Saved pads (2)" })).toBeVisible();
  const audit = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map(({ id }) => id)).toEqual([]);
  await page.getByRole("link", { name: "Compare saved pads" }).click();
  await expect(page.getByText("2/3 selected", { exact: true })).toBeVisible();
});

test("finder applies its budget without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/mousepads/finder");
    await page.getByLabel("Maximum budget").fill("1");
    await page.getByRole("button", { name: "Find my matches" }).click();
    await expect(page.getByText("No pads meet these limits")).toBeVisible();
    await expect(page).toHaveURL(/budget=1/);
  } finally {
    await context.close();
  }
});
