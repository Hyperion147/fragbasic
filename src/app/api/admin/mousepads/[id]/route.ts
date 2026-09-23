import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { mousepadWriteSchema } from "@/schemas/mousepad";
import * as repo from "@/server/mousepads/repo";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await ctx.params;
  const row = await repo.getMousepadById(id);
  if (!row) return jsonError("Not found", 404);
  return jsonOk({ mousepad: row });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await ctx.params;
  const existing = await repo.getMousepadById(id);
  if (!existing) return jsonError("Not found", 404);

  const body = await req.json().catch(() => null);
  const parsed = mousepadWriteSchema.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);

  const { status, data } = parsed.data;

  if (data.slug !== existing.slug) {
    const clash = await repo.getMousepadBySlug(data.slug);
    if (clash) return jsonError("Slug already exists", 409);
  }

  if (data.id !== id) {
    return jsonError("Body data.id must match URL id", 400);
  }

  const row = await repo.updateMousepad(id, {
    slug: data.slug,
    brand: data.brand,
    name: data.name,
    status,
    data,
  });

  return jsonOk({ mousepad: row });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await ctx.params;
  const row = await repo.deleteMousepad(id);
  if (!row) return jsonError("Not found", 404);
  return jsonOk({ ok: true, id });
}
