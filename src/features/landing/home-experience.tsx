"use client";

import { motion, useReducedMotion } from "motion/react";

import { HeroSection } from "@/features/landing/hero-section";
import { LatestAddedSection } from "@/features/landing/latest-added-section";
import { PagesShowcaseSection } from "@/features/landing/pages-showcase-section";
import { PopularComparisonsSection } from "@/features/landing/popular-comparisons-section";
import { MethodologySection } from "@/features/landing/methodology-section";
import type { LandingProps } from "@/features/landing/types";
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
      <RevealSection hero>
        <HeroSection
          mousepadCount={mousepadCount}
          glasspadCount={glasspadCount}
          iemCount={iemCount}
          bestPageCount={bestPageCount}
        />
      </RevealSection>

      <div className="w-full space-y-10 px-4 py-10 sm:space-y-20 sm:px-5 sm:py-16 md:space-y-28 md:px-6 md:py-24 lg:px-8">
        <RevealSection delay={0.08}>
          <PagesShowcaseSection
            mousepadCount={mousepadCount}
            glasspadCount={glasspadCount}
            iemCount={iemCount}
            bestPageCount={bestPageCount}
          />
        </RevealSection>
        <RevealSection>
          <MethodologySection />
        </RevealSection>
        {(latestAdded && latestAdded.length > 0) ||
        (latestAddedIems && latestAddedIems.length > 0) ? (
          <RevealSection delay={0.11}>
            <LatestAddedSection
              pads={latestAdded}
              iems={latestAddedIems}
            />
          </RevealSection>
        ) : null}
        <RevealSection>
          <PopularComparisonsSection comparisons={comparisons} />
        </RevealSection>
        <RevealSection>
          <WhySection />
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
      initial={{ opacity: 0, y: hero ? -8 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: hero ? 0.35 : 0.16 }}
      transition={{
        duration: hero ? 0.55 : 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
