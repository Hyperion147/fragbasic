import { describe, expect, it } from "vitest";
import { buildArticleJsonLd, buildCollectionJsonLd, buildMetadata, buildProductJsonLd, clampDescription } from "./seo";

const product = {
  name: "Test pad", description: "Editorial summary", path: "/mousepads/test-pad",
  brand: "Test", category: "Mousepad",
  review: { name: "Test review", body: "Editorial summary", author: "FragBasic Review Team" },
};

describe("SEO output", () => {
  it("uses the public canonical and absolute social images", () => {
    const metadata = buildMetadata({ title: "Test pad", description: "Test description", path: product.path, image: "/test.png" });
    expect(metadata.alternates).toEqual({ canonical: "https://fragbasic.fun/mousepads/test-pad" });
    expect(metadata.openGraph).toMatchObject({ images: [{ url: "https://fragbasic.fun/test.png" }] });
  });
  it("generates crawler-compatible Cloudinary social images", () => {
    const metadata = buildMetadata({ title: "Test", description: "Test", path: "/", image: "https://res.cloudinary.com/demo/image/upload/test.webp" });
    expect(metadata.twitter).toMatchObject({ images: ["https://res.cloudinary.com/demo/image/upload/f_jpg,q_auto,c_pad,w_1200,h_630,b_auto/test.webp"] });
  });
  it("normalizes whitespace and bounds descriptions", () => {
    expect(clampDescription(" a  test\n description ")).toBe("a test description");
    expect(clampDescription("word ".repeat(100)).length).toBeLessThanOrEqual(160);
  });
  it("does not emit an unrated review or an unknown price", () => {
    const data = buildProductJsonLd(product);
    expect(data.review).toBeUndefined();
    expect(data.offers).toBeUndefined();
  });
  it.each([0, -1, NaN, Infinity])("does not emit an invalid offer price: %s", (price) => {
    expect(buildProductJsonLd({ ...product, price }).offers).toBeUndefined();
  });
  it("emits the visible zero-to-ten rating with a team author", () => {
    const data = buildProductJsonLd({ ...product, price: 2000, review: { ...product.review, rating: 0 } });
    expect(data.review).toMatchObject({ author: { "@type": "Organization" }, reviewRating: { ratingValue: 0, bestRating: 10, worstRating: 0 } });
    expect(data.offers).toMatchObject({ price: 2000, priceCurrency: "INR" });
  });
  it.each([-1, 11, NaN, Infinity])("does not emit an invalid review rating: %s", (rating) => {
    expect(buildProductJsonLd({ ...product, review: { ...product.review, rating } }).review).toBeUndefined();
  });
  it("places collection counts on an ItemList", () => {
    const data = buildCollectionJsonLd({ name: "Pads", description: "All pads", path: "/mousepads", itemCount: 5 });
    expect(data.mainEntity).toEqual({ "@type": "ItemList", numberOfItems: 5 });
    expect(data).not.toHaveProperty("numberOfItems");
  });
  it("supplies an article image without inventing dates", () => {
    const data = buildArticleJsonLd({ title: "Guide", description: "A guide", path: "/mousepads/guides/test" });
    expect(data.image).toBe("https://fragbasic.fun/og-image.png");
    expect(data.datePublished).toBeUndefined();
    expect(data.dateModified).toBeUndefined();
  });
});
