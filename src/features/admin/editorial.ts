import type { ComparisonWriteInput } from "@/schemas/comparison";
import type { BestPageWriteInput } from "@/schemas/best-page";
import type { GuideWriteInput } from "@/schemas/guide";

export type AdminComparisonRow = {
  id: string;
  slug: string;
  title: string;
  leftSlug: string;
  rightSlug: string;
  status: "draft" | "published";
  data: Record<string, unknown>;
};

export type AdminBestPageRow = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  data: Record<string, unknown>;
};

export type AdminGuideRow = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  data: Record<string, unknown>;
  updatedAt?: string;
};

async function editorialFetch<T>(input: string, init?: RequestInit): Promise<T> {
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

export const fetchAdminComparisons = () =>
  editorialFetch<{ comparisons: AdminComparisonRow[] }>("/api/admin/comparisons");
export const fetchAdminComparison = (id: string) =>
  editorialFetch<{ comparison: AdminComparisonRow }>(
    `/api/admin/comparisons/${encodeURIComponent(id)}`,
  );
export const createComparison = (payload: ComparisonWriteInput) =>
  editorialFetch<{ comparison: AdminComparisonRow }>("/api/admin/comparisons", {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const updateComparison = (id: string, payload: ComparisonWriteInput) =>
  editorialFetch<{ comparison: AdminComparisonRow }>(
    `/api/admin/comparisons/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
  );
export const deleteComparison = (id: string) =>
  editorialFetch<{ ok: true; id: string }>(
    `/api/admin/comparisons/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );

export const fetchAdminBestPages = () =>
  editorialFetch<{ bestPages: AdminBestPageRow[] }>("/api/admin/best-pages");
export const fetchAdminBestPage = (id: string) =>
  editorialFetch<{ bestPage: AdminBestPageRow }>(
    `/api/admin/best-pages/${encodeURIComponent(id)}`,
  );
export const createBestPage = (payload: BestPageWriteInput) =>
  editorialFetch<{ bestPage: AdminBestPageRow }>("/api/admin/best-pages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const updateBestPage = (id: string, payload: BestPageWriteInput) =>
  editorialFetch<{ bestPage: AdminBestPageRow }>(
    `/api/admin/best-pages/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
  );
export const deleteBestPage = (id: string) =>
  editorialFetch<{ ok: true; id: string }>(
    `/api/admin/best-pages/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );

export const fetchAdminGuides = () =>
  editorialFetch<{ guides: AdminGuideRow[] }>("/api/admin/guides");
export const fetchAdminGuide = (id: string) =>
  editorialFetch<{ guide: AdminGuideRow }>(
    `/api/admin/guides/${encodeURIComponent(id)}`,
  );
export const createGuide = (payload: GuideWriteInput) =>
  editorialFetch<{ guide: AdminGuideRow }>("/api/admin/guides", {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const updateGuide = (id: string, payload: GuideWriteInput) =>
  editorialFetch<{ guide: AdminGuideRow }>(
    `/api/admin/guides/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
  );
export const deleteGuide = (id: string) =>
  editorialFetch<{ ok: true; id: string }>(
    `/api/admin/guides/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
