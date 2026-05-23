// __tests__/lib/calculate.test.ts
import { calculate } from '@/lib/calculate'
import { masseterArea } from '@/data/areas'

// Baseline fixture — medium jaw + female build = 1.0 × 1.0, same results as before
const baseline = { jawSize: 'medium' as const, gender: 'female' as const }

describe('calculate – slimming, US, medium+female, not first time (baseline)', () => {
  const result = calculate(masseterArea, { concern: 'slimming', country: 'US', firstTime: false, ...baseline })

  it('returns correct units per side', () => {
    expect(result.unitsPerSide).toEqual({ min: 20, max: 30 })
  })

  it('returns correct total units', () => {
    expect(result.totalUnits).toEqual({ min: 40, max: 60 })
  })

  it('returns correct cost range in USD', () => {
    expect(result.cost.min).toBe(400)
    expect(result.cost.max).toBe(1200)
    expect(result.cost.currency).toBe('USD')
    expect(result.cost.symbol).toBe('$')
  })

  it('returns slimming duration', () => {
    expect(result.duration).toBe('4–6 months')
  })
})

describe('calculate – first-time reduction (medium+female baseline)', () => {
  const result = calculate(masseterArea, { concern: 'slimming', country: 'US', firstTime: true, ...baseline })

  it('reduces units per side by 25%', () => {
    expect(result.unitsPerSide.min).toBe(15) // Math.round(20 * 0.75)
    expect(result.unitsPerSide.max).toBe(23) // Math.round(30 * 0.75) = 22.5 → 23
  })

  it('total units equal double the per-side units', () => {
    expect(result.totalUnits.min).toBe(result.unitsPerSide.min * 2)
    expect(result.totalUnits.max).toBe(result.unitsPerSide.max * 2)
  })
})

describe('calculate – bruxism, UK, medium+female', () => {
  const result = calculate(masseterArea, { concern: 'bruxism', country: 'UK', firstTime: false, ...baseline })

  it('uses bruxism unit ranges', () => {
    expect(result.unitsPerSide).toEqual({ min: 25, max: 35 })
  })

  it('returns cost in GBP', () => {
    expect(result.cost.currency).toBe('GBP')
    expect(result.cost.symbol).toBe('£')
    expect(result.cost.min).toBe(400)   // 50 * £8
    expect(result.cost.max).toBe(1050)  // 70 * £15
  })

  it('returns bruxism duration', () => {
    expect(result.duration).toBe('3–4 months')
  })
})

describe('calculate – jaw size multiplier', () => {
  it('small jaw reduces units by 20%: min=16, max=24', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false,
      jawSize: 'small', gender: 'female',
    })
    // Math.round(20 * 0.80) = 16, Math.round(30 * 0.80) = 24
    expect(result.unitsPerSide).toEqual({ min: 16, max: 24 })
  })

  it('large jaw increases units by 30%: min=26, max=39', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false,
      jawSize: 'large', gender: 'female',
    })
    // Math.round(20 * 1.30) = 26, Math.round(30 * 1.30) = 39
    expect(result.unitsPerSide).toEqual({ min: 26, max: 39 })
  })
})

describe('calculate – gender multiplier', () => {
  it('male build increases units by 30%: min=26, max=39', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false,
      jawSize: 'medium', gender: 'male',
    })
    // Math.round(20 * 1.30) = 26, Math.round(30 * 1.30) = 39
    expect(result.unitsPerSide).toEqual({ min: 26, max: 39 })
  })
})

describe('calculate – combined multipliers (large + male)', () => {
  it('not first time: min=34, max=51', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false,
      jawSize: 'large', gender: 'male',
    })
    // Math.round(20 * 1.3 * 1.3) = Math.round(33.8) = 34
    // Math.round(30 * 1.3 * 1.3) = Math.round(50.7) = 51
    expect(result.unitsPerSide).toEqual({ min: 34, max: 51 })
    expect(result.totalUnits).toEqual({ min: 68, max: 102 })
  })

  it('first time: min=25, max=38 (single rounding after all multipliers)', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: true,
      jawSize: 'large', gender: 'male',
    })
    // Math.round(20 * 1.3 * 1.3 * 0.75) = Math.round(25.35) = 25
    // Math.round(30 * 1.3 * 1.3 * 0.75) = Math.round(38.025) = 38
    expect(result.unitsPerSide).toEqual({ min: 25, max: 38 })
  })
})

describe('calculate – explanation text', () => {
  it('mentions "first" for first-time treatment', () => {
    const result = calculate(masseterArea, { concern: 'slimming', country: 'US', firstTime: true, ...baseline })
    expect(result.explanation.toLowerCase()).toMatch(/first/)
  })

  it('mentions "grinding" for bruxism', () => {
    const result = calculate(masseterArea, { concern: 'bruxism', country: 'US', firstTime: false, ...baseline })
    expect(result.explanation.toLowerCase()).toMatch(/grinding/)
  })

  it('includes jaw size label for non-baseline (large jaw)', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false,
      jawSize: 'large', gender: 'female',
    })
    expect(result.explanation.toLowerCase()).toMatch(/prominent/)
  })

  it('includes gender label for non-baseline (male build)', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false,
      jawSize: 'medium', gender: 'male',
    })
    expect(result.explanation.toLowerCase()).toMatch(/typically male/)
  })

  it('no adjustment prefix for medium+female baseline', () => {
    const result = calculate(masseterArea, {
      concern: 'slimming', country: 'US', firstTime: false, ...baseline,
    })
    expect(result.explanation.toLowerCase()).not.toMatch(/based on your/)
  })
})
