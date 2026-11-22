CREATE TABLE "fragbasic_accounts"."profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text,
	"display_name" text,
	"bio" text,
	"avatar_path" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fragbasic_accounts"."setup_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"setup_id" uuid NOT NULL,
	"gear_model_id" text NOT NULL,
	"position" text NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fragbasic_accounts"."setups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text DEFAULT 'Main setup' NOT NULL,
	"visibility" text DEFAULT 'private' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."setup_items" ADD CONSTRAINT "setup_items_setup_id_setups_id_fk" FOREIGN KEY ("setup_id") REFERENCES "fragbasic_accounts"."setups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."setup_items" ADD CONSTRAINT "setup_items_gear_model_id_gear_models_id_fk" FOREIGN KEY ("gear_model_id") REFERENCES "fragbasic_accounts"."gear_models"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."setups" ADD CONSTRAINT "setups_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "fragbasic_accounts"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_username_unique" ON "fragbasic_accounts"."profiles" USING btree ("username");--> statement-breakpoint
CREATE INDEX "setup_items_setup_id_idx" ON "fragbasic_accounts"."setup_items" USING btree ("setup_id");--> statement-breakpoint
CREATE INDEX "setup_items_gear_model_id_idx" ON "fragbasic_accounts"."setup_items" USING btree ("gear_model_id");--> statement-breakpoint
CREATE UNIQUE INDEX "setup_items_setup_position_unique" ON "fragbasic_accounts"."setup_items" USING btree ("setup_id","position");--> statement-breakpoint
CREATE INDEX "setups_user_id_idx" ON "fragbasic_accounts"."setups" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "setups_user_name_unique" ON "fragbasic_accounts"."setups" USING btree ("user_id","name");
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."profiles"
  ADD CONSTRAINT "profiles_id_auth_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "profiles_username_format_check" CHECK (username IS NULL OR username ~ '^[a-z0-9_]{3,30}$'),
  ADD CONSTRAINT "profiles_display_name_length_check" CHECK (display_name IS NULL OR char_length(display_name) BETWEEN 1 AND 60),
  ADD CONSTRAINT "profiles_bio_length_check" CHECK (bio IS NULL OR char_length(bio) <= 300);
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."setups"
  ADD CONSTRAINT "setups_name_length_check" CHECK (char_length(name) BETWEEN 1 AND 60),
  ADD CONSTRAINT "setups_visibility_check" CHECK (visibility IN ('private', 'unlisted', 'public'));
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."setup_items"
  ADD CONSTRAINT "setup_items_position_check" CHECK (position IN ('mouse', 'keyboard', 'monitor', 'mousepad', 'iem'));
--> statement-breakpoint
CREATE OR REPLACE FUNCTION "fragbasic_accounts"."create_profile_for_auth_user"()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO "fragbasic_accounts"."profiles" (id, display_name)
  VALUES (NEW.id, NULLIF(NEW.raw_user_meta_data ->> 'display_name', ''))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO "fragbasic_accounts"."setups" (user_id, name)
  VALUES (NEW.id, 'Main setup')
  ON CONFLICT (user_id, name) DO NOTHING;
  RETURN NEW;
