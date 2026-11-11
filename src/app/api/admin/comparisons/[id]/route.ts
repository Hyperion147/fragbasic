import { comparisonWriteSchema } from "@/schemas/comparison";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/comparisons/repo";
import { findMissingPadSlugs } from "@/server/references";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getComparisonById((await context.params).id);
  return row ? jsonOk({ comparison: row }) : jsonError("Not found", 404);
}

export async function PATCH(request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const existing = await repo.getComparisonById(id);
  if (!existing) return jsonError("Not found", 404);

  const parsed = comparisonWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  if (data.leftSlug === data.rightSlug) {
    return jsonError("A comparison must reference two different pads", 400);
  }

  if (data.slug !== existing.slug) {
    const clash = await repo.getComparisonBySlug(data.slug);
    if (clash && clash.id !== id) return jsonError("Slug already exists", 409);
  }

  const missing = await findMissingPadSlugs([data.leftSlug, data.rightSlug]);
  if (missing.length > 0) {
    return jsonError(`Unknown pad slug(s): ${missing.join(", ")}`, 400);
  }

  return jsonOk({
    comparison: await repo.updateComparison(id, {
      id: data.slug,
      slug: data.slug,
      title: data.title,
      leftSlug: data.leftSlug,
      rightSlug: data.rightSlug,
      status,
      data,
    }),
  });
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const row = await repo.deleteComparison(id);
  return row ? jsonOk({ ok: true, id }) : jsonError("Not found", 404);
}
