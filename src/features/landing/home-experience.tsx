"use client";

import { motion, useReducedMotion } from "motion/react";

import { HeroSection } from "@/features/landing/hero-section";
import { LatestAddedIemsSection } from "@/features/landing/latest-added-iems-section";
import { LatestAddedSection } from "@/features/landing/latest-added-section";
import { PagesShowcaseSection } from "@/features/landing/pages-showcase-section";
import { PopularComparisonsSection } from "@/features/landing/popular-comparisons-section";
import { IemsTeaseSection } from "@/features/landing/iems-tease-section";
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
    <main className="min-h-screen bg-background text-foreground">
      <RevealSection hero>
        <HeroSection mousepadCount={mousepadCount} />
      </RevealSection>

      <div className="w-full space-y-12 px-4 py-10 sm:px-5 md:space-y-18 md:px-6 md:py-14 lg:px-8 xl:px-10">
        <RevealSection delay={0.08}>
          <PagesShowcaseSection
            mousepadCount={mousepadCount}
            glasspadCount={glasspadCount}
            iemCount={iemCount}
            bestPageCount={bestPageCount}
          />
        </RevealSection>
        {latestAdded && latestAdded.length > 0 ? (
          <RevealSection delay={0.11}>
            <LatestAddedSection pads={latestAdded} />
          </RevealSection>
        ) : null}
        {latestAddedIems && latestAddedIems.length > 0 ? (
          <RevealSection delay={0.13}>
            <LatestAddedIemsSection iems={latestAddedIems} />
          </RevealSection>
        ) : null}
        <RevealSection delay={0.14}>
          <PopularComparisonsSection comparisons={comparisons} />
        </RevealSection>
        <RevealSection delay={0.26}>
          <WhySection />
        </RevealSection>
        <RevealSection delay={0.32}>
          <IemsTeaseSection />
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
      viewport={{ once: false, amount: hero ? 0.35 : 0.2 }}
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
