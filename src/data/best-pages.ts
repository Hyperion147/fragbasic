import type { Mousepad } from "@/types/mousepad";

export type BestPageSlug =
  | "control-mousepads"
  | "speed-mousepads"
  | "valorant-mousepads"
  | "cs2-mousepads"
  | "glasspads"
  | "humidity-resistant-mousepads";

export type BestPagePick = {
  slug: string;
  label: string;
  reason: string;
  bestFor: string;
};

export type BestPageConfig = {
  slug: BestPageSlug;
  title: string;
  eyebrow: string;
  description: string;
  badge: string;
  hero: string;
  thesis: string;
  story: string[];
  rules: string[];
  pickSlugs: BestPagePick[];
  keywords: string[];
};

export const bestPages = [
  {
    slug: "control-mousepads",
    title: "Best Control Mousepads",
    eyebrow: "Slow down the last inch",
    description:
      "A curated guide to control mousepads for players who want steadier stopping power, lower overflick risk, and calmer micro-corrections.",
    badge: "Control",
    hero:
      "Control pads are for the round where your crosshair arrives first and still has to behave. The job is not to feel slow for the sake of it. The job is to make the final correction boring, repeatable, and easy to trust.",
    thesis:
      "Pick control when you value brake feel more than effortless glide, especially in tac shooters, low-sens aim, and games where the first bullet matters more than the longest tracking swipe.",
    story: [
      "The best control pads do not turn your mouse into a brick. They give you a predictable landing zone. You flick, the pad catches the motion, and your hand gets a clear signal that it is time to stop pushing.",
      "That matters most when aim pressure rises. A faster pad can feel magical in warmup, then become nervous when you are holding a pixel angle or correcting after a wide swing. A control pad gives the hand a little more language.",
      "The tradeoff is real: big tracking motions and fast target switches ask for more effort. If you already fight sluggish aim, start with balanced-control instead of the slowest pad in the list.",
    ],
    rules: [
      "Prioritize stopping power and static friction before raw control score.",
      "Choose smoother textures if you play long sessions without a sleeve.",
      "Avoid ultra-slow pads if your sensitivity is already low and your game has constant target switching.",
    ],
    pickSlugs: [
      {
        slug: "artisan-type-99-soft",
        label: "Premium lock-in",
        reason:
          "High control with strong humidity resistance, useful when you want a very settled cloth feel without older muddy-pad inconsistency.",
        bestFor: "Tac FPS players who want the pad to catch the final correction.",
      },
      {
        slug: "lgg-jupiter-pro-soft",
        label: "Deep stop",
        reason:
          "One of the slowest tracked cloth options, with huge stopping power for players who keep overshooting on balanced pads.",
        bestFor: "Low-chaos aiming, angle holding, and deliberate flicks.",
      },
      {
        slug: "zowie-g-sr-iii",
        label: "Classic control",
        reason:
          "A familiar control profile with steadier humidity behavior than the older G-SR reputation suggests.",
        bestFor: "Players coming from esports-control pads who want something recognizable.",
      },
      {
        slug: "xraypad-equate-plus-v2",
        label: "Textured control",
        reason:
          "Strong control with a more textured glide, giving more surface feedback than smoother control pads.",
        bestFor: "Players who aim better when the pad talks back through the hand.",
      },
    ],
    keywords: [
      "best control mousepads",
      "control mousepad",
      "fps control mousepad",
      "tac fps mousepad",
    ],
  },
  {
    slug: "speed-mousepads",
    title: "Best Speed Mousepads",
    eyebrow: "Let the hand move",
    description:
      "A curated guide to fast mousepads for players who want lower friction, easier tracking, and quick corrections without jumping straight to glass.",
    badge: "Speed",
    hero:
      "Speed pads feel like permission. The mouse starts easier, wide corrections take less force, and tracking stops feeling like dragging a cursor through wet paint. The question is whether your stopping mechanics can keep up.",
    thesis:
      "Pick speed when your aim feels trapped on control cloth, your games demand tracking or fast target switches, and you can stop with your hand instead of relying entirely on the pad.",
    story: [
      "A good speed pad should make motion lighter without making the crosshair feel homeless. The danger zone is not speed itself; it is speed without feedback.",
      "This is why the best fast cloth and hybrid pads often sit just below glass. They let you move freely, but still keep enough texture, base give, or dynamic friction to tell your hand where the surface is.",
      "If you mainly play tac shooters, speed is still viable, but the choice gets narrower. Look for pads that keep clean micro-adjustments without turning every panic stop into a slide.",
    ],
    rules: [
      "Look for high speed with enough micro-adjustment score to keep small corrections clean.",
      "Choose hybrid or textured cloth when you want speed with hand feedback.",
      "Avoid the fastest surfaces if you already overflick under pressure.",
    ],
    pickSlugs: [
      {
        slug: "lgg-neptune-pro-soft",
        label: "Fast cloth anchor",
        reason:
          "Very quick for cloth while keeping more comfort and stop feedback than glass or hard surfaces.",
        bestFor: "Tracking-heavy FPS and players moving up from balanced-speed pads.",
      },
      {
        slug: "artisan-raiden-soft",
        label: "Smooth glide",
        reason:
          "A fast, smooth Artisan option for players who want low friction without abrasive texture.",
        bestFor: "Clean tracking and light-touch aimers.",
      },
      {
        slug: "artisan-hien-soft",
        label: "Textured speed",
        reason:
          "Fast with clear surface feedback, making it easier to sense movement than on very smooth speed pads.",
        bestFor: "Players who want speed but dislike floaty surfaces.",
      },
      {
        slug: "xraypad-aqua-control-pro-mid",
        label: "Firm quickness",
        reason:
          "A faster Xraypad profile with strong humidity resistance and a firmer, more immediate response.",
        bestFor: "Players who want speed, texture, and climate consistency.",
      },
    ],
    keywords: [
      "best speed mousepads",
      "speed mousepad",
      "fast mousepad",
      "tracking mousepad",
    ],
  },
  {
    slug: "valorant-mousepads",
    title: "Best VALORANT Mousepads",
    eyebrow: "Hold the angle, then correct",
    description:
      "A curated guide to VALORANT mousepads for angle holding, first-bullet accuracy, micro-corrections, and stable tac-FPS aim.",
    badge: "VALORANT",
    hero:
      "VALORANT punishes the hand that cannot stop. You clear, freeze, counter-strafe, and make a correction that is often smaller than the logo on your mouse. The best pads for it make that tiny ending feel reliable.",
    thesis:
      "Pick a VALORANT pad by how it handles the last centimeter: stopping power, micro-adjustments, and comfort matter more than raw glide.",
    story: [
      "A VALORANT pad does not need to be the slowest thing on the desk. It needs to keep the crosshair calm when you are already tense.",
      "That is why balanced-control pads are often the sweet spot. They avoid the heavy hand feel of mud pads, but still give enough resistance to hold angles and correct after a shoulder peek.",
      "If your sens is high, lean more control. If your sens is low and you entry or clear wide, balanced-control keeps the pad from fighting every room clear.",
    ],
    rules: [
      "Treat micro-adjustments and stopping power as the core stats.",
      "Use balanced-control if you need easier clearing and repositioning.",
      "Pick slower control only if overflicking is your main miss pattern.",
    ],
    pickSlugs: [
      {
        slug: "artisan-zero-soft",
        label: "Safe premium default",
        reason:
          "Balanced-control with excellent humidity resistance and enough speed to avoid feeling trapped.",
        bestFor: "Most VALORANT players who want one premium safe pick.",
      },
      {
        slug: "lgg-saturn-pro-soft",
        label: "Tactical balance",
        reason:
          "A control-leaning cloth pad with strong stopping power and enough glide for wider clears.",
        bestFor: "Angle holders who still need comfortable repositioning.",
      },
      {
        slug: "zowie-g-sr-se-gris",
        label: "Esports familiar",
        reason:
          "A balanced-control Zowie feel that is easier to live with than ultra-slow control while staying tac-FPS friendly.",
        bestFor: "Players who like classic competitive pad behavior.",
      },
      {
        slug: "artisan-type-99-soft",
        label: "Maximum calm",
        reason:
          "A slower, locked-in option for players who want stronger braking and less crosshair drift.",
        bestFor: "High-sens aimers or anyone who consistently overflicks.",
      },
    ],
    keywords: [
      "best valorant mousepads",
      "valorant mousepad",
      "tac fps mousepad",
      "best mousepad for valorant",
    ],
  },
  {
    slug: "cs2-mousepads",
    title: "Best CS2 Mousepads",
    eyebrow: "Spray, stop, reset",
    description:
      "A curated guide to CS2 mousepads for counter-strafing, spray control, angle discipline, and stable cloth-pad performance.",
    badge: "CS2",
    hero:
      "CS2 asks for a slightly different kind of discipline. The pad has to help with the first bullet, survive the spray, then reset fast enough for the next duel. Too slow feels heavy. Too fast can make every counter-strafe correction nervous.",
    thesis:
      "Pick CS2 pads that combine control with usable glide, especially if you play low to medium sensitivity and need room for spray control.",
    story: [
      "The strongest CS2 picks usually live between classic control and balanced-control. You want brake feel, but you also want enough movement to track a spray transfer without dragging the mouse through syrup.",
      "Texture can be useful here. A little surface feedback makes it easier to feel longer horizontal corrections, especially when the fight moves from first bullet to spray.",
      "If you are used to older slow cloth, modern control pads can feel surprisingly free while still giving the crosshair a place to land.",
    ],
    rules: [
      "Balance stopping power with enough speed for spray transfers.",
      "Favor consistent humidity behavior if your room or hands get warm.",
      "Avoid glass unless you already know you like very low friction in tac shooters.",
    ],
    pickSlugs: [
      {
        slug: "zowie-g-sr-iii",
        label: "CS classic rebuilt",
        reason:
          "A control profile that fits counter-strafe aim and angle discipline without feeling as dated as older slow cloth.",
        bestFor: "CS players who want a familiar competitive baseline.",
      },
      {
        slug: "lgg-saturn-pro-soft",
        label: "Modern control",
        reason:
          "Strong control, comfortable glide, and a premium base make it a dependable CS2 all-rounder.",
        bestFor: "Riflers who want stop feel without a heavy pad.",
      },
      {
        slug: "zowie-g-sr-se-gris",
        label: "Balanced rifle pad",
        reason:
          "A balanced-control Zowie option that keeps tac-FPS stopping power while feeling smoother and freer than the heavier control pads.",
        bestFor: "CS2 players who spray, transfer, and still want a pad that respects first-bullet aim.",
      },
      {
        slug: "steelseries-qck-performance-control",
        label: "Mainstream control",
        reason:
          "High control in a familiar SteelSeries shape for players who want an accessible control-first option.",
        bestFor: "Players upgrading from basic QcK-style cloth.",
      },
    ],
    keywords: [
      "best cs2 mousepads",
      "cs2 mousepad",
      "counter strike mousepad",
      "best mousepad for cs2",
    ],
  },
  {
    slug: "glasspads",
    title: "Best Glasspads",
    eyebrow: "Speed that does not wear down",
    description:
      "A curated guide to glass mousepads for players who want extreme consistency, easy cleaning, and fast low-friction aim.",
    badge: "Glass",
    hero:
      "Glasspads are the clean break from cloth habits. They stay fast, wipe down easily, and make humidity almost irrelevant. They also ask for better hand braking, because the pad will not quietly save a lazy stop.",
    thesis:
      "Pick glass when you want maximum surface consistency and speed, and you are willing to trade cloth comfort and built-in stopping power for a more mechanical aim feel.",
    story: [
      "A glasspad changes the relationship between hand and surface. Cloth gives you texture, sink, and resistance. Glass gives you a hard readout of your own control.",
      "That can feel unfair for a week, then strangely honest. Once the start friction drops, small corrections become easy, but every stop has to come from your hand, skates, and technique.",
      "The best choice is not always the fastest glasspad. Some players need a slightly more controlled finish or a surface that feels less sharp under the wrist.",
    ],
    rules: [
      "Expect less stopping power than cloth and plan around that tradeoff.",
      "Use skates and sleeves intentionally because they change glass feel a lot.",
      "Prioritize comfort and finish if you play long sessions.",
    ],
    pickSlugs: [
      {
        slug: "tekkusai-phantom",
        label: "Fastest tracked glass",
        reason:
          "Extremely high speed with the pure glasspad promise: low friction, easy cleaning, and full humidity resistance.",
        bestFor: "Players who want the sharpest contrast from cloth.",
      },
      {
        slug: "wallhack-sp-005",
        label: "Competitive speed",
        reason:
          "A very fast glasspad with a competitive FPS reputation and consistently low environmental sensitivity.",
        bestFor: "Tracking and fast target switching with a hard-surface feel.",
      },
      {
        slug: "midori-the-return-glass",
        label: "Fast with character",
        reason:
          "A fast glass option that sits a touch below the most extreme speed while keeping the glass consistency story.",
        bestFor: "Players who want glass speed without chasing the absolute fastest glide.",
      },
      {
        slug: "tekkusai-singularity",
        label: "More measured glass",
        reason:
          "A slightly more controlled glass profile in the tracked set, useful if pure speed feels too exposed.",
        bestFor: "Cloth players taking their first serious glass step.",
      },
    ],
    keywords: [
      "best glasspads",
      "glass mousepad",
      "best glass mousepads",
      "fps glasspad",
    ],
  },
  {
    slug: "humidity-resistant-mousepads",
    title: "Best Humidity-Resistant Mousepads",
    eyebrow: "Consistent when the room is not",
    description:
      "A curated guide to humidity-resistant mousepads for sweaty hands, warm rooms, monsoon weather, and consistent FPS glide.",
    badge: "Humidity",
    hero:
      "Humidity is where some mousepads lose the plot. The same glide that felt clean at midnight can turn sticky after one warm match. A humidity-resistant pad keeps the session from becoming a weather report.",
    thesis:
      "Pick humidity-resistant pads when sweat, warm rooms, or seasonal moisture change your glide more than your aim does.",
    story: [
      "The issue is not just water in the air. It is the stack of skin, sleeve, dust, sweat, and surface texture changing together while you are trying to play normally.",
      "Good humidity-resistant pads stay closer to their baseline. They may still need cleaning, but they do not swing as dramatically from fast to sticky in the middle of a session.",
      "Glass is the obvious answer for maximum resistance, but modern cloth and hybrid pads can be the better daily answer if you still want comfort and stopping power.",
    ],
    rules: [
      "Treat humidity resistance and sweat resistance as separate checks.",
      "Choose washable surfaces if your environment is dusty or warm.",
      "Pick glass only if you also want the speed and hard-surface tradeoffs.",
    ],
    pickSlugs: [
      {
        slug: "artisan-type-99-soft",
        label: "Control in bad weather",
        reason:
          "Excellent humidity resistance for a control pad, making it a strong pick when you need brake feel and consistency.",
        bestFor: "Tac FPS players in warm or humid rooms.",
      },
      {
        slug: "artisan-zero-soft",
        label: "Balanced safe pick",
        reason:
          "High humidity resistance with a broadly useful balanced-control feel.",
        bestFor: "Players who want one pad that behaves across seasons.",
      },
      {
        slug: "xraypad-aqua-control-pro-mid",
        label: "Fast climate pick",
        reason:
          "Strong humidity resistance with a faster, firmer profile than most control-oriented options.",
        bestFor: "Players who need speed without sticky-session drama.",
      },
      {
        slug: "xraypad-equate-plus-v2",
        label: "Hybrid humidity specialist",
        reason:
          "Community reviews consistently call out how stable it stays in high humidity while still giving more stopping power than faster hybrid pads.",
        bestFor: "Players who want strong climate resistance without jumping all the way to glass.",
      },
    ],
    keywords: [
      "humidity resistant mousepad",
      "best mousepad for humidity",
      "sweat resistant mousepad",
      "monsoon mousepad",
    ],
  },
] as const satisfies readonly BestPageConfig[];

export function getAllBestPages() {
  return bestPages;
}

export function getBestPageBySlug(slug: string) {
  return bestPages.find((page) => page.slug === slug);
}

export function getBestPageSlugs() {
  return bestPages.map((page) => page.slug);
}

export function getBestPagePicks(
  page: BestPageConfig,
  mousepads: Mousepad[],
) {
  return page.pickSlugs
    .map((pick) => {
      const mousepad = mousepads.find((pad) => pad.slug === pick.slug);

      return mousepad ? { ...pick, mousepad } : null;
    })
    .filter((pick): pick is BestPagePick & { mousepad: Mousepad } =>
      Boolean(pick),
    );
}
