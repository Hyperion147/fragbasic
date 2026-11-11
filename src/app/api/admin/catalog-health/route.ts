import { jsonError, jsonOk } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import { getCatalogHealth } from "@/server/catalog/health";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ health: await getCatalogHealth() });
}
