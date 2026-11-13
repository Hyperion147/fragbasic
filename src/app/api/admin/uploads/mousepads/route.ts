import { createCatalogImageUploadHandler } from "@/server/catalog-image-upload";

export const POST = createCatalogImageUploadHandler({
  folder: "mousepads",
  idField: "mousepadId",
});
