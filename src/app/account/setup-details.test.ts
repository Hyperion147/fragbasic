import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { AccountSetup } from "@/server/account/setups";
import { SetupDetails } from "./setup-details";

describe("saved setup details", () => {
  it("renders every saved gear position and the edit action", () => {
    const setup = {
      id: "84f0dc06-9ab8-4c9b-b2cf-bf8cf59ad4e7",
      userId: "84f0dc06-9ab8-4c9b-b2cf-bf8cf59ad4e7",
      name: "Main setup",
      visibility: "private",
      createdAt: new Date(), updatedAt: new Date(),
      selections: { mouse: "mouse:test" },
      gear: { mouse: { id: "mouse:test", brand: "Ninjutso", model: "Sora V3", source: "https://ninjutso.com" } },
    } satisfies AccountSetup;
    const html = renderToStaticMarkup(createElement(SetupDetails, { setup }));
    expect(html).toContain("Sora V3");
    expect(html).toContain("Edit setup");
    expect(html.match(/Not added/g)).toHaveLength(4);
  });
});
