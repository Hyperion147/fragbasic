import { getGlasspadBySlug } from "@/server/glasspads/repo";
import { findMissingPadSlugs } from "@/server/references";
import { withCatalogWrite } from "@/server/catalog/write";
import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { mousepadWriteSchema } from "@/schemas/mousepad";
import * as repo from "@/server/mousepads/repo";
import { revalidateCatalog } from "@/server/catalog/revalidate";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const rows = await repo.listMousepads();
  return jsonOk({ mousepads: rows });
}

export const POST = withCatalogWrite(async (req: Request) => {
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

  const bySlug = await repo.getMousepadBySlug(data.slug);
  if (bySlug) return jsonError("Slug already exists", 409);

  const byId = await repo.getMousepadById(data.id);
  if (byId) return jsonError("Id already exists", 409);

  const row = await repo.insertMousepad({
    id: data.id,
    slug: data.slug,
    brand: data.brand,
    name: data.name,
    status,
    data,
  });

  revalidateCatalog("mousepads");
  return jsonOk({ mousepad: row }, 201);
});
