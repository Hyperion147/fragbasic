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

export function logoutAdmin() {
    return adminFetch<{ ok: true }>("/api/admin/logout", { method: "POST" });
}
