import type { MousepadInput } from "@/schemas/mousepad";
import type { MouseSkateInput } from "@/schemas/accessory";
import type { IemInput } from "@/schemas/iem";
import type { ComparisonDataInput } from "@/schemas/comparison";
import type { BestPageDataInput } from "@/schemas/best-page";
import type { GuideDataInput } from "@/schemas/guide";
import { relations, sql } from "drizzle-orm";
import { foreignKey, index, integer, jsonb, pgEnum, pgPolicy, pgRole, pgTable, text, timestamp, unique, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const mousepadStatusEnum = pgEnum("mousepad_status", [
    "draft",
    "published",
]);

export const mousepads = pgTable("mousepads", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    brand: text("brand").notNull(),
    name: text("name").notNull(),
    status: mousepadStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<MousepadInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export const glasspadStatusEnum = pgEnum("glasspad_status", ["draft", "published"]);
export const glasspads = pgTable("glasspads", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    brand: text("brand").notNull(),
    name: text("name").notNull(),
    status: glasspadStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<MousepadInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const iemStatusEnum = pgEnum("iem_status", ["draft", "published"]);
export const iems = pgTable("iems", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    brand: text("brand").notNull(),
    name: text("name").notNull(),
    status: iemStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<IemInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const accessoryStatusEnum = pgEnum("accessory_status", ["draft", "published"]);
export const mouseSkates = pgTable("mouse_skates", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    brand: text("brand").notNull(),
    name: text("name").notNull(),
    status: accessoryStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<MouseSkateInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MousepadRow = typeof mousepads.$inferSelect;
export type NewMousepadRow = typeof mousepads.$inferInsert;
export type GlasspadRow = typeof glasspads.$inferSelect;
export type NewGlasspadRow = typeof glasspads.$inferInsert;
export type IemRow = typeof iems.$inferSelect;
export type NewIemRow = typeof iems.$inferInsert;
export type MouseSkateRow = typeof mouseSkates.$inferSelect;
export type NewMouseSkateRow = typeof mouseSkates.$inferInsert;

export const comparisonStatusEnum = pgEnum("comparison_status", [
    "draft",
    "published",
]);

export const comparisons = pgTable("comparisons", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    leftSlug: text("left_slug").notNull(),
    rightSlug: text("right_slug").notNull(),
    status: comparisonStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<ComparisonDataInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bestPageStatusEnum = pgEnum("best_page_status", [
    "draft",
    "published",
]);

export const bestPages = pgTable("best_pages", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    status: bestPageStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<BestPageDataInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const guideStatusEnum = pgEnum("guide_status", ["draft", "published"]);

export const guides = pgTable("guides", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    status: guideStatusEnum("status").notNull().default("published"),
    data: jsonb("data").$type<GuideDataInput>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ComparisonRow = typeof comparisons.$inferSelect;
export type NewComparisonRow = typeof comparisons.$inferInsert;
export type BestPageRow = typeof bestPages.$inferSelect;
export type NewBestPageRow = typeof bestPages.$inferInsert;
export type GuideRow = typeof guides.$inferSelect;
export type NewGuideRow = typeof guides.$inferInsert;

// Accounts use normalized public tables so Supabase can expose their relationships.
export const anonRole = pgRole("anon").existing();
export const authenticatedRole = pgRole("authenticated").existing();

export const setupGearModels = pgTable("gear_models", {
    id: text("id").primaryKey(),
    category: text("category", { enum: ["mouse", "keyboard", "monitor", "mousepad", "iem"] }).notNull(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    source: text("source").notNull(),
    position: integer("position").notNull(),
}, (table) => [
    unique("gear_models_id_category_unique").on(table.id, table.category),
    pgPolicy("gear_models_read", { for: "select", to: [anonRole, authenticatedRole], using: sql`true` }),
]).enableRLS();

export const accountProfiles = pgTable("accounts", {
    id: uuid("id").primaryKey(),
    username: text("username"),
    displayName: text("display_name"),
    bio: text("bio"),
    avatarPath: text("avatar_path"),
    visibility: text("visibility", { enum: ["private", "public"] }).notNull().default("private"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex("accounts_username_unique").on(table.username),
    pgPolicy("accounts_select_visible", { for: "select", to: [anonRole, authenticatedRole], using: sql`${table.visibility} = 'public' OR (SELECT auth.uid()) = ${table.id}` }),
    pgPolicy("accounts_update_own", { for: "update", to: authenticatedRole, using: sql`(SELECT auth.uid()) = ${table.id}`, withCheck: sql`(SELECT auth.uid()) = ${table.id}` }),
]).enableRLS();

export const accountSetups = pgTable("setups", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => accountProfiles.id, { onDelete: "cascade" }),
    name: text("name").notNull().default("Main setup"),
    visibility: text("visibility", { enum: ["private", "unlisted", "public"] }).notNull().default("private"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index("setups_user_id_idx").on(table.userId),
    uniqueIndex("setups_user_name_unique").on(table.userId, table.name),
    pgPolicy("setups_select_visible", { for: "select", to: [anonRole, authenticatedRole], using: sql`${table.visibility} = 'public' OR (SELECT auth.uid()) = ${table.userId}` }),
    pgPolicy("setups_insert_own", { for: "insert", to: authenticatedRole, withCheck: sql`(SELECT auth.uid()) = ${table.userId}` }),
    pgPolicy("setups_update_own", { for: "update", to: authenticatedRole, using: sql`(SELECT auth.uid()) = ${table.userId}`, withCheck: sql`(SELECT auth.uid()) = ${table.userId}` }),
    pgPolicy("setups_delete_own", { for: "delete", to: authenticatedRole, using: sql`(SELECT auth.uid()) = ${table.userId}` }),
]).enableRLS();

export const accountSetupItems = pgTable("setup_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    setupId: uuid("setup_id").notNull().references(() => accountSetups.id, { onDelete: "cascade" }),
    gearModelId: text("gear_model_id").notNull(),
    position: text("position", { enum: ["mouse", "keyboard", "monitor", "mousepad", "iem"] }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index("setup_items_setup_id_idx").on(table.setupId),
    index("setup_items_gear_model_id_idx").on(table.gearModelId),
    uniqueIndex("setup_items_setup_position_unique").on(table.setupId, table.position),
    foreignKey({
        name: "setup_items_model_category_fk",
        columns: [table.gearModelId, table.position],
        foreignColumns: [setupGearModels.id, setupGearModels.category],
    }).onDelete("restrict"),
    pgPolicy("setup_items_select_visible", { for: "select", to: [anonRole, authenticatedRole], using: sql`EXISTS (SELECT 1 FROM "setups" setup WHERE setup.id = ${table.setupId} AND (setup.visibility = 'public' OR setup.user_id = (SELECT auth.uid())))` }),
    pgPolicy("setup_items_insert_own", { for: "insert", to: authenticatedRole, withCheck: sql`EXISTS (SELECT 1 FROM "setups" setup WHERE setup.id = ${table.setupId} AND setup.user_id = (SELECT auth.uid()))` }),
    pgPolicy("setup_items_update_own", { for: "update", to: authenticatedRole, using: sql`EXISTS (SELECT 1 FROM "setups" setup WHERE setup.id = ${table.setupId} AND setup.user_id = (SELECT auth.uid()))`, withCheck: sql`EXISTS (SELECT 1 FROM "setups" setup WHERE setup.id = ${table.setupId} AND setup.user_id = (SELECT auth.uid()))` }),
    pgPolicy("setup_items_delete_own", { for: "delete", to: authenticatedRole, using: sql`EXISTS (SELECT 1 FROM "setups" setup WHERE setup.id = ${table.setupId} AND setup.user_id = (SELECT auth.uid()))` }),
]).enableRLS();

export const accountProfilesRelations = relations(accountProfiles, ({ many }) => ({ setups: many(accountSetups) }));
export const accountSetupsRelations = relations(accountSetups, ({ one, many }) => ({
    profile: one(accountProfiles, { fields: [accountSetups.userId], references: [accountProfiles.id] }),
    items: many(accountSetupItems),
}));
export const accountSetupItemsRelations = relations(accountSetupItems, ({ one }) => ({
    setup: one(accountSetups, { fields: [accountSetupItems.setupId], references: [accountSetups.id] }),
    gearModel: one(setupGearModels, { fields: [accountSetupItems.gearModelId], references: [setupGearModels.id] }),
}));
export const setupGearModelsRelations = relations(setupGearModels, ({ many }) => ({ setupItems: many(accountSetupItems) }));
