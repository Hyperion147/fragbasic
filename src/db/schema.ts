import type { MousepadInput } from "@/schemas/mousepad";
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

export type MousepadRow = typeof mousepads.$inferSelect;
export type NewMousepadRow = typeof mousepads.$inferInsert;
