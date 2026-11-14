import { describe, expect, it, vi } from "vitest";
const { requireAdmin, transaction } = vi.hoisted(() => ({ requireAdmin: vi.fn(), transaction: vi.fn(async (action: () => Promise<Response>) => action()) }));
vi.mock("@/db", () => ({ withCatalogTransaction: transaction }));
vi.mock("@/server/auth", () => ({ requireAdmin }));
import { withCatalogWrite } from "./write";

describe("catalog write boundary", () => {
  it("rejects anonymous writes before opening a transaction", async () => {
    requireAdmin.mockResolvedValue(null); transaction.mockClear();
    const action = vi.fn();
    expect((await withCatalogWrite(action)()).status).toBe(401);
    expect(action).not.toHaveBeenCalled(); expect(transaction).not.toHaveBeenCalled();
  });
  it("runs authorized writes inside the serialized transaction", async () => {
    requireAdmin.mockResolvedValue({ user: { role: "admin" } });
    const action = vi.fn(async (value: string) => Response.json({ value }));
    expect(await (await withCatalogWrite(action)("record")).json()).toEqual({ value: "record" });
    expect(transaction).toHaveBeenCalled();
  });
});
