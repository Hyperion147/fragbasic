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
    visual: {
      colorName: "Jade green",
      primaryHex: "#9ae6b4",
      secondaryHex: "#f0fff4",
      textHex: "#07130c",
    },
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
    visual: {
      colorName: "Green",
      primaryHex: "#4ade80",
      secondaryHex: "#bbf7d0",
      textHex: "#07130c",
    },
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
    visual: {
      colorName: "Obsidian red",
      primaryHex: "#a52838",
      secondaryHex: "#ef6f78",
      textHex: "#fff1f2",
    },
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
    visual: {
      colorName: "Purple",
      primaryHex: "#7c3aed",
      secondaryHex: "#c4b5fd",
      textHex: "#f5f3ff",
    },
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
    visual: {
      colorName: "Grey",
      primaryHex: "#8f9096",
      secondaryHex: "#e5e7eb",
      textHex: "#111827",
    },
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
    visual: {
      colorName: "Orange",
      primaryHex: "#f97316",
      secondaryHex: "#fed7aa",
      textHex: "#1f1307",
    },
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
  {
    id: "esptiger-ice-v2",
    slug: "esptiger-ice-v2",
    brand: "ESPTiger",
    name: "ICE V2",
    series: "ICE",
    material: "ptfe",
    shape: "mouse-specific",
    thicknessMm: 0.8,
    quantity: "Usually 1-2 sets, varies by mouse model",
    visual: {
      colorName: "White",
      primaryHex: "#ffffff",
      secondaryHex: "#d9dce8",
      textHex: "#111827",
    },
    ratings: {
      speed: 9.2,
      control: 4.8,
      stoppingPower: 4.4,
      smoothness: 9.1,
      noiseControl: 6.4,
      durability: 6.9,
      glassCompatibility: 3.0,
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
      "Players who want a fast mainstream PTFE upgrade",
      "Cloth and hybrid pads that feel too sticky with stock skates",
      "Low-friction flicking and tracking",
    ],
    avoidIf: [
      "You need extra braking for tactical FPS",
      "You mainly use glasspads",
      "You want the longest-lasting hard-surface skate",
    ],
    notes:
      "Tiger ICE V2 is one of the most common fast aftermarket skate picks. Retailer and community comparisons usually place ICE above Corepad Pro and Arc 1 for speed and smoothness.",
    communitySummary:
      "A popular fast PTFE skate: smooth, quick, easy to recommend on cloth, but not the controlled choice.",
    sources: [
      {
        label: "ESPTiger ICE V2 official collection",
        type: "official",
        url: "https://esptiger.com/collections/esptiger-ice-v2-mouse-skates",
      },
      {
        label: "Lethal Gaming Gear skate differences support page",
        type: "store",
        url: "https://support.lethal.gg/support/solutions/articles/159000412532-what-are-the-differences-between-the-skates-you-sell-",
      },
      {
        label: "Tiger ICE vs Corepads user comparison",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/lzm5zy/tiger_ice_vs_corepads_reviewcomparison/",
      },
    ],
  },
  {
    id: "esptiger-arc-1",
    slug: "esptiger-arc-1",
    brand: "ESPTiger",
    name: "Arc 1",
    series: "Arc",
    material: "ptfe",
    shape: "mouse-specific",
    thicknessMm: 0.6,
    quantity: "Usually 1-2 sets, varies by mouse model",
    visual: {
      colorName: "White",
      primaryHex: "#f7f7f2",
      secondaryHex: "#d8d1c4",
      textHex: "#111827",
    },
    ratings: {
      speed: 7.6,
      control: 6.8,
      stoppingPower: 6.6,
      smoothness: 7.8,
      noiseControl: 7.2,
      durability: 7.4,
      glassCompatibility: 3.5,
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
      "Players who want safer control than ICE",
      "Stock-skate replacement without going ultra-fast",
      "Tactical FPS users who still want PTFE smoothness",
    ],
    avoidIf: [
      "You want the fastest Tiger glide",
      "You mainly use glasspads",
      "You prefer dot tuning instead of model-specific feet",
    ],
    notes:
      "Arc 1 is an older but still commonly referenced Tiger skate family. It is generally treated as more controlled and less slick than ICE, with better braking for players who dislike pure speed skates.",
    communitySummary:
      "Arc 1 is the safer Tiger pick: more controlled than ICE, still smoother than most stock feet.",
    sources: [
      {
        label: "ESPTiger Arc 1 official collection",
        type: "official",
        url: "https://esptiger.com/collections/arc-1-mouse-skates",
      },
      {
        label: "ESPTiger Arc 1 product page",
        type: "official",
        url: "https://esptiger.com/products/arc-1-ptfe-skates-razer-deathadder",
      },
      {
        label: "Tiger Arc 1 vs Arc 2 vs ICE discussion",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/nfeg2j/tiger_arc_1_vs_arc_2_vs_ice/",
      },
    ],
  },
  {
    id: "corepad-skatez-pro",
    slug: "corepad-skatez-pro",
    brand: "Corepad",
    name: "Skatez Pro",
    series: "Skatez",
    material: "ptfe",
    shape: "mouse-specific",
    quantity: "Usually 2 sets, varies by mouse model",
    visual: {
      colorName: "White",
      primaryHex: "#ffffff",
      secondaryHex: "#e5e7eb",
      textHex: "#111827",
    },
    ratings: {
      speed: 8.0,
      control: 6.2,
      stoppingPower: 6.0,
      smoothness: 8.3,
      noiseControl: 7.0,
      durability: 7.8,
      glassCompatibility: 3.5,
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
      "The default safe aftermarket upgrade",
      "Players who want smoother glide without losing all control",
      "Mouse-specific replacement feet for popular models",
    ],
    avoidIf: [
      "You want the fastest possible PTFE",
      "You want strong control skates",
      "You mainly use glasspads",
    ],
    notes:
      "Corepad Skatez Pro is one of the oldest and most widely used aftermarket skate families. Corepad positions Skatez as pure PTFE replacement feet made for many mouse models.",
    communitySummary:
      "The dependable all-rounder: faster and smoother than stock, usually more controlled than Tiger ICE.",
    sources: [
      {
        label: "Corepad official Skatez overview",
        type: "official",
        url: "https://corepad.com/corepad-skatez-replacement-ptfe-teflon-mousefeet-mouse-feet-hyperglide-hyperglides/",
      },
      {
        label: "Corepad official store",
        type: "official",
        url: "https://corepad.com/",
      },
      {
        label: "Tiger ICE vs Corepads user comparison",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/lzm5zy/tiger_ice_vs_corepads_reviewcomparison/",
      },
    ],
  },
  {
    id: "corepad-skatez-ctrl",
    slug: "corepad-skatez-ctrl",
    brand: "Corepad",
    name: "Skatez CTRL",
    series: "Skatez CTRL",
    material: "ptfe",
    shape: "mouse-specific",
    quantity: "Usually 2 sets, varies by mouse model",
    visual: {
      colorName: "White",
      primaryHex: "#ffffff",
      secondaryHex: "#e5e7eb",
      textHex: "#111827",
    },
    ratings: {
      speed: 6.6,
      control: 7.8,
      stoppingPower: 7.8,
      smoothness: 7.4,
      noiseControl: 7.5,
      durability: 7.8,
      glassCompatibility: 3.5,
      ratingConfidence: "community",
    },
    surfaceFit: {
      cloth: "excellent",
      hybrid: "excellent",
      glass: "avoid",
      plastic: "usable",
      coated: "usable",
    },
    bestFor: [
      "Players who want slower Corepads",
      "Tactical FPS control without changing mousepad",
      "Stock replacement with more braking",
    ],
    avoidIf: [
      "You want a speed skate",
      "You dislike added skate friction",
      "You mainly use glasspads",
    ],
    notes:
      "Corepad CTRL is the control-oriented Corepad branch, commonly used by people who like Corepad fit and availability but want less glide than the Pro line.",
    communitySummary:
      "A controlled Corepad option: less lively than Skatez Pro, more useful when your pad already feels fast.",
    sources: [
      {
        label: "Corepad Skatez CTRL listings on MaxGaming",
        type: "store",
        url: "https://us.maxgaming.com/us/corepad",
      },
      {
        label: "Corepad official Skatez overview",
        type: "official",
        url: "https://corepad.com/corepad-skatez-replacement-ptfe-teflon-mousefeet-mouse-feet-hyperglide-hyperglides/",
      },
      {
        label: "Corepad CTRL and AIR user impressions",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/tpzjvi/any_tried_the_new_corepad_ctrl_or_air_skates/",
      },
    ],
  },
  {
    id: "pulsar-superglide-2",
    slug: "pulsar-superglide-2",
    brand: "Pulsar",
    name: "Superglide 2",
    series: "Superglide",
    material: "glass",
    shape: "mouse-specific",
    quantity: "Mouse-specific sets or universal dots",
    visual: {
      colorName: "White / Black variants",
      primaryHex: "#ffffff",
      secondaryHex: "#111827",
      textHex: "#111827",
    },
    ratings: {
      speed: 8.8,
      control: 5.8,
      stoppingPower: 5.6,
      smoothness: 9.4,
      noiseControl: 6.6,
      durability: 9.6,
      glassCompatibility: 1.0,
      ratingConfidence: "community",
    },
    surfaceFit: {
      cloth: "good",
      hybrid: "usable",
      glass: "avoid",
      plastic: "avoid",
      coated: "avoid",
    },
    bestFor: [
      "Cloth-pad users who want very high speed",
      "People who hate PTFE wear-in changes",
      "Tracking-heavy games on compatible cloth pads",
    ],
    avoidIf: [
      "You use a glasspad",
      "You want strong tactical FPS braking",
      "You are worried about hard skates wearing or damaging surfaces",
    ],
    notes:
      "Superglide 2 is Pulsar's textured glass skate line. It is extremely durable and smooth on compatible cloth pads, but glass-on-glass use should be avoided.",
    communitySummary:
      "A common non-PTFE speed experiment: durable and very smooth on cloth, but matchup-sensitive and not for glasspads.",
    sources: [
      {
        label: "Pulsar Superglide 2 Amazon listing",
        type: "store",
        url: "https://www.amazon.com/Superglide2-Controllable-Textured-Smoothest-Wireless/dp/B0CB3WS9ZW",
      },
      {
        label: "Micro Center Superglide 2 universal dots listing",
        type: "store",
        url: "https://www.microcenter.com/product/701904/pulsar-superglide-2-%28type-c%29-universal-mouse-glass-skates-6mm-and-9mm-12pcs",
      },
      {
        label: "Pulsar Superglide 2 user review",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/163rqux/pulsar_superglide_2_review/",
      },
    ],
  },
  {
    id: "ghostglides-cyclone-dots",
    slug: "ghostglides-cyclone-dots",
    brand: "GHOSTGLIDES",
    name: "Cyclone Dots",
    series: "Cyclone",
    material: "hardened-ptfe",
    shape: "dots",
    thicknessMm: 0.85,
    diameterMm: 6.0,
    quantity: "40 dots",
    visual: {
      colorName: "Black",
      primaryHex: "#111014",
      secondaryHex: "#3a3446",
      textHex: "#f5f3ff",
    },
    ratings: {
      speed: 7.2,
      control: 7.6,
      stoppingPower: 7.4,
      smoothness: 8.4,
      noiseControl: 8.8,
      durability: 8.7,
      glassCompatibility: 8.8,
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
      "Glasspad users who want quiet balanced PTFE dots",
      "People tuning speed with dot count",
      "Durability-focused PTFE feel",
    ],
    avoidIf: [
      "You want the fastest dot skate",
      "You dislike universal dot installation",
      "You use a delicate coated surface",
    ],
    notes:
      "Ghostglides describes Cyclone as treated PTFE dots using a PTFE and hardening-mineral blend for balanced glide across glass mousepads. It is commonly cross-shopped with Obsidian-style glasspad dots.",
    communitySummary:
      "A popular glasspad dot option: balanced, quiet, durable, and less wild than pure speed dots.",
    sources: [
      {
        label: "GHOSTGLIDES Cyclone official page",
        type: "official",
        url: "https://ghostglides.com/en-us/products/edgerunner-cyclone-universal-dots",
      },
      {
        label: "Lethal Gaming Gear Cyclone dots listing",
        type: "store",
        url: "https://lethal.gg/products/ghostglides-edgerunner-cyclone-universal-dots",
      },
      {
        label: "Ghostglides Cyclone and Vortex user impressions",
        type: "reddit",
        url: "https://www.reddit.com/r/MouseReview/comments/18ibizn/ghostglides_cyclone_vortex_dot_skates/",
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
