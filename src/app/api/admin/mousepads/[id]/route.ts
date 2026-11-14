import { getGlasspadBySlug } from "@/server/glasspads/repo";
import { getPadDependents, findMissingPadSlugs } from "@/server/references";
import { withCatalogWrite } from "@/server/catalog/write";
import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { mousepadWriteSchema } from "@/schemas/mousepad";
import * as repo from "@/server/mousepads/repo";
import { revalidateCatalog } from "@/server/catalog/revalidate";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const { id } = await ctx.params;
  const row = await repo.getMousepadById(id);
  if (!row) return jsonError("Not found", 404);
  return jsonOk({ mousepad: row });
}

export const PATCH = withCatalogWrite(async (req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const existing = await repo.getMousepadById(id);
  if (!existing) return jsonError("Not found", 404);

  const body = await req.json().catch(() => null);
  const parsed = mousepadWriteSchema.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);

  const { status, data } = parsed.data;

  if (await getGlasspadBySlug(data.slug)) return jsonError("Slug already exists in the other pad catalog", 409);
  const alternativeSlugs = [
    ...(data.relatedAlternatives?.similarFeeling ?? []),
    ...(data.relatedAlternatives?.moreControl ?? []),
    ...(data.relatedAlternatives?.moreSpeed ?? []),
  ].filter((slug) => slug !== data.slug);
  const missingAlternatives = await findMissingPadSlugs(alternativeSlugs, status === "published");
  if (missingAlternatives.length) return jsonError(`Missing or unpublished alternatives: ${missingAlternatives.join(", ")}`, 400);
  if (data.category === "glass" || data.surface === "glass") return jsonError("Use the glasspad catalog for glass surfaces", 400);
  if (data.slug !== existing.slug || (existing.status === "published" && status !== "published")) {
    const references = await getPadDependents(existing.slug, data.slug === existing.slug);
    if (references.length) return jsonError("Update referring records before renaming or unpublishing this pad", 409, references);
  }

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

  revalidateCatalog("mousepads");
  return jsonOk({ mousepad: row });
});

export const DELETE = withCatalogWrite(async (_req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const existing = await repo.getMousepadById(id);
  if (!existing) return jsonError("Not found", 404);
  const references = await getPadDependents(existing.slug);
  if (references.length) return jsonError("Update referring records before deleting this pad", 409, references);

  const row = await repo.deleteMousepad(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("mousepads");
  return jsonOk({ ok: true, id });
});
