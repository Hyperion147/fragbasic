import type { MouseSkateWriteInput } from "@/schemas/accessory";

export type AdminAccessoryRow = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  status: "draft" | "published";
  data: Record<string, unknown>;
};

async function accessoryFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) throw new Error(body?.error ?? response.statusText);
  return body as T;
}

export const fetchAdminAccessories = () => accessoryFetch<{ accessories: AdminAccessoryRow[] }>("/api/admin/accessories");
export const fetchAdminAccessory = (id: string) => accessoryFetch<{ accessory: AdminAccessoryRow }>(`/api/admin/accessories/${encodeURIComponent(id)}`);
export const createAccessory = (payload: MouseSkateWriteInput) => accessoryFetch<{ accessory: AdminAccessoryRow }>("/api/admin/accessories", { method: "POST", body: JSON.stringify(payload) });
export const updateAccessory = (id: string, payload: MouseSkateWriteInput) => accessoryFetch<{ accessory: AdminAccessoryRow }>(`/api/admin/accessories/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteAccessory = (id: string) => accessoryFetch<{ ok: true; id: string }>(`/api/admin/accessories/${encodeURIComponent(id)}`, { method: "DELETE" });