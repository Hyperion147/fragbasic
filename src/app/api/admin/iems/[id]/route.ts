import { withCatalogWrite } from "@/server/catalog/write";
import { iemWriteSchema } from "@/schemas/iem";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/iems/repo";
import { revalidateCatalog } from "@/server/catalog/revalidate";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getIemById((await context.params).id);
  return row ? jsonOk({ iem: row }) : jsonError("Not found", 404);
}

export const PATCH = withCatalogWrite(async (request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const existing = await repo.getIemById(id);
  if (!existing) return jsonError("Not found", 404);
  const parsed = iemWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;
  if (data.id !== id) return jsonError("Body data.id must match URL id", 400);
  if (data.slug !== existing.slug && await repo.getIemBySlug(data.slug)) return jsonError("Slug already exists", 409);
  const row = await repo.updateIem(id, { slug: data.slug, brand: data.brand, name: data.name, status, data });
  revalidateCatalog("iems");
  return jsonOk({ iem: row });
});

export const DELETE = withCatalogWrite(async (_request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const row = await repo.deleteIem(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("iems");
  return jsonOk({ ok: true, id });
});
