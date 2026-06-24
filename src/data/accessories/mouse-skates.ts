import type { MouseSkate } from "@/types/accessory";

export const mouseSkates: MouseSkate[] = [
  {
    id: "xraypad-jade-speed-dots",
    slug: "xraypad-jade-speed-dots",
    brand: "Xraypad",
    name: "Jade Speed Dots",
    series: "Jade",
    material: "ptfe",
    shape: "dots",
    thicknessMm: 0.8,
    diameterMm: 6.5,
    quantity: "40 dots",
    ratings: {
      speed: 9.6,
      control: 4.2,
      stoppingPower: 3.8,
      smoothness: 9.2,
      noiseControl: 5.8,
      durability: 6.6,
      glassCompatibility: 2.5,
      ratingConfidence: "community",
    },
    surfaceFit: {
      cloth: "excellent",
      hybrid: "excellent",
      glass: "avoid",
      plastic: "good",
      coated: "usable",
    },
    bestFor: [
      "Players who want the fastest Xraypad PTFE feel",
      "Cloth or hybrid pads that need easier startup",
      "Low-friction tracking and flick-heavy aim",
    ],
    avoidIf: [
      "You need strong braking",
      "You mainly use a glasspad",
      "Your current setup already feels too slippery",
    ],
    notes:
      "Xraypad positions Jade as the speed line. Community comparisons usually place Jade above Obsidian and close to the fastest mainstream PTFE skates.",
    communitySummary:
      "Jade Speed is the quickest Xraypad skate family: very low start friction, smooth glide, and less built-in stopping than Obsidian.",
    sources: [
      {
        label: "Xraypad official Jade Speed D6.5mm dots page",
        type: "official",
        url: "https://shop.x-raypad.com/shop/jade-diy-mouse-skates-universal-0-8mm-ptfe-dots/",
      },
      {
        label: "Ausmodshop X-Raypad Mouse Skates Buying Guide",
        type: "store",
        url: "https://ausmodshop.com/pages/x-raypad-mouse-skates-buying-guide",
      },
      {
        label: "r/MouseReview Jade and Obsidian user impressions",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/1624ogq/are_xray_pads_jade_and_obsidian_skates_good/",
      },
    ],
  },
  {
    id: "xraypad-jade-air-dots",
    slug: "xraypad-jade-air-dots",
    brand: "Xraypad",
    name: "Jade Air Dots",
    series: "Jade Air",
    material: "ptfe",
    shape: "dots",
    diameterMm: 6.5,
    quantity: "40 dots",
    ratings: {
      speed: 8.6,
      control: 5.8,
      stoppingPower: 5.4,
      smoothness: 8.8,
      noiseControl: 8.2,
      durability: 6.8,
      glassCompatibility: 4.5,
      ratingConfidence: "estimated",
    },
    surfaceFit: {
      cloth: "excellent",
      hybrid: "excellent",
      glass: "usable",
      plastic: "good",
      coated: "usable",
    },
    bestFor: [
      "Players who want Jade speed with more calm",
      "Quiet cloth-pad setups",
      "People experimenting with dot count for speed tuning",
    ],
    avoidIf: [
      "You want maximum Jade speed",
      "You need a skate built specifically for glass",
      "You dislike universal dot installation",
    ],
    notes:
      "Jade Air keeps the PTFE/Jade identity but adds a quieter, more controlled feel than standard Jade. Retailer copy emphasizes smooth control and stable braking.",
    communitySummary:
      "Jade Air is a fast-but-calmer Jade option: still quick, but more stable and quieter than the raw speed-focused Jade dots.",
    sources: [
      {
        label: "Xraypad official Jade Air D6.5mm dots page",
        type: "official",
        url: "https://shop.x-raypad.com/shop/xraypad-jade-air-diy-mouse-skates-universal-dots-green-dots/",
      },
      {
        label: "MaxGaming Jade Air donuts listing",
        type: "store",
        url: "https://us.maxgaming.com/us/mouse-skates/jade-air-mouse-skates-universal-donuts",
      },
      {
        label: "JP Gaming X-Raypad mouse skates collection notes",
        type: "store",
        url: "https://jpgamingusa.com/collections/x-raypad-mouse-skates",
      },
    ],
  },
  {
    id: "xraypad-obsidian-dots",
    slug: "xraypad-obsidian-dots",
    brand: "Xraypad",
    name: "Obsidian Control Dots",
    series: "Obsidian",
    material: "hardened-ptfe",
    shape: "dots",
    thicknessMm: 0.8,
    diameterMm: 6.5,
    quantity: "40 dots",
    ratings: {
      speed: 7.4,
      control: 7.4,
      stoppingPower: 7.2,
      smoothness: 7.8,
      noiseControl: 6.8,
      durability: 8.2,
      glassCompatibility: 7.4,
      ratingConfidence: "community",
    },
    surfaceFit: {
      cloth: "excellent",
      hybrid: "excellent",
      glass: "good",
      plastic: "usable",
      coated: "avoid",
    },
    bestFor: [
      "Tac FPS players who want more braking than Jade",
      "Glasspad users who do not want an ultra-fast skate",
      "Balanced glide with better durability than soft PTFE",
    ],
    avoidIf: [
      "You want the absolute fastest glide",
      "You prefer very soft, silent PTFE",
      "You use a coated/plastic surface where Obsidian is not recommended",
    ],
    notes:
      "Obsidian uses a harder frosted PTFE feel to add friction, stopping control, and durability. It is commonly treated as Xraypad's balanced-control skate line.",
    communitySummary:
      "Obsidian is the safer all-rounder: slower than Jade, more controlled, stronger stopping, and more suitable for glass than standard Jade.",
    sources: [
      {
        label: "Xraypad official Obsidian D6.5mm dots page",
        type: "official",
        url: "https://shop.x-raypad.com/shop/obsidian-diy-mouse-skates-universal-0-8mm-ptfe-dots/",
      },
      {
        label: "Ausmodshop X-Raypad Mouse Skates Buying Guide",
        type: "store",
        url: "https://ausmodshop.com/pages/x-raypad-mouse-skates-buying-guide",
      },
      {
        label: "Tiger Ice vs Corepads vs Jade vs Obsidian discussion",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1bsdbuq/tiger_ice_vs_corepads_vs_xraypad_jades_vs_xraypad/",
      },
    ],
  },
  {
    id: "xraypad-obsidian-air-dots",
    slug: "xraypad-obsidian-air-dots",
    brand: "Xraypad",
    name: "Obsidian Air Dots",
    series: "Obsidian Air",
    material: "hardened-ptfe",
    shape: "dots",
    diameterMm: 6.5,
    quantity: "40 dots",
    ratings: {
      speed: 6.8,
      control: 8.1,
      stoppingPower: 8.0,
      smoothness: 7.8,
      noiseControl: 8.8,
      durability: 8.1,
      glassCompatibility: 8.2,
      ratingConfidence: "community",
    },
    surfaceFit: {
      cloth: "excellent",
      hybrid: "excellent",
      glass: "excellent",
      plastic: "usable",
      coated: "avoid",
    },
    bestFor: [
      "Glasspad users who want quieter glide",
      "Control-focused FPS on glass or cloth",
      "Players who want Obsidian braking with less scratch/noise",
    ],
    avoidIf: [
      "You want a lively speed skate",
      "You use a coated pad",
      "You dislike the feel of damped, quieter skates",
    ],
    notes:
      "Obsidian Air adds noise and vibration damping to the control-oriented Obsidian profile. Xraypad notes fewer dots increase speed while more dots add control.",
    communitySummary:
      "Obsidian Air is a common controlled glass recommendation because it keeps stopping feedback while reducing harshness and glide noise.",
    sources: [
      {
        label: "Xraypad official Obsidian Air D6.5mm dots page",
        type: "official",
        url: "https://shop.x-raypad.com/shop/obsidian-air-diy-mouse-skates-universal-dots/",
      },
      {
        label: "Xraypad Obsidian Air D6.0mm dots page",
        type: "official",
        url: "https://shop.x-raypad.com/shop/x-raypad-obsidian-air-diy-mouse-skates-universal-d6-0mm-dots-quiet-control/",
      },
      {
        label: "Obsidian Air vs Obsidian Pro Air user review",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1h7ecex/xraypad_obsidian_air_vs_obsidian_pro_air_donut/",
      },
    ],
  },
  {
    id: "xraypad-obsidian-pro-air-dots",
    slug: "xraypad-obsidian-pro-air-dots",
    brand: "Xraypad",
    name: "Obsidian Pro Air Dots",
    series: "Obsidian Pro Air",
    material: "uhmwpe",
    shape: "dots",
    thicknessMm: 0.9,
    diameterMm: 6.5,
    quantity: "40 dots",
    ratings: {
      speed: 5.8,
      control: 8.8,
      stoppingPower: 8.7,
      smoothness: 7.4,
      noiseControl: 9.2,
      durability: 9.2,
      glassCompatibility: 9.2,
      ratingConfidence: "community",
    },
    surfaceFit: {
      cloth: "good",
      hybrid: "good",
      glass: "excellent",
      plastic: "usable",
      coated: "avoid",
    },
    bestFor: [
      "Glasspad users who want maximum control from Xraypad skates",
      "Durability-first hard-surface setups",
      "Quiet controlled glide on glass",
    ],
    avoidIf: [
      "You want fast glass glide",
      "You are sensitive to skate drag",
      "You prefer standard PTFE feel",
    ],
    notes:
      "Obsidian Pro Air uses UHMWPE/U-PE and is explicitly positioned for low noise, control, durability, and glasspad use. Lethal Gaming Gear's listing orders Obsidian Pro Air as the slowest in the Obsidian speed stack.",
    communitySummary:
      "Obsidian Pro Air is the slow/control end of the Xraypad lineup: durable and glass-ready, but not the pick for people chasing speed.",
    sources: [
      {
        label: "Xraypad official Obsidian Pro Air D6.5mm dots page",
        type: "official",
        url: "https://shop.x-raypad.com/shop/x-raypad-obsidian-pro-air-u-pe-universal-dot-mouse-skates-less-noise/",
      },
      {
        label: "Lethal Gaming Gear Obsidian Pro Air dots listing",
        type: "store",
        url: "https://lethal.gg/products/x-raypad-obsidian-pro-air-diy-dots",
      },
      {
        label: "Amazon Obsidian Pro Air listing",
        type: "store",
        url: "https://www.amazon.com/X-Raypad-Obsidian-Air-Pro-Resistance/dp/B0D7ZJ8DLJ",
      },
    ],
  },
  {
    id: "xraypad-titanium-u9-air-dots",
    slug: "xraypad-titanium-u9-air-dots",
    brand: "Xraypad",
    name: "Titanium U9 Air Dots",
    series: "Titanium U9 Air",
    material: "titanium",
    shape: "dots",
    diameterMm: 6.5,
    quantity: "Universal dots",
    ratings: {
      speed: 6.4,
      control: 8.0,
      stoppingPower: 7.8,
      smoothness: 7.0,
      noiseControl: 8.5,
      durability: 10.0,
      glassCompatibility: 8.0,
      ratingConfidence: "estimated",
    },
    surfaceFit: {
      cloth: "usable",
      hybrid: "usable",
      glass: "good",
      plastic: "avoid",
      coated: "avoid",
    },
    bestFor: [
      "Maximum skate durability",
      "Hard-surface users who want stable glide",
      "Experimenters who already understand dot placement",
    ],
    avoidIf: [
      "You want classic PTFE glide",
      "You need the quietest or smoothest feel",
      "You use delicate coated surfaces",
    ],
    notes:
      "Titanium U9 Air is the durability outlier. Retailers position it as stable, smooth, silent, and long-lasting, but it should be treated as a more specialized option than Jade or Obsidian.",
    communitySummary:
      "Titanium U9 Air is less of a normal speed/control skate and more of a durability-focused tuning option for hard-surface users.",
    sources: [
      {
        label: "JP Gaming X-Raypad mouse skates collection notes",
        type: "store",
        url: "https://jpgamingusa.com/collections/x-raypad-mouse-skates",
      },
      {
        label: "Recent Xraypad skate lineup community testing",
        type: "review",
        url: "https://www.youtube.com/watch?v=uuUfZMYlci4",
      },
    ],
  },
];

export function getAllMouseSkates() {
  return mouseSkates;
}

export function getMouseSkatesByBrand(brand: string) {
  return mouseSkates.filter((skate) => skate.brand === brand);
}

export function getMouseSkatesBySpeed() {
  return [...mouseSkates].sort(
    (left, right) => right.ratings.speed - left.ratings.speed
  );
}
