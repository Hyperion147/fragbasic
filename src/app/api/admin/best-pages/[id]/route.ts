import { withCatalogWrite } from "@/server/catalog/write";
import { bestPageWriteSchema } from "@/schemas/best-page";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/best-pages/repo";
import { findMissingPadSlugs } from "@/server/references";
import { revalidateCatalog } from "@/server/catalog/revalidate";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getBestPageById((await context.params).id);
  return row ? jsonOk({ bestPage: row }) : jsonError("Not found", 404);
}

export const PATCH = withCatalogWrite(async (request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const existing = await repo.getBestPageById(id);
  if (!existing) return jsonError("Not found", 404);

  const parsed = bestPageWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  if (data.slug !== existing.slug) {
    const clash = await repo.getBestPageBySlug(data.slug);
    if (clash && clash.id !== id) return jsonError("Slug already exists", 409);
  }

  const missing = await findMissingPadSlugs(
    data.pickSlugs.map((pick) => pick.slug), status === "published",
  );
  if (missing.length > 0) {
    return jsonError(`Missing or unpublished pad slug(s): ${missing.join(", ")}`, 400);
  }

  const bestPage = await repo.updateBestPage(id, {
    id: data.slug,
    slug: data.slug,
    title: data.title,
    status,
    data,
  });

  revalidateCatalog("best-pages");
  return jsonOk({ bestPage });
});

export const DELETE = withCatalogWrite(async (_request: Request, context: Ctx) => {
  const id = (await context.params).id;
  const row = await repo.deleteBestPage(id);
  if (!row) return jsonError("Not found", 404);
  revalidateCatalog("best-pages");
  return jsonOk({ ok: true, id });
});
