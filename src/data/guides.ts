import type { GuideDataInput } from "@/schemas/guide";

/**
 * Seed content for the guides module. The public site reads these only when
 * CATALOG_SOURCE_GUIDES is not `db`.
 */
export const guides: GuideDataInput[] = [
  {
    slug: "control-vs-speed-mousepads",
    title: "Control vs speed mousepads: how glide changes your aim",
    eyebrow: "Mousepad foundations",
    description:
      "A practical breakdown of friction, stopping power, and glide so you can choose between control, balanced, and speed surfaces with intent.",
    category: "Foundations",
    readingTime: 7,
    publishedAt: "2026-10-14",
    intro:
      "Control and speed are not quality labels. They describe how much friction sits between your mouse feet and the pad, and that friction changes how you start, stop, and correct a flick. The right answer depends on your sensitivity, your game, and how much of your aim comes from the wrist versus the arm.",
    sections: [
      {
        heading: "What control actually means",
        paragraphs: [
          "A control pad gives you more resistance at the moment you start moving and more braking force when you stop. That extra friction makes small corrections feel planted, which is why tactical shooters and low-sensitivity players often gravitate toward them.",
          "The trade-off is that fast tracking and very wide swipes cost more effort. If your desk space is tight or your sensitivity is high, a heavy control surface can feel like you are fighting the pad rather than steering it.",
        ],
        bullets: [
          "More startup friction and stronger stopping power",
          "Forgiving for micro-adjustments and recoil control",
          "Rewards deliberate, low-sensitivity aim",
        ],
      },
      {
        heading: "What speed actually means",
        paragraphs: [
          "A speed pad lowers friction so the mouse keeps gliding after you push it. That makes large swipes and fast target transfers feel effortless, especially in tracking-heavy games or when you play with a higher sensitivity.",
          "The cost is braking. You have to work harder to stop precisely, and small corrections can overshoot if your hand is not already settled. Speed pads are not inherently harder to aim on, but they expose sloppy stop timing.",
        ],
        bullets: [
          "Lower startup friction and longer glide",
          "Better for wide flicks and tracking",
          "Punishes late stops and over-corrections",
        ],
      },
      {
        heading: "How to choose without guessing",
        paragraphs: [
          "Start from the feel you already like, then adjust one variable at a time. If your current pad feels sticky during micro-corrections, move one step toward speed. If you keep overshooting or struggling to hold a line, move one step toward control.",
          "The middle of the spectrum is not a compromise for people who cannot decide. Balanced pads are a real category: they keep enough stopping power for tactical play while reducing the effort needed for fast swipes. Most players are better served by a balanced surface plus deliberate practice than by chasing an extreme.",
          "Also account for mouse feet and pad age. Fresh PTFE feet and a broken-in cloth surface can shift the effective speed of the same pad, so judge changes after a few sessions rather than on the first swipe.",
        ],
        bullets: [],
      },
    ],
    takeaways: [
      "Control pads trade glide for stopping power and micro-correction stability.",
      "Speed pads reduce effort for wide swipes but demand cleaner stops.",
      "Change one variable at a time and re-test after the surface breaks in.",
    ],
    relatedPadSlugs: [
      "artisan-zero-soft",
      "artisan-hien-soft",
      "steelseries-qck-heavy",
      "lgg-saturn-pro-soft",
    ],
    keywords: [
      "control vs speed mousepad",
      "mousepad friction",
      "stopping power",
      "best control mousepad",
      "best speed mousepad",
    ],
  },
  {
    slug: "humid-climate-mousepads",
    title: "Best mousepad surfaces for humid climates",
    eyebrow: "Climate and consistency",
    description:
      "How sweat, humidity, and sleeve friction change mousepad feel, and which surface types stay most consistent through an Indian summer.",
    category: "Climate",
    readingTime: 6,
    publishedAt: "2026-10-28",
    intro:
      "Humidity changes the pad more than most buyers expect. Cloth fibers absorb moisture, mouse feet pick up residue, and a sleeve that glides in winter can start dragging in July. If your aim feels different every week, climate is often the hidden variable.",
    sections: [
      {
        heading: "Why cloth pads change in humidity",
        paragraphs: [
          "Cloth is a woven textile. When the air is damp, the fibers hold more moisture and the surface can feel slower and slightly tacky. The effect is strongest on soft, porous pads with a large weave and on pads that have not been washed in a while.",
          "A sleeve or forearm resting on the pad adds a second problem. Sweat and skin oils transfer to the surface, and the fabric starts catching instead of gliding. Cleaning helps, but it cannot change the underlying material behavior.",
        ],
        bullets: [
          "Soft cloth pads absorb moisture and can slow down noticeably",
          "Skin oils and sweat create inconsistent patches",
          "Long sleeves can help or hurt depending on the fabric",
        ],
      },
      {
        heading: "Surfaces that stay more consistent",
        paragraphs: [
          "Glasspads are the most climate-stable option because the surface does not absorb moisture. You still need to keep them clean, but a quick wipe restores the same glide instead of waiting for fabric to dry. The trade-off is a harder surface and less stopping power than most cloth pads.",
          "If you want to stay on cloth, look for tighter weaves and coated or hybrid surfaces. They resist humidity better than open-weave control pads, though the coating can wear over time. A second pad kept clean and dry is often a more reliable fix than trying to rescue a damp one mid-session.",
        ],
        bullets: [
          "Glass stays consistent but is fast and unforgiving",
          "Tight weaves and hybrid surfaces handle humidity better than open cloth",
          "Keep a clean spare pad for the worst weeks",
        ],
      },
      {
        heading: "A simple humidity routine",
        paragraphs: [
          "Wash your cloth pad with mild soap and let it dry completely before use. Keep a microfiber cloth nearby for glass, and wipe the surface at the start of a session rather than after it starts feeling slow.",
          "Track how the pad feels across a few days instead of judging it once. If the same pad is reliable in dry weather and unplayable in the monsoon, treat that as a climate problem rather than a skill problem and pick a surface that matches your environment.",
        ],
        bullets: [],
      },
    ],
    takeaways: [
      "Humidity slows absorbent cloth and makes cloth feel inconsistent.",
      "Glass is the most climate-stable surface, with a speed trade-off.",
      "Clean surfaces and a dry spare pad solve more than switching sensitivity.",
    ],
    relatedPadSlugs: [
      "artisan-zero-soft",
      "xraypad-aqua-control-ii",
      "wallhack-sp-005",
      "artisan-hayate-otsu-soft",
    ],
    keywords: [
      "humid climate mousepad",
      "best mousepad for humidity",
      "glasspad humidity",
      "mousepad sweat",
      "mousepad for India",
    ],
  },
  {
    slug: "first-mousepad-guide",
    title: "How to choose your first gaming mousepad",
    eyebrow: "Buying basics",
    description:
      "A short, opinionated framework for picking a first FPS mousepad using game choice, sensitivity, desk space, and the feel you want.",
    category: "Buying",
    readingTime: 5,
    publishedAt: "2026-11-05",
    intro:
      "A first mousepad does not need to be the best pad on the market. It needs to be big enough for your sensitivity, consistent enough to build muscle memory, and affordable enough that you can replace it when it wears out. Those three constraints narrow the field quickly.",
    sections: [
      {
        heading: "Start with size, not surface",
        paragraphs: [
          "Measure the usable desk area and your mouse movement at your current sensitivity. If you routinely run out of room during a 180-degree turn, a larger pad will improve your aim more than any surface change.",
          "A common mistake is buying a fast, expensive pad in a size that forces constant lifting. Pick a size that lets you complete your normal swipes first, then choose the surface.",
        ],
        bullets: [
          "Low sensitivity: prioritize a larger surface",
          "High sensitivity: a medium pad is usually enough",
          "Leave room for the keyboard and a comfortable arm angle",
        ],
      },
      {
        heading: "Pick a middle-ground surface",
        paragraphs: [
          "Balanced pads are the safest first buy because they do not exaggerate either end of the spectrum. They give you enough stopping power to learn recoil control and enough glide to track without feeling stuck.",
          "If you already know you prefer tactical, low-sensitivity play, a control pad is reasonable. If you play tracking-heavy games at a higher sensitivity, lean toward balanced-speed. Avoid extreme speed pads for a first purchase unless you specifically want to train cleaner stops.",
        ],
        bullets: [],
      },
      {
        heading: "Plan for maintenance and replacement",
        paragraphs: [
          "Cloth pads wear out. The surface compresses, edges fray, and the glide changes. A first pad should be easy to clean and cheap enough to replace after a year of heavy use.",
          "Do not over-optimize accessories at the start. Mouse feet and sleeves can change the feel, but they are easier to evaluate once you have a stable baseline pad and a few weeks of consistent practice.",
        ],
        bullets: [
          "Wash with mild soap and air-dry fully",
          "Replace worn cloth rather than chasing the original feel",
          "Change one accessory at a time",
        ],
      },
    ],
    takeaways: [
      "Choose a size that supports your natural swipes before choosing a surface.",
      "A balanced pad is the safest starting point for most players.",
      "Keep maintenance simple and replace worn cloth pads instead of over-tuning.",
    ],
    relatedPadSlugs: [
      "steelseries-qck-heavy",
      "lgg-saturn-pro-soft",
      "artisan-zero-soft",
      "artisan-raiden-soft",
    ],
    keywords: [
      "first gaming mousepad",
      "how to choose a mousepad",
      "best beginner mousepad",
      "mousepad size guide",
      "fps mousepad buying guide",
    ],
  },
];

export function getAllGuides() {
  return guides;
}

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
