import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { mousepadWriteSchema } from "@/schemas/mousepad";
import * as repo from "@/server/mousepads/repo";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const rows = await repo.listMousepads();
  return jsonOk({ mousepads: rows });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const body = await req.json().catch(() => null);
  const parsed = mousepadWriteSchema.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);

  const { status, data } = parsed.data;

  const bySlug = await repo.getMousepadBySlug(data.slug);
  if (bySlug) return jsonError("Slug already exists", 409);

  const byId = await repo.getMousepadById(data.id);
  if (byId) return jsonError("Id already exists", 409);

  const row = await repo.insertMousepad({
    id: data.id,
    slug: data.slug,
    brand: data.brand,
    name: data.name,
    status,
    data,
  });

  return jsonOk({ mousepad: row }, 201);
}
