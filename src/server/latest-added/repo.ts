import { eq } from "drizzle-orm";

import { db } from "@/db";
import { siteSettings, type SiteSettingRow } from "@/db/schema";
import {
  LATEST_ADDED_KEY,
  latestAddedDataSchema,
  type LatestAddedDataInput,
} from "@/schemas/latest-added";

export async function getSiteSetting(
  key: string,
): Promise<SiteSettingRow | null> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  return rows[0] ?? null;
}

export async function getLatestAdded(): Promise<LatestAddedDataInput | null> {
  const row = await getSiteSetting(LATEST_ADDED_KEY);
  if (!row) return null;

  const parsed = latestAddedDataSchema.safeParse(row.data);
  return parsed.success ? parsed.data : null;
}

export async function saveLatestAdded(
  data: LatestAddedDataInput,
): Promise<SiteSettingRow> {
  const rows = await db
    .insert(siteSettings)
    .values({ key: LATEST_ADDED_KEY, data })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { data, updatedAt: new Date() },
    })
    .returning();

  return rows[0];
}
