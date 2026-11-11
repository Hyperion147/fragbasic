import { LATEST_ADDED_KEY, latestAddedWriteSchema } from "@/schemas/latest-added";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/latest-added/repo";
import { revalidateCatalog } from "@/server/catalog/revalidate";
import {
  findMissingGlasspadSlugs,
  findMissingIemSlugs,
  findMissingMousepadSlugs,
} from "@/server/references";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const row = await repo.getSiteSetting(LATEST_ADDED_KEY);
  return jsonOk({ latestAdded: row });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const parsed = latestAddedWriteSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return zodError(parsed.error);

  const { data } = parsed.data;
  const [missingMousepads, missingGlasspads, missingIems] = await Promise.all([
    findMissingMousepadSlugs(data.mousepads),
    findMissingGlasspadSlugs(data.glasspads),
    findMissingIemSlugs(data.iems),
  ]);

  if (missingMousepads.length > 0) {
    return jsonError(
      `Unknown mousepad slug(s): ${missingMousepads.join(", ")}`,
      400,
    );
  }
  if (missingGlasspads.length > 0) {
    return jsonError(
      `Unknown glasspad slug(s): ${missingGlasspads.join(", ")}`,
      400,
    );
  }
  if (missingIems.length > 0) {
    return jsonError(`Unknown IEM slug(s): ${missingIems.join(", ")}`, 400);
  }

  const latestAdded = await repo.saveLatestAdded(data);
  revalidateCatalog("latest-added");
  return jsonOk({ latestAdded });
}
