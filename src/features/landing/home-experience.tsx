"use client";

import { motion, useReducedMotion } from "motion/react";

import { BrandsSection } from "@/features/landing/brands-section";
import { FinderSection } from "@/features/landing/finder-section";
import { HeroSection } from "@/features/landing/hero-section";
import { LatestAddedSection } from "@/features/landing/latest-added-section";
import { PagesShowcaseSection } from "@/features/landing/pages-showcase-section";
import { PopularComparisonsSection } from "@/features/landing/popular-comparisons-section";
import { SleevesTeaseSection } from "@/features/landing/sleeves-tease-section";
import { SpectrumSection } from "@/features/landing/spectrum-section";
import type { LandingProps } from "@/features/landing/types";
import { WhySection } from "@/features/landing/why-section";

export function HomeExperience({
  mousepadCount,
  glasspadCount,
  bestPageCount,
  brandCount,
  comparisonCount,
  brands,
  comparisons,
  latestAdded,
}: LandingProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RevealSection hero>
        <HeroSection mousepadCount={mousepadCount} brandCount={brandCount} />
      </RevealSection>

      <div className="w-full space-y-12 px-4 py-12 md:space-y-16 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <RevealSection delay={0.08}>
          <PagesShowcaseSection
            mousepadCount={mousepadCount}
            glasspadCount={glasspadCount}
            bestPageCount={bestPageCount}
            comparisonCount={comparisonCount}
          />
        </RevealSection>
        {latestAdded && latestAdded.length > 0 ? (
          <RevealSection delay={0.11}>
            <LatestAddedSection pads={latestAdded} />
          </RevealSection>
        ) : null}
        <RevealSection delay={0.14}>
          <PopularComparisonsSection comparisons={comparisons} />
        </RevealSection>
        <RevealSection delay={0.2}>
          <FinderSection />
        </RevealSection>
        <RevealSection delay={0.26}>
          <BrandsSection brands={brands} />
        </RevealSection>
        <RevealSection delay={0.32}>
          <SpectrumSection />
        </RevealSection>
        <RevealSection delay={0.38}>
          <WhySection />
        </RevealSection>
        <RevealSection delay={0.44}>
          <SleevesTeaseSection />
        </RevealSection>
      </div>
    </main>
  );
}

function RevealSection({
  children,
  delay = 0,
  hero = false,
}: {
  children: React.ReactNode;
  delay?: number;
  hero?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: hero ? 0.35 : 0.2 }}
      transition={{
        duration: hero ? 0.65 : 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
