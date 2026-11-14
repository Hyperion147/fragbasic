import { getMousepadBySlug } from "@/server/mousepads/repo";
import { findMissingPadSlugs } from "@/server/references";
import { withCatalogWrite } from "@/server/catalog/write";
import { mousepadWriteSchema } from "@/schemas/mousepad";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/glasspads/repo";
import { revalidateCatalog } from "@/server/catalog/revalidate";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ glasspads: await repo.listGlasspads() });
}

export const POST = withCatalogWrite(async (request: Request) => {
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

  if (data.category !== "glass" || data.surface !== "glass") return jsonError("Glasspad data must use glass category and surface", 400);
  if (await repo.getGlasspadBySlug(data.slug)) return jsonError("Slug already exists", 409);
  if (await repo.getGlasspadById(data.id)) return jsonError("Id already exists", 409);
  const glasspad = await repo.insertGlasspad({ id: data.id, slug: data.slug, brand: data.brand, name: data.name, status, data });
  revalidateCatalog("glasspads");
  return jsonOk({ glasspad }, 201);
});
