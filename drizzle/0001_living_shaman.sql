CREATE TYPE "public"."best_page_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."comparison_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "best_pages" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"status" "best_page_status" DEFAULT 'published' NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "best_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "comparisons" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"left_slug" text NOT NULL,
	"right_slug" text NOT NULL,
	"status" "comparison_status" DEFAULT 'published' NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "comparisons_slug_unique" UNIQUE("slug")
);
