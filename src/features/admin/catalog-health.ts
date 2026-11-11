import type { CatalogHealthReport } from "@/server/catalog/health";

export async function fetchCatalogHealth(): Promise<CatalogHealthReport> {
  const response = await fetch("/api/admin/catalog-health", {
    credentials: "include",
  });
  const body = (await response.json().catch(() => null)) as {
    health?: CatalogHealthReport;
    error?: string;
  } | null;

  if (!response.ok || !body?.health) {
    throw new Error(body?.error ?? response.statusText);
  }

  return body.health;
}
