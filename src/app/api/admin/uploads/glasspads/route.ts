import { createCatalogImageUploadHandler } from "@/server/catalog-image-upload";

export const POST = createCatalogImageUploadHandler({
  folder: "glasspads",
  idField: "glasspadId",
});
