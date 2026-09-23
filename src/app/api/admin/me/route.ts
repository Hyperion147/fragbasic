import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk } from "@/server/api";

/** GET /api/admin/me — who is logged in? */
export async function GET() {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  return jsonOk({
    email: session.user?.email ?? null,
    role: session.user?.role ?? null,
  });
}
