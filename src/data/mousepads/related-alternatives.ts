import type { MousepadRelatedAlternatives } from "@/types/mousepad";

export const relatedAlternativesBySlug: Record<
  string,
  MousepadRelatedAlternatives
> = {
  "artisan-zero-soft": {
    similarFeeling: [
      "lgg-saturn-pro-soft",
      "xraypad-aqua-control-zero",
      "esports-tiger-shan-hai-tang-dao",
    ],
    moreControl: ["artisan-type-99-soft", "zowie-g-sr-iii"],
    moreSpeed: ["artisan-hien-soft", "artisan-raiden-soft"],
    notes:
      "Zero is the balanced-control reference point: Saturn Pro, AC Zero, and Tang Dao stay close; Type-99/G-SR III are more planted; Hien/Raiden move faster.",
  },
  "artisan-type-99-soft": {
    similarFeeling: [
      "lgg-jupiter-pro-soft",
      "kurosun-shogun",
      "zowie-g-sr-iii",
    ],
    moreControl: ["lgg-jupiter-pro-soft", "steelseries-qck-performance-control"],
    moreSpeed: ["artisan-zero-soft", "lgg-saturn-pro-soft", "xraypad-aqua-control-zero"],
  },
  "artisan-hayate-otsu-soft": {
    similarFeeling: [
      "artisan-hien-soft",
      "xraypad-aqua-control-ii",
      "steelseries-qck-performance-speed",
    ],
    moreControl: ["artisan-zero-soft", "pulsar-lgg-hyperion-soft"],
    moreSpeed: ["artisan-raiden-soft", "lgg-neptune-pro-soft"],
  },
  "artisan-hien-soft": {
    similarFeeling: [
      "xraypad-aqua-control-pro-mid",
      "esptiger-wuxiang-pioneer",
      "artisan-hayate-otsu-soft",
    ],
    moreControl: ["artisan-hayate-otsu-soft", "artisan-zero-soft"],
    moreSpeed: ["artisan-raiden-soft", "lgg-neptune-pro-soft", "wallhack-sp-005"],
  },
  "artisan-raiden-soft": {
    similarFeeling: [
      "lgg-neptune-pro-soft",
      "wallhack-sp-005",
      "midori-the-return-glass",
    ],
    moreControl: ["artisan-hien-soft", "artisan-hayate-otsu-soft"],
    moreSpeed: ["tekkusai-phantom", "wallhack-sp-005"],
  },
  "pulsar-lgg-hyperion-soft": {
    similarFeeling: [
      "artisan-zero-soft",
      "kurosun-samurai",
      "xraypad-aqua-control-plus",
    ],
    moreControl: ["lgg-saturn-pro-soft", "xraypad-aqua-control-zero"],
    moreSpeed: ["artisan-hayate-otsu-soft", "artisan-hien-soft"],
  },
  "lgg-saturn-pro-soft": {
    similarFeeling: [
      "artisan-zero-soft",
      "xraypad-aqua-control-zero",
      "esports-tiger-shan-hai-tang-dao",
    ],
    moreControl: ["artisan-type-99-soft", "zowie-g-sr-iii"],
    moreSpeed: ["pulsar-lgg-hyperion-soft", "artisan-hayate-otsu-soft"],
  },
  "lgg-neptune-pro-soft": {
    similarFeeling: [
      "artisan-raiden-soft",
      "wallhack-sp-005",
      "midori-the-return-glass",
    ],
    moreControl: ["artisan-hien-soft", "xraypad-aqua-control-pro-mid"],
    moreSpeed: ["tekkusai-phantom", "wallhack-sp-005"],
  },
  "lgg-jupiter-pro-soft": {
    similarFeeling: [
      "artisan-type-99-soft",
      "kurosun-shogun",
      "steelseries-qck-performance-control",
    ],
    moreControl: ["steelseries-qck-performance-control"],
    moreSpeed: ["zowie-g-sr-iii", "lgg-saturn-pro-soft"],
  },
  "steelseries-qck-heavy": {
    similarFeeling: [
      "esports-tiger-shan-hai-tang-dao",
      "zowie-g-sr-iii",
      "steelseries-qck-performance-control",
    ],
    moreControl: ["artisan-type-99-soft", "lgg-jupiter-pro-soft"],
    moreSpeed: ["lgg-saturn-pro-soft", "xraypad-equate-plus-v2"],
  },
  "steelseries-qck-performance-control": {
    similarFeeling: [
      "zowie-g-sr-iii",
      "steelseries-qck-heavy",
      "artisan-type-99-soft",
    ],
    moreControl: ["lgg-jupiter-pro-soft", "kurosun-shogun"],
    moreSpeed: ["lgg-saturn-pro-soft", "xraypad-aqua-control-zero"],
  },
  "steelseries-qck-performance-balance": {
    similarFeeling: [
      "zowie-g-sr-se-gris",
      "zowie-g-sr-se-bi",
      "kurosun-samurai",
    ],
    moreControl: ["xraypad-aqua-control-zero", "lgg-saturn-pro-soft"],
    moreSpeed: ["xraypad-aqua-control-plus", "pulsar-lgg-hyperion-soft"],
  },
  "steelseries-qck-performance-speed": {
    similarFeeling: [
      "xraypad-aqua-control-ii",
      "artisan-hayate-otsu-soft",
      "esptiger-wuxiang-pioneer",
    ],
    moreControl: ["pulsar-lgg-hyperion-soft", "xraypad-aqua-control-plus"],
    moreSpeed: ["artisan-hien-soft", "lgg-neptune-pro-soft"],
  },
  "xraypad-aqua-control-plus": {
    similarFeeling: [
      "pulsar-lgg-hyperion-soft",
      "steelseries-qck-performance-balance",
      "artisan-zero-soft",
    ],
    moreControl: ["xraypad-aqua-control-zero", "lgg-saturn-pro-soft"],
    moreSpeed: ["xraypad-aqua-control-ii", "artisan-hayate-otsu-soft"],
  },
  "xraypad-aqua-control-zero": {
    similarFeeling: [
      "lgg-saturn-pro-soft",
      "artisan-zero-soft",
      "xraypad-equate-plus-v2",
    ],
    moreControl: ["artisan-type-99-soft", "zowie-g-sr-iii"],
    moreSpeed: ["xraypad-aqua-control-plus", "pulsar-lgg-hyperion-soft"],
  },
  "xraypad-aqua-control-ii": {
    similarFeeling: [
      "steelseries-qck-performance-speed",
      "artisan-hayate-otsu-soft",
      "esptiger-wuxiang-pioneer",
    ],
    moreControl: ["xraypad-aqua-control-plus", "pulsar-lgg-hyperion-soft"],
    moreSpeed: ["artisan-hien-soft", "xraypad-aqua-control-pro-mid"],
  },
  "xraypad-equate-plus-v2": {
    similarFeeling: [
      "xraypad-aqua-control-zero",
      "lgg-saturn-pro-soft",
      "steelseries-qck-performance-balance",
    ],
    moreControl: ["artisan-type-99-soft", "steelseries-qck-heavy"],
    moreSpeed: ["artisan-zero-soft", "xraypad-aqua-control-plus"],
  },
  "xraypad-aqua-control-pro-mid": {
    similarFeeling: [
      "artisan-hien-soft",
      "esptiger-wuxiang-pioneer",
      "steelseries-qck-performance-speed",
    ],
    moreControl: ["artisan-hayate-otsu-soft", "xraypad-aqua-control-ii"],
    moreSpeed: ["artisan-raiden-soft", "lgg-neptune-pro-soft"],
  },
  "zowie-g-sr-iii": {
    similarFeeling: [
      "zowie-h-sr-iii",
      "steelseries-qck-performance-control",
      "steelseries-qck-heavy",
    ],
    moreControl: ["artisan-type-99-soft", "lgg-jupiter-pro-soft"],
    moreSpeed: ["lgg-saturn-pro-soft", "xraypad-aqua-control-zero"],
  },
  "zowie-h-sr-iii": {
    similarFeeling: [
      "zowie-g-sr-iii",
      "steelseries-qck-performance-control",
      "steelseries-qck-heavy",
    ],
    moreControl: ["artisan-type-99-soft", "lgg-jupiter-pro-soft"],
    moreSpeed: ["lgg-saturn-pro-soft", "xraypad-aqua-control-zero"],
  },
  "zowie-g-sr-se-gris": {
    similarFeeling: [
      "zowie-g-sr-se-bi",
      "zowie-g-sr-se-rouge-ii",
      "kurosun-samurai",
    ],
    moreControl: ["zowie-g-sr-iii", "lgg-saturn-pro-soft"],
    moreSpeed: ["artisan-zero-soft", "pulsar-lgg-hyperion-soft"],
  },
  "zowie-g-sr-se-rouge-ii": {
    similarFeeling: [
      "zowie-g-sr-se-gris",
      "zowie-g-sr-se-bi",
      "kurosun-samurai",
    ],
    moreControl: ["xraypad-aqua-control-zero", "lgg-saturn-pro-soft"],
    moreSpeed: ["artisan-zero-soft", "pulsar-lgg-hyperion-soft"],
  },
  "zowie-g-sr-se-bi": {
    similarFeeling: [
      "zowie-g-sr-se-gris",
      "zowie-g-sr-se-rouge-ii",
      "kurosun-samurai",
    ],
    moreControl: ["zowie-g-sr-iii", "lgg-saturn-pro-soft"],
    moreSpeed: ["artisan-zero-soft", "pulsar-lgg-hyperion-soft"],
  },
  "esports-tiger-shan-hai-tang-dao": {
    similarFeeling: [
      "lgg-saturn-pro-soft",
      "artisan-zero-soft",
      "steelseries-qck-heavy",
    ],
    moreControl: ["artisan-type-99-soft", "zowie-g-sr-iii"],
    moreSpeed: ["xraypad-aqua-control-zero", "pulsar-lgg-hyperion-soft"],
  },
  "kurosun-samurai": {
    similarFeeling: [
      "artisan-zero-soft",
      "zowie-g-sr-se-gris",
      "pulsar-lgg-hyperion-soft",
    ],
    moreControl: ["lgg-saturn-pro-soft", "xraypad-aqua-control-zero"],
    moreSpeed: ["xraypad-aqua-control-plus", "artisan-hayate-otsu-soft"],
  },
  "kurosun-shogun": {
    similarFeeling: [
      "artisan-type-99-soft",
      "lgg-jupiter-pro-soft",
      "steelseries-qck-performance-control",
    ],
    moreControl: ["lgg-jupiter-pro-soft"],
    moreSpeed: ["zowie-g-sr-iii", "lgg-saturn-pro-soft"],
  },
  "esptiger-wuxiang-pioneer": {
    similarFeeling: [
      "steelseries-qck-performance-speed",
      "xraypad-aqua-control-pro-mid",
      "artisan-hien-soft",
    ],
    moreControl: ["artisan-hayate-otsu-soft", "xraypad-aqua-control-ii"],
    moreSpeed: ["lgg-neptune-pro-soft", "artisan-raiden-soft"],
  },
  "glidex-nebula": {
    similarFeeling: [
      "xraypad-aqua-control-plus",
      "esptiger-wuxiang-pioneer",
      "matrova-scarlet",
    ],
    moreControl: ["matrova-scarlet", "xraypad-aqua-control-zero"],
    moreSpeed: ["esptiger-wuxiang-pioneer", "lgg-neptune-pro-soft"],
    notes:
      "Nebula sits as a smooth hybrid balanced-speed option with easy starts and modest stopping. AC+ and Wu Xiang are the closest hybrid peers; Scarlet/AC Zero add control; Neptune leans faster.",
  },
  "zpad-v1-xl": {
    similarFeeling: [
      "tekkusai-singularity",
      "midori-the-return-glass",
      "wallhack-sp-005",
    ],
    moreControl: ["tekkusai-singularity", "artisan-raiden-soft"],
    moreSpeed: ["wallhack-sp-005", "tekkusai-phantom"],
  },
  "tekkusai-singularity": {
    similarFeeling: [
      "zpad-v1-xl",
      "midori-the-return-glass",
      "wallhack-sp-005",
    ],
    moreControl: ["artisan-raiden-soft", "lgg-neptune-pro-soft"],
    moreSpeed: ["wallhack-sp-005", "tekkusai-phantom"],
  },
  "midori-the-return-glass": {
    similarFeeling: [
      "wallhack-sp-005",
      "tekkusai-singularity",
      "artisan-raiden-soft",
    ],
    moreControl: ["tekkusai-singularity", "lgg-neptune-pro-soft"],
    moreSpeed: ["tekkusai-phantom", "wallhack-sp-005"],
  },
  "wallhack-sp-005": {
    similarFeeling: [
      "midori-the-return-glass",
      "artisan-raiden-soft",
      "lgg-neptune-pro-soft",
    ],
    moreControl: ["tekkusai-singularity", "zpad-v1-xl"],
    moreSpeed: ["tekkusai-phantom"],
  },
  "tekkusai-phantom": {
    similarFeeling: [
      "wallhack-sp-005",
      "midori-the-return-glass",
      "artisan-raiden-soft",
    ],
    moreControl: ["wallhack-sp-005", "lgg-neptune-pro-soft"],
    moreSpeed: [],
    notes:
      "Phantom is the fastest entry in the current dataset, so there is no faster in-database recommendation yet.",
  },
};
