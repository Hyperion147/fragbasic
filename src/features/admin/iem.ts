import type { IemWriteInput } from "@/schemas/iem";

export type AdminIemRow = {
    id: string;
    slug: string;
    brand: string;
    name: string;
    status: "draft" | "published";
    data: Record<string, unknown>;
};

export async function adminIemFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(input, {
        ...init,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) throw new Error(body?.error ?? response.statusText);
    return body as T;
}

export const fetchAdminIems = () => adminIemFetch<{ iems: AdminIemRow[] }>("/api/admin/iems");
export const fetchAdminIem = (id: string) => adminIemFetch<{ iem: AdminIemRow }>(`/api/admin/iems/${encodeURIComponent(id)}`);
export const createIem = (payload: IemWriteInput) => adminIemFetch<{ iem: AdminIemRow }>("/api/admin/iems", { method: "POST", body: JSON.stringify(payload) });
export const updateIem = (id: string, payload: IemWriteInput) => adminIemFetch<{ iem: AdminIemRow }>(`/api/admin/iems/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteIem = (id: string) => adminIemFetch<{ ok: true; id: string }>(`/api/admin/iems/${encodeURIComponent(id)}`, { method: "DELETE" });

export async function uploadIemImage(id: string, file: File) {
    const form = new FormData();
    form.append("iemId", id);
    form.append("file", file);
    const response = await fetch("/api/admin/uploads/iems", { method: "POST", credentials: "include", body: form });
    const body = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
    if (!response.ok || !body?.url) throw new Error(body?.error ?? "Image upload failed");
    return body.url;
}