"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Database, ScanSearch } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

type Props = {
    mousepadCount: number;
    glasspadCount: number;
    iemCount: number;
    bestPageCount: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection({}: Props) {
    const reduceMotion = useReducedMotion();

    return (
        <section className="landing-noise relative isolate overflow-hidden border-b border-white/8 bg-[#09090c] lg:min-h-[calc(100svh-4rem)]">
            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.15, ease }}
                className="absolute inset-0 z-0 hidden lg:block"
            >
                <Image
                    src="/hero-bg.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[90%_center]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,11,.98)_0%,rgba(8,8,11,.92)_28%,rgba(8,8,11,.46)_51%,rgba(8,8,11,.08)_78%,rgba(8,8,11,.2)_100%),linear-gradient(0deg,rgba(8,8,11,.72)_0%,transparent_38%,rgba(8,8,11,.12)_100%)]" />
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
            <div className="landing-hero-lines absolute inset-0 -z-10 opacity-40" />

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
                            Independent FPS gear intelligence
                        </motion.div>

                        <motion.h1
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 28 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.82, delay: 0.06, ease }}
                            className="mt-6 max-w-[10ch] text-[clamp(3.15rem,15vw,5rem)] font-semibold leading-[.9] tracking-[-.065em] text-white sm:mt-7 lg:text-[clamp(3.75rem,7vw,7.8rem)]"
                        >
                            Gear that feels made for{" "}
                            <span className="text-brand-hover">you.</span>
                        </motion.h1>

                        <motion.div
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 18 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.72, delay: 0.21, ease }}
                            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"
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
                            className="mt-7 flex flex-col items-start gap-3 text-xs text-white/46 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:text-sm"
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
                            className="absolute right-0 top-5 hidden w-fit items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-xs text-white/70 shadow-2xl backdrop-blur-xl md:flex lg:right-40 lg:top-[4%]"
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
