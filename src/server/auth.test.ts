import { beforeEach, describe, expect, it, vi } from "vitest";

const { auth } = vi.hoisted(() => ({ auth: vi.fn() }));
vi.mock("@/auth", () => ({ auth }));
import { requireAdmin } from "./auth";

beforeEach(() => auth.mockReset());

describe("admin authorization", () => {
  it.each([null, { user: {} }, { user: { role: "reader" } }])("denies sessions without an explicit admin role: %j", async (session) => {
    auth.mockResolvedValue(session);
    expect(await requireAdmin()).toBeNull();
  });
  it("allows an authenticated admin", async () => {
    const session = { user: { role: "admin" } };
    auth.mockResolvedValue(session);
    expect(await requireAdmin()).toBe(session);
  });
});
