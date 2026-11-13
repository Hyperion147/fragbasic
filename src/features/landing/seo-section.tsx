import { AiFaq } from "@/components/seo/ai-blocks";
import { PopularSearches } from "@/components/seo/related-links";

export const homeFaqs = [
  {
    q: "What is the best mousepad for VALORANT?",
    a: "VALORANT rewards stopping power and clean micro-corrections, so a balanced-control or control mousepad is usually the safer starting point. The FragBasic VALORANT mousepad guide ranks pads for angle holding, counter-strafing, and tiny crosshair corrections instead of raw glide speed.",
  },
  {
    q: "What is the best mousepad for CS2?",
    a: "CS2 asks for enough stopping power to hold a spray and enough glide to reset for the next duel. Balanced-control pads are the common default, while faster hybrid pads suit players who track and transfer more than they hold angles. See the CS2 mousepad guide for the current picks.",
  },
  {
    q: "Is a glass mousepad better than a cloth mousepad?",
    a: "Not automatically. A glass mousepad offers lower friction, easier cleaning, and near-total humidity resistance, but it has less stopping power and changes how skates feel. Cloth pads remain easier to brake on and are more forgiving for tactical FPS aim. Compare glasspad vs cloth before switching.",
  },
  {
    q: "Are gaming IEMs better than a gaming headset for FPS?",
    a: "IEMs can be excellent for FPS because good imaging and a clean fit make footsteps and direction cues easy to read. They also avoid headband pressure and clamp. The tradeoff is cable handling, ear tip fit, and a smaller soundstage than some open-back headsets. The IEM database ranks imaging, clarity, comfort, and value.",
  },
  {
    q: "Do mouse skates actually make a difference?",
    a: "Yes, especially on glass and hard pads. Skate material, shape, and surface area change glide speed, stopping feedback, noise, and how quickly the feet wear. PTFE, hardened PTFE, UHMWPE, glass, and titanium skates all behave differently, so match the skate to the pad rather than buying the fastest option.",
  },
  {
    q: "Where can I buy FPS gear in India?",
    a: "FragBasic tracks India availability and price notes on product pages so you can shortlist gear that is actually sold locally. Availability changes often, so check the buying notes and store links on the product page before ordering.",
  },
];

const linkGroups = [
  {
    title: "Best mousepads by game",
    links: [
      { label: "Best mousepads for VALORANT", href: "/best/valorant-mousepads" },
      { label: "Best mousepads for CS2", href: "/best/cs2-mousepads" },
      { label: "Best mousepad for Apex Legends", href: "/mousepads" },
      { label: "Best mousepad for tracking", href: "/best/speed-mousepads" },
      { label: "Best mousepads for Fortnite", href: "/best/speed-mousepads" },
      { label: "Best mousepads for Warzone", href: "/best/control-mousepads" },
    ],
  },
  {
    title: "Best mousepads by feel",
    links: [
      { label: "Best control mousepads", href: "/best/control-mousepads" },
      { label: "Best speed mousepads", href: "/best/speed-mousepads" },
      { label: "Best glasspads", href: "/best/glasspads" },
      {
        label: "Best humidity-resistant mousepads",
        href: "/best/humidity-resistant-mousepads",
      },
      { label: "Glass mousepad vs cloth", href: "/mousepads/guides/control-vs-speed-mousepads" },
      { label: "Compare mousepads side by side", href: "/mousepads/compare/universal" },
    ],
  },
  {
    title: "Popular mousepad reviews",
    links: [
      { label: "Artisan Zero Soft review", href: "/mousepads/artisan-zero-soft" },
      { label: "LGG Saturn Pro Soft review", href: "/mousepads/lgg-saturn-pro-soft" },
      { label: "Zowie G-SR III review", href: "/mousepads/zowie-g-sr-iii" },
      { label: "Xraypad Aqua Control II review", href: "/mousepads/xraypad-aqua-control-ii" },
      { label: "Wallhack SP-005 review", href: "/mousepads/wallhack-sp-005" },
      { label: "Tekkusai Phantom review", href: "/mousepads/tekkusai-phantom" },
    ],
  },
  {
    title: "Popular comparisons",
    links: [
      {
        label: "Artisan Zero Soft vs LGG Saturn Pro Soft",
        href: "/mousepads/compare/artisan-zero-soft-vs-lgg-saturn-pro-soft",
      },
      {
        label: "Artisan Zero Soft vs Artisan Type-99 Soft",
        href: "/mousepads/compare/artisan-zero-soft-vs-artisan-type-99-soft",
      },
      {
        label: "Artisan Hien Soft vs Hayate Otsu Soft",
        href: "/mousepads/compare/artisan-hayate-otsu-soft-vs-artisan-hien-soft",
      },
      {
        label: "ATK Crimson vs Wallhack SP-005",
        href: "/mousepads/compare/atk-crimson-vs-wallhack-sp-005",
      },
      {
        label: "Tekkusai Phantom vs Singularity",
        href: "/mousepads/compare/tekkusai-phantom-vs-tekkusai-singularity",
      },
      {
        label: "Zowie G-SR III vs LGG Saturn Pro Soft",
        href: "/mousepads/compare/zowie-g-sr-iii-vs-lgg-saturn-pro-soft",
      },
    ],
  },
  {
    title: "Gaming IEMs and mouse skates",
    links: [
      { label: "Best IEMs for FPS gaming", href: "/iems" },
      { label: "Best IEMs for VALORANT", href: "/iems" },
      { label: "Best IEMs for CS2", href: "/iems" },
      { label: "Best budget IEMs in India", href: "/iems" },
      { label: "Compare gaming IEMs", href: "/iems/compare" },
      { label: "Best mouse skates for glass pads", href: "/accessories/mouse-skates" },
      { label: "Browse mouse skates", href: "/accessories/mouse-skates/browse" },
      { label: "Compare mouse skates", href: "/accessories/mouse-skates/compare" },
    ],
  },
  {
    title: "Mousepad brands",
    links: [
      { label: "All mousepad brands", href: "/mousepads/brand" },
      { label: "Artisan mousepads", href: "/mousepads/brand/artisan" },
      { label: "Xraypad mousepads", href: "/mousepads/brand/xraypad" },
      { label: "LGG mousepads", href: "/mousepads/brand/lgg" },
      { label: "Zowie mousepads", href: "/mousepads/brand/zowie" },
      { label: "SteelSeries mousepads", href: "/mousepads/brand/steelseries" },
      {
        label: "Esports Tiger mousepads",
        href: "/mousepads/brand/esports-tiger",
      },
    ],
  },
  {
    title: "Learn before you buy",
    links: [
      { label: "How to choose your first gaming mousepad", href: "/mousepads/guides/first-mousepad-guide" },
      { label: "Control vs speed mousepads", href: "/mousepads/guides/control-vs-speed-mousepads" },
      { label: "Best mousepad surfaces for humid climates", href: "/mousepads/guides/humid-climate-mousepads" },
      { label: "All FPS mousepad guides", href: "/mousepads/guides" },
      { label: "Mousepad database", href: "/mousepads" },
      { label: "Glasspad database", href: "/mousepads/glasspads" },
    ],
  },
];

export function HomeSeoSection() {
  return (
    <div className="space-y-6">
      <PopularSearches
        title="Find gear by game, feel, and budget"
        description="Start with the question you are actually asking: best mousepad for VALORANT, a glasspad vs cloth comparison, gaming IEMs for footsteps, or mouse skates for a glass pad. Every guide links back to structured specs, feel ratings, and India availability."
        groups={linkGroups}
      />
      <AiFaq items={homeFaqs} />
    </div>
  );
}
