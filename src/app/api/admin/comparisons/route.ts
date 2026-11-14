import { withCatalogWrite } from "@/server/catalog/write";
import { comparisonWriteSchema } from "@/schemas/comparison";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/comparisons/repo";
import { findMissingPadSlugs } from "@/server/references";
import { revalidateCatalog } from "@/server/catalog/revalidate";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ comparisons: await repo.listComparisons() });
}

export const POST = withCatalogWrite(async (request: Request) => {
  const parsed = comparisonWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;

  if (data.leftSlug === data.rightSlug) {
    return jsonError("A comparison must reference two different pads", 400);
  }

  const missing = await findMissingPadSlugs([data.leftSlug, data.rightSlug], status === "published");
  if (missing.length > 0) {
    return jsonError(`Missing or unpublished pad slug(s): ${missing.join(", ")}`, 400);
  }

  if (await repo.getComparisonBySlug(data.slug)) {
    return jsonError("Slug already exists", 409);
  }
  if (await repo.getComparisonById(data.slug)) {
    return jsonError("Id already exists", 409);
  }

  const comparison = await repo.insertComparison({
    id: data.slug,
    slug: data.slug,
    title: data.title,
    leftSlug: data.leftSlug,
    rightSlug: data.rightSlug,
    status,
    data,
  });

  revalidateCatalog("comparisons");
  return jsonOk({ comparison }, 201);
});
