import { MousepadWriteInput } from "@/schemas/mousepad";

export type AdminMousepadRow = {
    id: string;
    slug: string;
    brand: string;
    name: string;
    status: "draft" | "published";
    data: unknown;
    createdAt?: string | Date;
    updatedAt?: string | Date;
};

export class AdminApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

async function adminFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers ?? {}),
        },
    });

    const body = (await res.json().catch(() => null)) as {
        error?: string;
    } | null;

    if (!res.ok) {
        throw new AdminApiError(res.status, body?.error ?? res.statusText);
    }

    return body as T;
}

export function fetchAdminMe() {
    return adminFetch<{ email: string | null; role: string | null }>(
        "/api/admin/me",
    );
}

export function fetchAdminMousepads() {
    return adminFetch<{ mousepads: AdminMousepadRow[] }>(
        "/api/admin/mousepads",
    );
}

export function fetchAdminMousepad(id: string) {
    return adminFetch<{ mousepad: AdminMousepadRow }>(
        `/api/admin/mousepads/${encodeURIComponent(id)}`,
    );
}

export function logoutAdmin() {
    return adminFetch<{ ok: true }>("/api/admin/logout", { method: "POST" });
}

export function createMousepad(payload: MousepadWriteInput) {
    return adminFetch<{ mousepad: AdminMousepadRow }>("/api/admin/mousepads", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateMousepad(id: string, payload: MousepadWriteInput) {
    return adminFetch<{ mousepad: AdminMousepadRow }>(
        `/api/admin/mousepads/${encodeURIComponent(id)}`,
        { method: "PATCH", body: JSON.stringify(payload) },
    );
}

export function deleteMousepad(id: string) {
    return adminFetch<{ ok: true; id: string }>(
        `/api/admin/mousepads/${encodeURIComponent(id)}`,
        { method: "DELETE" },
    );
}

export async function uploadMousepadImage(id: string, file: File) {
    const formData = new FormData();
    formData.append("mousepadId", id);
    formData.append("file", file);

    const res = await fetch("/api/admin/uploads/mousepads", {
        method: "POST",
        credentials: "include",
        body: formData,
    });
    const body = (await res.json().catch(() => null)) as {
        url?: string;
        error?: string;
    } | null;

    if (!res.ok || !body?.url) {
        throw new AdminApiError(res.status, body?.error ?? "Image upload failed");
    }

    return body;
}
