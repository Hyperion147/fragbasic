import { mousepadWriteSchema } from "@/schemas/mousepad";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/glasspads/repo";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ glasspads: await repo.listGlasspads() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const parsed = mousepadWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;
  if (data.category !== "glass" || data.surface !== "glass") return jsonError("Glasspad data must use glass category and surface", 400);
  if (await repo.getGlasspadBySlug(data.slug)) return jsonError("Slug already exists", 409);
  if (await repo.getGlasspadById(data.id)) return jsonError("Id already exists", 409);
  return jsonOk({ glasspad: await repo.insertGlasspad({ id: data.id, slug: data.slug, brand: data.brand, name: data.name, status, data }) }, 201);
}