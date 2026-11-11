import { guideWriteSchema } from "@/schemas/guide";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import { revalidateCatalog } from "@/server/catalog/revalidate";
import * as repo from "@/server/guides/repo";
import { findMissingPadSlugs } from "@/server/references";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getGuideById((await context.params).id);
  return row ? jsonOk({ guide: row }) : jsonError("Not found", 404);
}

export async function PATCH(request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const existing = await repo.getGuideById(id);
  if (!existing) return jsonError("Not found", 404);

  const parsed = guideWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  if (data.slug !== existing.slug) {
    const clash = await repo.getGuideBySlug(data.slug);
    if (clash && clash.id !== id) return jsonError("Slug already exists", 409);
  }

  const missing = await findMissingPadSlugs(data.relatedPadSlugs);
  if (missing.length > 0) {
    return jsonError(`Unknown pad slug(s): ${missing.join(", ")}`, 400);
  }

  const guide = await repo.updateGuide(id, {
    id: data.slug,
    slug: data.slug,
    title: data.title,
    status,
    data,
  });

  revalidateCatalog("guides");
  return jsonOk({ guide });
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const row = await repo.deleteGuide(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("guides");
  return jsonOk({ ok: true, id });
}
