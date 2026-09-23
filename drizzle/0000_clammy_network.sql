CREATE TYPE "public"."accessory_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."glasspad_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."iem_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."mousepad_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "glasspads" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"brand" text NOT NULL,
	"name" text NOT NULL,
	"status" "glasspad_status" DEFAULT 'published' NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "glasspads_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "iems" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"brand" text NOT NULL,
	"name" text NOT NULL,
	"status" "iem_status" DEFAULT 'published' NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "iems_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "mouse_skates" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"brand" text NOT NULL,
	"name" text NOT NULL,
	"status" "accessory_status" DEFAULT 'published' NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mouse_skates_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "mousepads" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"brand" text NOT NULL,
	"name" text NOT NULL,
	"status" "mousepad_status" DEFAULT 'published' NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mousepads_slug_unique" UNIQUE("slug")
);
