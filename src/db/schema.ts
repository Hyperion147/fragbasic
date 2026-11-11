import type { MousepadInput } from "@/schemas/mousepad";
import type { MouseSkateInput } from "@/schemas/accessory";
import type { IemInput } from "@/schemas/iem";
import type { ComparisonDataInput } from "@/schemas/comparison";
import type { BestPageDataInput } from "@/schemas/best-page";
import type { GuideDataInput } from "@/schemas/guide";
import { jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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

/**
 * Small site-wide documents that do not fit the catalog tables.
 * The first key is `latest-added`, which stores the curated "new to the
 * database" slug lists shown on the home page.
 */
export const siteSettings = pgTable("site_settings", {
    key: text("key").primaryKey(),
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export type SiteSettingRow = typeof siteSettings.$inferSelect;
export type NewSiteSettingRow = typeof siteSettings.$inferInsert;
