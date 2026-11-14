import { AsyncLocalStorage } from "node:async_hooks";
import { sql } from "drizzle-orm";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not configured");
}

const client = postgres(url, {
  prepare: false,
  max: 1,
});

const database = drizzle(client, { schema });
type Transaction = Parameters<Parameters<typeof database.transaction>[0]>[0];
const catalogTransactions = new AsyncLocalStorage<Transaction>();

// Repositories share the active transaction without passing it through every
// reader. Unrelated concurrent requests continue to use the regular client.
export const db = new Proxy(database, {
  get(target, property) {
    const active = catalogTransactions.getStore() ?? target;
    const value = Reflect.get(active, property);
    return typeof value === "function" ? value.bind(active) : value;
  },
});

export async function withCatalogTransaction<T>(operation: () => Promise<T>): Promise<T> {
  return database.transaction(async (transaction) => {
    await transaction.execute(sql`select pg_advisory_xact_lock(781230401)`);
    return catalogTransactions.run(transaction, operation);
  });
}
export { schema };
