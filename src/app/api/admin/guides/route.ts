import { guideWriteSchema } from "@/schemas/guide";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import { revalidateCatalog } from "@/server/catalog/revalidate";
import * as repo from "@/server/guides/repo";
import { findMissingPadSlugs } from "@/server/references";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ guides: await repo.listGuides() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const parsed = guideWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  const missing = await findMissingPadSlugs(data.relatedPadSlugs);
  if (missing.length > 0) {
    return jsonError(`Unknown pad slug(s): ${missing.join(", ")}`, 400);
  }

  if (await repo.getGuideBySlug(data.slug)) {
    return jsonError("Slug already exists", 409);
  }
  if (await repo.getGuideById(data.slug)) {
    return jsonError("Id already exists", 409);
  }

  const guide = await repo.insertGuide({
    id: data.slug,
    slug: data.slug,
    title: data.title,
    status,
    data,
  });

  revalidateCatalog("guides");
  return jsonOk({ guide }, 201);
}
