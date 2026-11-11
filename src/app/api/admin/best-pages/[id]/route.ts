import { bestPageWriteSchema } from "@/schemas/best-page";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/best-pages/repo";
import { findMissingPadSlugs } from "@/server/references";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getBestPageById((await context.params).id);
  return row ? jsonOk({ bestPage: row }) : jsonError("Not found", 404);
}

export async function PATCH(request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
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
    data.pickSlugs.map((pick) => pick.slug),
  );
  if (missing.length > 0) {
    return jsonError(`Unknown pad slug(s): ${missing.join(", ")}`, 400);
  }

  return jsonOk({
    bestPage: await repo.updateBestPage(id, {
      id: data.slug,
      slug: data.slug,
      title: data.title,
      status,
      data,
    }),
  });
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const id = (await context.params).id;
  const row = await repo.deleteBestPage(id);
  return row ? jsonOk({ ok: true, id }) : jsonError("Not found", 404);
}
