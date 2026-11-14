import { describe, expect, it } from "vitest";

import cloudinaryLoader from "./cloudinary-loader";

const master =
  "https://res.cloudinary.com/demo/image/upload/v123/fragbasic/mousepads/zero/zero.webp";

describe("cloudinaryLoader", () => {
  it("adds delivery transforms to Cloudinary masters", () => {
    expect(cloudinaryLoader({ src: master, width: 640 })).toBe(
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_640/v123/fragbasic/mousepads/zero/zero.webp",
    );
  });

  it("uses an explicit quality when provided", () => {
    expect(cloudinaryLoader({ src: master, width: 256, quality: 75 })).toContain(
      "/f_auto,q_75,c_limit,w_256/",
    );
  });

  it("passes through URLs that are not on Cloudinary", () => {
    const supabase =
      "https://example.supabase.co/storage/v1/object/public/mousepads/a/b.png";

    expect(cloudinaryLoader({ src: supabase, width: 640 })).toBe(supabase);
  });

  it("passes through local assets", () => {
    expect(cloudinaryLoader({ src: "/hero-bg.webp", width: 1920 })).toBe(
      "/hero-bg.webp",
    );
  });
});