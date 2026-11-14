import { withCatalogWrite } from "@/server/catalog/write";
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

export const PATCH = withCatalogWrite(async (request: Request, context: Ctx) => {
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

  const missing = await findMissingPadSlugs(data.relatedPadSlugs, status === "published");
  if (missing.length > 0) {
    return jsonError(`Missing or unpublished pad slug(s): ${missing.join(", ")}`, 400);
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
});

export const DELETE = withCatalogWrite(async (_request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const row = await repo.deleteGuide(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("guides");
  return jsonOk({ ok: true, id });
});
