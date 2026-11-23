import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { accountProfiles, accountSetups, accountSetupItems, setupGearModels } from "@/db/schema";
import type { SetupCategory, SetupModel } from "@/features/setup-catalog/catalog";

export type AccountProfile = typeof accountProfiles.$inferSelect;
export type AccountSetup = typeof accountSetups.$inferSelect & {
  selections: Partial<Record<SetupCategory, string>>;
  gear: Partial<Record<SetupCategory, SetupModel>>;
};

const setupSelection = {
  setup: accountSetups,
  position: accountSetupItems.position,
  gearModelId: accountSetupItems.gearModelId,
  gearBrand: setupGearModels.brand,
  gearModel: setupGearModels.model,
  gearSource: setupGearModels.source,
};

function collectSetups(rows: { setup: typeof accountSetups.$inferSelect; position: string | null; gearModelId: string | null; gearBrand: string | null; gearModel: string | null; gearSource: string | null }[]) {
  const setups = new Map<string, AccountSetup>();
  for (const row of rows) {
    const setup = setups.get(row.setup.id) ?? { ...row.setup, selections: {}, gear: {} };
    if (row.position && row.gearModelId) {
      const category = row.position as SetupCategory;
      setup.selections[category] = row.gearModelId;
      if (row.gearBrand && row.gearModel && row.gearSource) setup.gear[category] = {
        id: row.gearModelId, brand: row.gearBrand, model: row.gearModel, source: row.gearSource,
      };
    }
    setups.set(row.setup.id, setup);
  }
  return [...setups.values()];
}

export async function ensureAccount(userId: string) {
  await db.insert(accountProfiles).values({ id: userId }).onConflictDoNothing();
  await db.insert(accountSetups).values({ userId, name: "Main setup" }).onConflictDoNothing();
}

export async function getAccountWorkspace(userId: string) {
  await ensureAccount(userId);
  const [profile, setupRows] = await Promise.all([
    db.query.accountProfiles.findFirst({ where: eq(accountProfiles.id, userId) }),
    db.select(setupSelection).from(accountSetups)
      .leftJoin(accountSetupItems, eq(accountSetupItems.setupId, accountSetups.id))
      .leftJoin(setupGearModels, eq(setupGearModels.id, accountSetupItems.gearModelId))
      .where(eq(accountSetups.userId, userId))
      .orderBy(asc(accountSetups.createdAt), asc(accountSetupItems.position)),
  ]);
  return { profile: profile!, setups: collectSetups(setupRows) };
}

export async function getPublicAccountProfile(username: string) {
  const profile = await db.query.accountProfiles.findFirst({
    where: and(eq(accountProfiles.username, username), eq(accountProfiles.visibility, "public")),
  });
  if (!profile) return null;
  const setupRows = await db.select(setupSelection).from(accountSetups)
    .leftJoin(accountSetupItems, eq(accountSetupItems.setupId, accountSetups.id))
    .leftJoin(setupGearModels, eq(setupGearModels.id, accountSetupItems.gearModelId))
    .where(and(eq(accountSetups.userId, profile.id), eq(accountSetups.visibility, "public")))
    .orderBy(asc(accountSetups.createdAt), asc(accountSetupItems.position));
  return { profile, setups: collectSetups(setupRows) };
}

export async function createAccountSetup(userId: string, name: string) {
  await ensureAccount(userId);
  const [created] = await db.insert(accountSetups).values({ userId, name }).returning({ id: accountSetups.id });
  return created.id;
}

export async function updateAccountProfile(userId: string, values: { username: string | null; displayName: string | null; bio: string | null; visibility: "private" | "public" }) {
  await ensureAccount(userId);
  await db.update(accountProfiles).set({ ...values, updatedAt: new Date() }).where(eq(accountProfiles.id, userId));
}

export async function replaceAccountSetup({ userId, setupId, name, visibility, selections, models }: {
  userId: string;
  setupId: string;
  name: string;
  visibility: "private" | "unlisted" | "public";
  selections: Partial<Record<SetupCategory, string>>;
  models: (SetupModel & { category: SetupCategory })[];
}) {
  const owned = await db.query.accountSetups.findFirst({
    columns: { id: true },
    where: and(eq(accountSetups.id, setupId), eq(accountSetups.userId, userId)),
  });
  if (!owned) return false;
  await db.transaction(async (transaction) => {
    if (models.length) await transaction.insert(setupGearModels).values(models.map(({ category, ...model }, position) => ({
      ...model,
      category,
      position: 10000 + position,
    }))).onConflictDoNothing();
    await transaction.update(accountSetups).set({ name, visibility, updatedAt: new Date() })
      .where(and(eq(accountSetups.id, setupId), eq(accountSetups.userId, userId)));
    await transaction.delete(accountSetupItems).where(eq(accountSetupItems.setupId, setupId));
    const items = Object.entries(selections).map(([position, gearModelId]) => ({
      setupId,
      gearModelId,
      position: position as SetupCategory,
    }));
    if (items.length) await transaction.insert(accountSetupItems).values(items);
  });
  return true;
}
