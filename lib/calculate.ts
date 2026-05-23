// lib/calculate.ts
import type { AreaData, CalculatorInput, CalculatorResult, Concern, JawSize, Gender } from '@/types'

export function calculate(area: AreaData, input: CalculatorInput): CalculatorResult {
  const { concern, jawSize, gender, country, firstTime } = input
  const unitData = area.units[concern]
  const pricing   = area.pricing[country]

  const jawFactor       = unitData.jawSizeMultiplier[jawSize]
  const genderFactor    = unitData.genderMultiplier[gender]
  const firstTimeFactor = firstTime ? 1 - unitData.firstTimeReduction / 100 : 1

  // Single rounding step at the end — no intermediate Math.round calls
  const unitsPerSide = {
    min: Math.round(unitData.perSide.min * jawFactor * genderFactor * firstTimeFactor),
    max: Math.round(unitData.perSide.max * jawFactor * genderFactor * firstTimeFactor),
  }
  const totalUnits = { min: unitsPerSide.min * 2, max: unitsPerSide.max * 2 }
  const cost = {
    min: totalUnits.min * pricing.perUnit.min,
    max: totalUnits.max * pricing.perUnit.max,
    currency: pricing.currency,
    symbol:   pricing.symbol,
  }

  return {
    unitsPerSide,
    totalUnits,
    cost,
    duration:    area.duration[concern],
    explanation: buildExplanation(concern, jawSize, gender, firstTime, area.duration[concern]),
  }
}

const JAW_LABEL: Record<JawSize, string>   = { small: 'subtle', medium: 'average', large: 'prominent' }
const GENDER_LABEL: Record<Gender, string> = { female: 'typically female', male: 'typically male' }

function buildExplanation(
  concern: Concern,
  jawSize: JawSize,
  gender: Gender,
  firstTime: boolean,
  duration: string,
): string {
  const isBaseline = jawSize === 'medium' && gender === 'female'
  const prefix = isBaseline
    ? ''
    : `Based on your ${JAW_LABEL[jawSize]} jaw muscles and ${GENDER_LABEL[gender]} build, we've adjusted the estimate accordingly. `

  if (concern === 'slimming') {
    return firstTime
      ? `${prefix}First-time conservative dose applied. Slimming results appear after 4–6 weeks and last ${duration}.`
      : `${prefix}Results take 4–6 weeks to show fully and last ${duration}.`
  }
  return firstTime
    ? `${prefix}First-time conservative dose applied. Most patients notice reduced teeth grinding within 2 weeks. Effects last ${duration}.`
    : `${prefix}Jaw tension relief from teeth grinding usually begins within 2 weeks and lasts ${duration}.`
}
