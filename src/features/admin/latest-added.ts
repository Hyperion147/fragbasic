import type { LatestAddedWriteInput } from "@/schemas/latest-added";

export type AdminLatestAddedRow = {
  key: string;
  data: Record<string, unknown>;
  updatedAt?: string | Date;
};

async function latestAddedFetch<T>(
  input: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const body = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;
  if (!response.ok) throw new Error(body?.error ?? response.statusText);
  return body as T;
}

export const fetchAdminLatestAdded = () =>
  latestAddedFetch<{ latestAdded: AdminLatestAddedRow | null }>(
    "/api/admin/latest-added",
  );

export const updateLatestAdded = (payload: LatestAddedWriteInput) =>
  latestAddedFetch<{ latestAdded: AdminLatestAddedRow }>(
    "/api/admin/latest-added",
    { method: "PUT", body: JSON.stringify(payload) },
  );
