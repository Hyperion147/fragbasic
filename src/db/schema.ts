import type { MousepadInput } from "@/schemas/mousepad";
import type { MouseSkateInput } from "@/schemas/accessory";
import type { IemInput } from "@/schemas/iem";
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
export type IemRow = typeof iems.$inferSelect;
export type NewIemRow = typeof iems.$inferInsert;
export type MouseSkateRow = typeof mouseSkates.$inferSelect;
export type NewMouseSkateRow = typeof mouseSkates.$inferInsert;
