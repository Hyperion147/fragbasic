DROP POLICY IF EXISTS "profiles_select_own" ON "fragbasic_accounts"."profiles";
DROP POLICY IF EXISTS "profiles_update_own" ON "fragbasic_accounts"."profiles";
DROP POLICY IF EXISTS "setups_select_visible" ON "fragbasic_accounts"."setups";
DROP POLICY IF EXISTS "setups_insert_own" ON "fragbasic_accounts"."setups";
DROP POLICY IF EXISTS "setups_update_own" ON "fragbasic_accounts"."setups";
DROP POLICY IF EXISTS "setups_delete_own" ON "fragbasic_accounts"."setups";
DROP POLICY IF EXISTS "setup_items_select_visible" ON "fragbasic_accounts"."setup_items";
DROP POLICY IF EXISTS "setup_items_insert_own" ON "fragbasic_accounts"."setup_items";
DROP POLICY IF EXISTS "setup_items_update_own" ON "fragbasic_accounts"."setup_items";
DROP POLICY IF EXISTS "setup_items_delete_own" ON "fragbasic_accounts"."setup_items";
DROP POLICY IF EXISTS "gear_models_read" ON "fragbasic_accounts"."gear_models";
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."gear_models" SET SCHEMA "public";
ALTER TABLE "fragbasic_accounts"."profiles" SET SCHEMA "public";
ALTER TABLE "public"."profiles" RENAME TO "accounts";
ALTER TABLE "fragbasic_accounts"."setups" SET SCHEMA "public";
ALTER TABLE "fragbasic_accounts"."setup_items" SET SCHEMA "public";
--> statement-breakpoint
ALTER TABLE "public"."accounts" ADD COLUMN "visibility" text DEFAULT 'private' NOT NULL;
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_visibility_check" CHECK (visibility IN ('private', 'public'));
ALTER TABLE "public"."accounts" RENAME CONSTRAINT "profiles_id_auth_users_id_fk" TO "accounts_id_auth_users_id_fk";
ALTER TABLE "public"."setups" RENAME CONSTRAINT "setups_user_id_profiles_id_fk" TO "setups_user_id_accounts_id_fk";
ALTER INDEX "public"."profiles_username_unique" RENAME TO "accounts_username_unique";
ALTER TABLE "public"."gear_models" ADD CONSTRAINT "gear_models_id_category_unique" UNIQUE USING INDEX "gear_models_id_category_unique";
--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."create_account_for_auth_user"()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO "public"."accounts" (id, display_name)
  VALUES (NEW.id, NULLIF(NEW.raw_user_meta_data ->> 'display_name', ''))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO "public"."setups" (user_id, name)
  VALUES (NEW.id, 'Main setup')
  ON CONFLICT (user_id, name) DO NOTHING;
  RETURN NEW;
END;
$$;
--> statement-breakpoint
DROP TRIGGER IF EXISTS "create_fragbasic_profile" ON "auth"."users";
CREATE TRIGGER "create_fragbasic_account"
AFTER INSERT ON "auth"."users"
FOR EACH ROW EXECUTE FUNCTION "public"."create_account_for_auth_user"();
DROP FUNCTION IF EXISTS "fragbasic_accounts"."create_profile_for_auth_user"();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."delete_account_for_auth_user"()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM "public"."accounts" WHERE id = OLD.id;
  RETURN OLD;
END;
$$;
DROP TRIGGER IF EXISTS "delete_fragbasic_account" ON "auth"."users";
CREATE TRIGGER "delete_fragbasic_account"
AFTER DELETE ON "auth"."users"
FOR EACH ROW EXECUTE FUNCTION "public"."delete_account_for_auth_user"();
--> statement-breakpoint
CREATE POLICY "accounts_select_visible" ON "public"."accounts" FOR SELECT TO anon, authenticated USING (visibility = 'public' OR (SELECT auth.uid()) = id);
CREATE POLICY "accounts_update_own" ON "public"."accounts" FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = id) WITH CHECK ((SELECT auth.uid()) = id);
CREATE POLICY "setups_select_visible" ON "public"."setups" FOR SELECT TO anon, authenticated USING (visibility = 'public' OR (SELECT auth.uid()) = user_id);
CREATE POLICY "setups_insert_own" ON "public"."setups" FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "setups_update_own" ON "public"."setups" FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "setups_delete_own" ON "public"."setups" FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "setup_items_select_visible" ON "public"."setup_items" FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM "public"."setups" setup WHERE setup.id = setup_id AND (setup.visibility = 'public' OR setup.user_id = (SELECT auth.uid()))));
CREATE POLICY "setup_items_insert_own" ON "public"."setup_items" FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM "public"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid())));
CREATE POLICY "setup_items_update_own" ON "public"."setup_items" FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM "public"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid()))) WITH CHECK (EXISTS (SELECT 1 FROM "public"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid())));
CREATE POLICY "setup_items_delete_own" ON "public"."setup_items" FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM "public"."setups" setup WHERE setup.id = setup_id AND setup.user_id = (SELECT auth.uid())));
CREATE POLICY "gear_models_read" ON "public"."gear_models" FOR SELECT TO anon, authenticated USING (true);
--> statement-breakpoint
GRANT SELECT ON "public"."accounts", "public"."setups", "public"."setup_items", "public"."gear_models" TO anon;
GRANT SELECT, UPDATE ON "public"."accounts" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."setups", "public"."setup_items" TO authenticated;
GRANT SELECT ON "public"."gear_models" TO authenticated;
