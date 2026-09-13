import type { MousepadWriteInput } from "@/schemas/mousepad";

export type AdminGlasspadRow = { id: string; slug: string; brand: string; name: string; status: "draft" | "published"; data: Record<string, unknown> };

async function glasspadFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(input, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) throw new Error(body?.error ?? response.statusText);
    return body as T;
}

export const fetchAdminGlasspads = () => glasspadFetch<{ glasspads: AdminGlasspadRow[] }>("/api/admin/glasspads");
export const fetchAdminGlasspad = (id: string) => glasspadFetch<{ glasspad: AdminGlasspadRow }>(`/api/admin/glasspads/${encodeURIComponent(id)}`);
export const createGlasspad = (payload: MousepadWriteInput) => glasspadFetch<{ glasspad: AdminGlasspadRow }>("/api/admin/glasspads", { method: "POST", body: JSON.stringify(payload) });
export const updateGlasspad = (id: string, payload: MousepadWriteInput) => glasspadFetch<{ glasspad: AdminGlasspadRow }>(`/api/admin/glasspads/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteGlasspad = (id: string) => glasspadFetch<{ ok: true; id: string }>(`/api/admin/glasspads/${encodeURIComponent(id)}`, { method: "DELETE" });