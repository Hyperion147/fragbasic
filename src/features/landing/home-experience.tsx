import { HeroSection } from "@/features/landing/hero-section";
import { LatestAddedSection } from "@/features/landing/latest-added-section";
import { PagesShowcaseSection } from "@/features/landing/pages-showcase-section";
import { PopularComparisonsSection } from "@/features/landing/popular-comparisons-section";
import { MethodologySection } from "@/features/landing/methodology-section";
import type { LandingProps } from "@/features/landing/types";
import { HomeSeoSection } from "@/features/landing/seo-section";
import { WhySection } from "@/features/landing/why-section";

export function HomeExperience({
    mousepadCount,
    glasspadCount,
    bestPageCount,
    iemCount,
    comparisons,
    latestAdded,
    latestAddedIems,
}: LandingProps) {
    return (
        <main className="min-h-screen overflow-hidden bg-background text-foreground">
            <HeroSection />

            <div className="w-full space-y-10 px-4 py-10 sm:space-y-20 sm:px-5 sm:py-16 md:space-y-28 md:px-6 md:py-24 lg:px-8">
                {(latestAdded && latestAdded.length > 0) ||
                (latestAddedIems && latestAddedIems.length > 0) ? (
                    <LatestAddedSection
                        pads={latestAdded}
                        iems={latestAddedIems}
                    />
                ) : null}
                <PagesShowcaseSection
                    mousepadCount={mousepadCount}
                    glasspadCount={glasspadCount}
                    iemCount={iemCount}
                    bestPageCount={bestPageCount}
                />
                <MethodologySection />
                <PopularComparisonsSection comparisons={comparisons} />
                <WhySection />
                <HomeSeoSection />
            </div>
        </main>
    );
}
