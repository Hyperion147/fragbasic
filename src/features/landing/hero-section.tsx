"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Database, ScanSearch } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative isolate overflow-hidden border-b border-white/8 bg-[#09090c] lg:min-h-[calc(100svh-4rem)]">
            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.15, ease }}
                className="absolute inset-0 z-0 hidden lg:block"
            >
                <Image
                    src="/hero-bg.png"
                    alt="hero-bg-image"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[90%_center]"
                />
            </motion.div>
            <motion.div
                aria-hidden="true"
                animate={
                    reduceMotion
                        ? undefined
                        : { x: [0, 26, 0], y: [0, -18, 0], scale: [1, 1.05, 1] }
                }
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -right-24 top-[8%] -z-20 hidden size-[48rem] rounded-full bg-brand/18 blur-[150px] lg:block"
            />

            <div className="relative z-10 mx-auto flex flex-col px-5 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:px-12 xl:px-16">
                <div className="grid flex-1 items-center gap-0 pb-0 pt-6 sm:gap-4 sm:pb-8 sm:pt-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:pb-4 lg:pt-8 xl:grid-cols-[.82fr_1.18fr]">
                    <div className="relative z-20 py-7 sm:py-10 lg:py-16">
                        <motion.div
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 16 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, ease }}
                            className="inline-flex items-center gap-2 rounded-full border border-brand-hover/30 bg-brand/10 px-3 py-1.5 text-[10px] font-semibold uppercase text-brand-hover backdrop-blur-sm sm:text-[11px]"
                        >
                            <span className="size-1.5 rounded-full bg-brand-hover shadow-[0_0_12px_var(--brand-glow)]" />
                            FPS gear research
                        </motion.div>

                        <motion.h1
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 28 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.82, delay: 0.06, ease }}
                            className="mt-5 max-w-[12ch] text-balance text-[clamp(2.75rem,10vw,4rem)] font-semibold leading-[1.02] text-white sm:mt-6 lg:text-[clamp(3.25rem,4.8vw,5.25rem)]"
                        >
                            Research gear without the{" "}
                            <span className="text-brand-hover">rabbit hole.</span>
                        </motion.h1>

                        <motion.p
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 18 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.72, delay: 0.14, ease }}
                            className="mt-4 max-w-[44ch] text-pretty text-[15px] font-normal leading-[1.65] text-white/60 sm:mt-5 sm:text-lg sm:leading-[1.7] lg:text-[1.25rem] lg:leading-[1.7]"
                        >
                            Compare how mousepads, glasspads, IEMs and skates
                            actually differ by feel, use case, price and
                            availability in India.
                        </motion.p>

                        <motion.div
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 18 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.72, delay: 0.21, ease }}
                            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row"
                        >
                            <Button
                                size="lg"
                                asChild
                                className="h-12 w-full rounded-full bg-white px-6 text-black hover:bg-white/85 sm:w-auto inset-shadow-[-2px_-2px_12px_#0000004c]"
                            >
                                <Link href="/mousepads/compare/universal">
                                    Find my next pad
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="h-12 w-full rounded-full border-white/14 bg-black/15 px-6 text-white backdrop-blur-md hover:bg-white/8 hover:text-white sm:w-auto inset-shadow-[-2px_-2px_8px_#a78bfa4b]"
                            >
                                <Link href="/mousepads">
                                    <Database className="size-4" />
                                    Explore peripherals
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="mt-6 flex flex-col items-start gap-3 text-xs text-white/46 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:text-sm"
                        >
                            <Proof label="No sponsored rankings" />
                            <Proof label="Community + hands-on data" />
                        </motion.div>
                    </div>

                    <div className="relative z-10 hidden h-full min-h-[640px] lg:block">
                        <motion.div
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 16 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.68, ease }}
                            className="absolute right-0 top-5 hidden w-fit items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-xs text-white/70 shadow-2xl backdrop-blur-xl md:flex lg:left-40 lg:top-[4%]"
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-brand/18 text-brand-hover">
                                <ScanSearch className="size-4" />
                            </span>
                            <span>
                                <span className="block font-semibold text-white">
                                    Built to compare
                                </span>
                                <span className="mt-0.5 block text-white/42">
                                    Feel, surface, fit, value
                                </span>
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Proof({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-brand/20 text-brand-hover">
                <Check className="size-2.5" />
            </span>
            {label}
        </span>
    );
}
