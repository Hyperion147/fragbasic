import { db } from "../src/db";
import { bestPages, comparisons, glasspads, guides, iems, mousepads, mouseSkates } from "../src/db/schema";
import { createEmptyMousepad } from "../src/features/admin/empty-mousepad";
import { createEmptyAccessory } from "../src/features/admin/empty-accessory";
import { createEmptyGlasspad } from "../src/features/admin/empty-glasspad";
import { iemFixture } from "../e2e/fixtures/iem";
import { mouseSkateSchema } from "../src/schemas/accessory";
import { iemSchema } from "../src/schemas/iem";
import { mousepadSchema } from "../src/schemas/mousepad";

async function seed() {
  const url = new URL(process.env.DATABASE_URL ?? "https://invalid");
  if (process.env.E2E_DATABASE !== "1" || !["127.0.0.1", "localhost"].includes(url.hostname)) {
    throw new Error("E2E seed requires E2E_DATABASE=1 and a local disposable database. Remote databases are refused.");
  }
  const communityConsensus = {
    summary: "Synthetic fixture for browser checks.", commonComparisons: [],
    strengths: ["Test fixture"], weaknesses: ["Synthetic data"],
  };
  for (const [slug, brand, name] of [
    ["test-pad", "Test", "Control Pad"],
    ["test-fast-pad", "Test", "Fast Pad"],
    ["artisan-zero-soft", "Artisan", "Zero Soft"],
  ]) {
    const data = mousepadSchema.parse({ ...createEmptyMousepad(), id: slug, slug, brand, name, communityConsensus });
    await db.insert(mousepads).values({ id: slug, slug, brand, name, data }).onConflictDoNothing();
  }
  const glass = mousepadSchema.parse({
    ...createEmptyGlasspad(), id: "test-glass", slug: "test-glass", brand: "Test", name: "Glass Pad", communityConsensus,
  });
  await db.insert(glasspads).values({ id: glass.id, slug: glass.slug, brand: glass.brand, name: glass.name, data: glass }).onConflictDoNothing();
  const iem = iemSchema.parse(iemFixture);
  await db.insert(iems).values({ id: iem.id, slug: iem.slug, brand: iem.brand, name: iem.name, data: iem }).onConflictDoNothing();
  const skate = mouseSkateSchema.parse({
    ...createEmptyAccessory(), id: "test-dots", slug: "test-dots", brand: "Test", name: "Dots", series: "Test",
    communitySummary: "Synthetic PTFE skate for browser checks.",
  });
  await db.insert(mouseSkates).values({ id: skate.id, slug: skate.slug, brand: skate.brand, name: skate.name, data: skate }).onConflictDoNothing();
  await db.insert(comparisons).values({ id: "test-matchup", slug: "test-matchup", title: "Test matchup", leftSlug: "test-pad", rightSlug: "test-fast-pad", status: "published", data: { slug: "test-matchup", title: "Test matchup", leftSlug: "test-pad", rightSlug: "test-fast-pad", excerpt: "Synthetic comparison fixture.", tags: [] } }).onConflictDoNothing();
  await db.insert(bestPages).values({ id: "test-best", slug: "test-best", title: "Test picks", status: "published", data: { slug: "test-best", title: "Test picks", eyebrow: "Test", description: "Synthetic buying guide fixture.", badge: "Test", hero: "Test", thesis: "Synthetic data.", story: ["Synthetic data."], rules: ["Synthetic data."], pickSlugs: [{ slug: "test-pad", label: "Test", reason: "Fixture", bestFor: "Testing" }], keywords: [] } }).onConflictDoNothing();
  await db.insert(guides).values({ id: "test-guide", slug: "test-guide", title: "Test guide", status: "published", data: { slug: "test-guide", title: "Test guide", eyebrow: "Test", description: "Synthetic editorial fixture.", category: "Test", readingTime: 1, publishedAt: "2026-11-14", intro: "Synthetic data.", sections: [{ heading: "Test section", paragraphs: ["Synthetic data."], bullets: [] }], takeaways: ["Synthetic data."], relatedPadSlugs: ["test-pad"], keywords: [] } }).onConflictDoNothing();
}
seed().then(() => process.exit(0)).catch((error) => { console.error(error.message); process.exit(1); });
