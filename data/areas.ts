// data/areas.ts
import type { AreaData } from '@/types'

export const masseterArea: AreaData = {
  slug: 'masseter',
  name: 'Masseter / Jaw',
  concerns: ['slimming', 'bruxism'],
  units: {
    slimming: {
      perSide: { min: 20, max: 30 },
      firstTimeReduction: 25,
      jawSizeMultiplier: { small: 0.80, medium: 1.00, large: 1.30 },
      genderMultiplier:  { female: 1.00, male: 1.30 },
    },
    bruxism: {
      perSide: { min: 25, max: 35 },
      firstTimeReduction: 20,
      jawSizeMultiplier: { small: 0.80, medium: 1.00, large: 1.30 },
      genderMultiplier:  { female: 1.00, male: 1.30 },
    },
  },
  pricing: {
    US:    { perUnit: { min: 10, max: 20 }, currency: 'USD', symbol: '$'   },
    UK:    { perUnit: { min:  8, max: 15 }, currency: 'GBP', symbol: '£'   },
    AU:    { perUnit: { min: 12, max: 22 }, currency: 'AUD', symbol: 'A$'  },
    CA:    { perUnit: { min: 10, max: 18 }, currency: 'CAD', symbol: 'CA$' },
    other: { perUnit: { min: 10, max: 20 }, currency: 'USD', symbol: '$'   },
  },
  duration: {
    slimming: '4–6 months',
    bruxism:  '3–4 months',
  },
}

export const areas: AreaData[] = [masseterArea]
