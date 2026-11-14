import { withCatalogTransaction } from "@/db";
import { jsonError } from "@/server/api";
import { requireAdmin } from "@/server/auth";

/** Serialize catalog writes, so reference checks and cross-table uniqueness
 * checks cannot race a concurrent publish, rename, or delete in another worker. */
export function withCatalogWrite<Args extends unknown[]>(handler: (...args: Args) => Promise<Response>) {
  return async (...args: Args) => {
    if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
    return withCatalogTransaction(() => handler(...args));
  };
}
