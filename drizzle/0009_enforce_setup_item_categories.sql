ALTER TABLE "fragbasic_accounts"."setup_items" DROP CONSTRAINT "setup_items_gear_model_id_gear_models_id_fk";
--> statement-breakpoint
CREATE UNIQUE INDEX "gear_models_id_category_unique" ON "fragbasic_accounts"."gear_models" USING btree ("id","category");
--> statement-breakpoint
ALTER TABLE "fragbasic_accounts"."setup_items" ADD CONSTRAINT "setup_items_model_category_fk" FOREIGN KEY ("gear_model_id","position") REFERENCES "fragbasic_accounts"."gear_models"("id","category") ON DELETE restrict ON UPDATE no action;
