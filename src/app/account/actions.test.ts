import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/account/client", () => ({ accountClient: vi.fn() }));
vi.mock("@/server/catalog/setup", () => ({ getSetupCatalog: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: (url: string) => { throw new Error(url); } }));

import { accountClient } from "@/server/account/client";
import { getSetupCatalog } from "@/server/catalog/setup";
import { saveSetup } from "./actions";

describe("private setup writes", () => {
  const updateUser = vi.fn();
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(accountClient).mockResolvedValue({
      auth: { getUser: async () => ({ data: { user: { id: "owner" } } }), updateUser },
    } as unknown as NonNullable<Awaited<ReturnType<typeof accountClient>>>);
    vi.mocked(getSetupCatalog).mockResolvedValue({
      mouse: [{ id: "mouse:example", brand: "Example", model: "Mouse", source: "/mouse" }],
      keyboard: [], monitor: [], mousepad: [], iem: [],
    });
  });
  function selections(owner: string, mouse: string) {
    const form = new FormData();
    for (const [key, value] of Object.entries({ owner, mouse, keyboard: "", monitor: "", mousepad: "", iem: "" })) {
      form.set(key, value);
    }
    return form;
  }
  it("rejects a form opened by a different user", async () => {
    await expect(saveSetup(selections("previous-user", "mouse:example"))).rejects.toThrow("notice=session");
    expect(updateUser).not.toHaveBeenCalled();
  });
  it("rejects unknown model IDs", async () => {
    await expect(saveSetup(selections("owner", "mouse:missing"))).rejects.toThrow("notice=invalid");
    expect(updateUser).not.toHaveBeenCalled();
  });
  it("saves only the selected catalog IDs", async () => {
    updateUser.mockResolvedValue({ error: null });
    await expect(saveSetup(selections("owner", "mouse:example"))).rejects.toThrow("notice=saved");
    expect(updateUser).toHaveBeenCalledWith({ data: { fragbasic_setup: { mouse: "mouse:example" } } });
  });
});
