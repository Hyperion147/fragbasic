import { getMousepadBySlug } from "@/server/mousepads/repo";
import { getPadDependents, findMissingPadSlugs } from "@/server/references";
import { withCatalogWrite } from "@/server/catalog/write";
import { mousepadWriteSchema } from "@/schemas/mousepad";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/glasspads/repo";
import { revalidateCatalog } from "@/server/catalog/revalidate";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getGlasspadById((await context.params).id);
  return row ? jsonOk({ glasspad: row }) : jsonError("Not found", 404);
}

export const PATCH = withCatalogWrite(async (request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const existing = await repo.getGlasspadById(id);
  if (!existing) return jsonError("Not found", 404);
  const parsed = mousepadWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  if (await getMousepadBySlug(data.slug)) return jsonError("Slug already exists in the other pad catalog", 409);
  const alternativeSlugs = [
    ...(data.relatedAlternatives?.similarFeeling ?? []),
    ...(data.relatedAlternatives?.moreControl ?? []),
    ...(data.relatedAlternatives?.moreSpeed ?? []),
  ].filter((slug) => slug !== data.slug);
  const missingAlternatives = await findMissingPadSlugs(alternativeSlugs, status === "published");
  if (missingAlternatives.length) return jsonError(`Missing or unpublished alternatives: ${missingAlternatives.join(", ")}`, 400);
  if (data.slug !== existing.slug || (existing.status === "published" && status !== "published")) {
    const references = await getPadDependents(existing.slug, data.slug === existing.slug);
    if (references.length) return jsonError("Update referring records before renaming or unpublishing this pad", 409, references);
  }

  if (data.id !== id) return jsonError("Body data.id must match URL id", 400);
  if (data.category !== "glass" || data.surface !== "glass") return jsonError("Glasspad data must use glass category and surface", 400);
  if (data.slug !== existing.slug && await repo.getGlasspadBySlug(data.slug)) return jsonError("Slug already exists", 409);
  const row = await repo.updateGlasspad(id, { slug: data.slug, brand: data.brand, name: data.name, status, data });
  revalidateCatalog("glasspads");
  return jsonOk({ glasspad: row });
});

export const DELETE = withCatalogWrite(async (_request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const existing = await repo.getGlasspadById(id);
  if (!existing) return jsonError("Not found", 404);
  const references = await getPadDependents(existing.slug);
  if (references.length) return jsonError("Update referring records before deleting this pad", 409, references);

  const row = await repo.deleteGlasspad(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("glasspads");
  return jsonOk({ ok: true, id });
});
