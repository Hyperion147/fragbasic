import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/account/client", () => ({ accountClient: vi.fn() }));
vi.mock("@/server/catalog/setup", () => ({ getSetupCatalog: vi.fn() }));
vi.mock("@/server/account/setups", () => ({
  createAccountSetup: vi.fn(), replaceAccountSetup: vi.fn(), updateAccountProfile: vi.fn(),
}));
vi.mock("next/navigation", () => ({ redirect: (url: string) => { throw new Error(url); } }));

import { accountClient } from "@/server/account/client";
import { getSetupCatalog } from "@/server/catalog/setup";
import { replaceAccountSetup } from "@/server/account/setups";
import { saveSetup } from "./actions";

describe("private setup writes", () => {
  const setupId = "84f0dc06-9ab8-4c9b-b2cf-bf8cf59ad4e7";
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(accountClient).mockResolvedValue({
      auth: { getUser: async () => ({ data: { user: { id: "owner" } } }) },
    } as unknown as NonNullable<Awaited<ReturnType<typeof accountClient>>>);
    vi.mocked(getSetupCatalog).mockResolvedValue({
      mouse: [{ id: "mouse:example", brand: "Example", model: "Mouse", source: "/mouse" }],
      keyboard: [], monitor: [], mousepad: [], iem: [],
    });
  });
  function selections(mouse: string) {
    const form = new FormData();
    for (const [key, value] of Object.entries({ setup_id: setupId, name: "Main setup", visibility: "private", mouse, keyboard: "", monitor: "", mousepad: "", iem: "" })) {
      form.set(key, value);
    }
    return form;
  }
  it("rejects a setup the authenticated user does not own", async () => {
    vi.mocked(replaceAccountSetup).mockResolvedValue(false);
    await expect(saveSetup(selections("mouse:example"))).rejects.toThrow("notice=session");
  });
  it("rejects unknown model IDs", async () => {
    await expect(saveSetup(selections("mouse:missing"))).rejects.toThrow("notice=invalid");
    expect(replaceAccountSetup).not.toHaveBeenCalled();
  });
  it("saves only the selected catalog IDs", async () => {
    vi.mocked(replaceAccountSetup).mockResolvedValue(true);
    await expect(saveSetup(selections("mouse:example"))).rejects.toThrow("notice=saved");
    expect(replaceAccountSetup).toHaveBeenCalledWith(expect.objectContaining({
      userId: "owner", setupId, selections: { mouse: "mouse:example" },
    }));
  });
});
