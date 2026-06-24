import { artisanMousepads } from "./artisan"
import { lggMousepads } from "./lgg"
import { steelseriesMousepads } from "./steelseries"
import { xraypadMousepads } from "./xraypad"
import { zowieMousepads } from "./zowie"
import { othersMousepads } from "./others"
import { glassMousepads } from "./glasspads"
import { relatedAlternativesBySlug } from "./related-alternatives"

const baseMousepads = [
  ...artisanMousepads,
  ...lggMousepads,
  ...steelseriesMousepads,
  ...xraypadMousepads,
  ...zowieMousepads,
  ...othersMousepads,
  ...glassMousepads,
]

export const mousepads = baseMousepads.map((mousepad) => ({
  ...mousepad,
  relatedAlternatives:
    relatedAlternativesBySlug[mousepad.slug] ?? mousepad.relatedAlternatives,
}))

export {
  artisanMousepads,
  lggMousepads,
  steelseriesMousepads,
  xraypadMousepads,
  zowieMousepads,
  othersMousepads,
  glassMousepads,
}