END;
$$;
--> statement-breakpoint
DROP TRIGGER IF EXISTS "create_fragbasic_profile" ON "auth"."users";
CREATE TRIGGER "create_fragbasic_profile"
AFTER INSERT ON "auth"."users"
FOR EACH ROW EXECUTE FUNCTION "fragbasic_accounts"."create_profile_for_auth_user"();
--> statement-breakpoint
INSERT INTO "fragbasic_accounts"."profiles" (id, display_name)
SELECT id, NULLIF(raw_user_meta_data ->> 'display_name', '')
FROM "auth"."users"
ON CONFLICT (id) DO NOTHING;
--> statement-breakpoint
INSERT INTO "fragbasic_accounts"."setups" (user_id, name)
SELECT id, 'Main setup' FROM "fragbasic_accounts"."profiles"
ON CONFLICT (user_id, name) DO NOTHING;
--> statement-breakpoint
INSERT INTO "fragbasic_accounts"."gear_models" (id, category, brand, model, source, position)
SELECT 'mousepad:review:' || id, 'mousepad', brand, name, '/mousepads/' || slug, 10000
FROM "public"."mousepads" WHERE status = 'published'
ON CONFLICT (id) DO NOTHING;
--> statement-breakpoint
INSERT INTO "fragbasic_accounts"."gear_models" (id, category, brand, model, source, position)
SELECT 'mousepad:review:' || id, 'mousepad', brand, name, '/mousepads/' || slug, 10000
FROM "public"."glasspads" WHERE status = 'published'
ON CONFLICT (id) DO NOTHING;
--> statement-breakpoint
INSERT INTO "fragbasic_accounts"."gear_models" (id, category, brand, model, source, position)
SELECT 'iem:review:' || id, 'iem', brand, name, '/iems/' || slug, 10000
FROM "public"."iems" WHERE status = 'published'
ON CONFLICT (id) DO NOTHING;
--> statement-breakpoint
INSERT INTO "fragbasic_accounts"."setup_items" (setup_id, gear_model_id, position)
SELECT setup.id, selection.value, selection.key
FROM "auth"."users" auth_user
JOIN "fragbasic_accounts"."setups" setup ON setup.user_id = auth_user.id AND setup.name = 'Main setup'
CROSS JOIN LATERAL jsonb_each_text(COALESCE(auth_user.raw_user_meta_data -> 'fragbasic_setup', '{}'::jsonb)) selection
JOIN "fragbasic_accounts"."gear_models" gear ON gear.id = selection.value AND gear.category = selection.key
ON CONFLICT (setup_id, position) DO NOTHING;
--> statement-breakpoint
UPDATE "auth"."users"
SET raw_user_meta_data = raw_user_meta_data - 'fragbasic_setup'
WHERE raw_user_meta_data ? 'fragbasic_setup';
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "fragbasic_accounts"."setups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "fragbasic_accounts"."setup_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "fragbasic_accounts"."gear_models" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY "profiles_select_own" ON "fragbasic_accounts"."profiles" FOR SELECT TO authenticated USING ((SELECT auth.uid()) = id);
CREATE POLICY "profiles_update_own" ON "fragbasic_accounts"."profiles" FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = id) WITH CHECK ((SELECT auth.uid()) = id);
CREATE POLICY "setups_select_visible" ON "fragbasic_accounts"."setups" FOR SELECT TO anon, authenticated USING (visibility = 'public' OR (SELECT auth.uid()) = user_id);
CREATE POLICY "setups_insert_own" ON "fragbasic_accounts"."setups" FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "setups_update_own" ON "fragbasic_accounts"."setups" FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "setups_delete_own" ON "fragbasic_accounts"."setups" FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "setup_items_select_visible" ON "fragbasic_accounts"."setup_items" FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM "fragbasic_accounts"."setups" setup WHERE setup.id = setup_id AND (setup.visibility = 'public' OR setup.user_id = (SELECT auth.uid()))));
CREATE POLICY "setup_items_insert_own" ON "fragbasic_accounts"."setup_items" FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM "fragbasic_accounts"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid())));
CREATE POLICY "setup_items_update_own" ON "fragbasic_accounts"."setup_items" FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM "fragbasic_accounts"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid()))) WITH CHECK (EXISTS (SELECT 1 FROM "fragbasic_accounts"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid())));
CREATE POLICY "setup_items_delete_own" ON "fragbasic_accounts"."setup_items" FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM "fragbasic_accounts"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid())));
CREATE POLICY "gear_models_read" ON "fragbasic_accounts"."gear_models" FOR SELECT TO anon, authenticated USING (true);
--> statement-breakpoint
GRANT USAGE ON SCHEMA "fragbasic_accounts" TO anon, authenticated;
GRANT SELECT ON "fragbasic_accounts"."gear_models" TO anon, authenticated;
GRANT SELECT ON "fragbasic_accounts"."setups", "fragbasic_accounts"."setup_items" TO anon;
GRANT SELECT, UPDATE ON "fragbasic_accounts"."profiles" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON "fragbasic_accounts"."setups", "fragbasic_accounts"."setup_items" TO authenticated;
