import { withCatalogWrite } from "@/server/catalog/write";
import { bestPageWriteSchema } from "@/schemas/best-page";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/best-pages/repo";
import { findMissingPadSlugs } from "@/server/references";
import { revalidateCatalog } from "@/server/catalog/revalidate";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ bestPages: await repo.listBestPages() });
}

export const POST = withCatalogWrite(async (request: Request) => {
  const parsed = bestPageWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  const missing = await findMissingPadSlugs(
    data.pickSlugs.map((pick) => pick.slug), status === "published",
  );
  if (missing.length > 0) {
    return jsonError(`Missing or unpublished pad slug(s): ${missing.join(", ")}`, 400);
  }

  if (await repo.getBestPageBySlug(data.slug)) {
    return jsonError("Slug already exists", 409);
  }
  if (await repo.getBestPageById(data.slug)) {
    return jsonError("Id already exists", 409);
  }

  const bestPage = await repo.insertBestPage({
    id: data.slug,
    slug: data.slug,
    title: data.title,
    status,
    data,
  });

  revalidateCatalog("best-pages");
  return jsonOk({ bestPage }, 201);
});
