// types/index.ts
export type Concern = 'slimming' | 'bruxism'
export type Country = 'US' | 'UK' | 'AU' | 'CA' | 'other'
export type JawSize = 'small' | 'medium' | 'large'
export type Gender  = 'female' | 'male'

export interface CalculatorInput {
  concern:   Concern
  jawSize:   JawSize
  gender:    Gender
  country:   Country
  firstTime: boolean
}

export interface CostRange {
  min: number
  max: number
  currency: string
  symbol: string
}

export interface CalculatorResult {
  unitsPerSide: { min: number; max: number }
  totalUnits: { min: number; max: number }
  cost: CostRange
  duration: string
  explanation: string
}

export interface AreaData {
  slug: string
  name: string
  concerns: Concern[]
  units: {
    [key in Concern]: {
      perSide:           { min: number; max: number }
      firstTimeReduction: number
      jawSizeMultiplier: { small: number; medium: number; large: number }
      genderMultiplier:  { female: number; male: number }
    }
  }
  pricing: {
    [key in Country]: {
      perUnit: { min: number; max: number }
      currency: string
      symbol: string
    }
  }
  duration: { [key in Concern]: string }
}
