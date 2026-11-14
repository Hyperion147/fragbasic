import { describe, expect, it, vi } from "vitest";
import sharp from "sharp";
vi.mock("@/server/auth", () => ({ requireAdmin: vi.fn() }));
vi.mock("@/lib/cloudinary", () => ({ isCloudinaryConfigured: vi.fn(), uploadImageToCloudinary: vi.fn() }));
import { optimizeImage, readUploadForm } from "./catalog-image-upload";

describe("catalog image uploads", () => {
  it("rejects arbitrary bytes claiming to be PNG", async () => {
    await expect(optimizeImage(new File(["<svg onload='alert(1)'/>"], "image.png", { type: "image/png" }))).rejects.toThrow();
  });
  it("decodes and normalizes a valid raster image", async () => {
    const bytes = await sharp({ create: { width: 20, height: 10, channels: 3, background: "red" } }).png().toBuffer();
    const optimized = await optimizeImage(new File([new Uint8Array(bytes)], "image.png", { type: "image/png" }));
    const metadata = await sharp(optimized.buffer).metadata();
    expect(metadata.format).toBe("webp"); expect(metadata.width).toBe(20);
  });
  it("rejects oversized multipart bodies before parsing", async () => {
    const request = new Request("https://example.com/upload", { method: "POST", headers: { "content-length": String(5 * 1024 * 1024) }, body: "small" });
    await expect(readUploadForm(request)).rejects.toThrow(RangeError);
  });
  it("bounds bodies even without a content-length", async () => {
    const request = new Request("https://example.com/upload", { method: "POST", body: new Uint8Array(5 * 1024 * 1024) });
    await expect(readUploadForm(request)).rejects.toThrow(RangeError);
  });
});
