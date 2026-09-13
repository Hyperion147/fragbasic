import { mouseSkateWriteSchema } from "@/schemas/accessory";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/accessories/repo";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getMouseSkateById((await context.params).id);
  return row ? jsonOk({ accessory: row }) : jsonError("Not found", 404);
}

export async function PATCH(request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const existing = await repo.getMouseSkateById(id);
  if (!existing) return jsonError("Not found", 404);
  const parsed = mouseSkateWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;
  if (data.id !== id) return jsonError("Body data.id must match URL id", 400);
  if (data.slug !== existing.slug && await repo.getMouseSkateBySlug(data.slug)) return jsonError("Slug already exists", 409);
  return jsonOk({ accessory: await repo.updateMouseSkate(id, { slug: data.slug, brand: data.brand, name: data.name, status, data }) });
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const row = await repo.deleteMouseSkate(id);
  return row ? jsonOk({ ok: true, id }) : jsonError("Not found", 404);
}