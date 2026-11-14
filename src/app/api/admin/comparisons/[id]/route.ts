import { withCatalogWrite } from "@/server/catalog/write";
import { comparisonWriteSchema } from "@/schemas/comparison";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/comparisons/repo";
import { findMissingPadSlugs } from "@/server/references";
import { revalidateCatalog } from "@/server/catalog/revalidate";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getComparisonById((await context.params).id);
  return row ? jsonOk({ comparison: row }) : jsonError("Not found", 404);
}

export const PATCH = withCatalogWrite(async (request: Request, context: Ctx) => {
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

  const missing = await findMissingPadSlugs([data.leftSlug, data.rightSlug], status === "published");
  if (missing.length > 0) {
    return jsonError(`Missing or unpublished pad slug(s): ${missing.join(", ")}`, 400);
  }

  const comparison = await repo.updateComparison(id, {
    id: data.slug,
    slug: data.slug,
    title: data.title,
    leftSlug: data.leftSlug,
    rightSlug: data.rightSlug,
    status,
    data,
  });

  revalidateCatalog("comparisons");
  return jsonOk({ comparison });
});

export const DELETE = withCatalogWrite(async (_request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const row = await repo.deleteComparison(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("comparisons");
  return jsonOk({ ok: true, id });
});
