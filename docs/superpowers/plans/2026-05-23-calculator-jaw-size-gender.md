# Calculator: Add Jaw Size + Gender Inputs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new calculator inputs — jaw muscle size (visual silhouette selector) and jaw muscle build (toggle) — and apply their clinical dosage multipliers to produce more accurate estimates.

**Architecture:** Types and data are updated first (Task 1), then the calculation logic is updated with TDD (Task 2), then the UI is updated with TDD (Task 3). Each task is independently committable. The `CalculatorResult` shape is unchanged — only the numbers and explanation text improve.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, shadcn/ui, Tailwind CSS 4, Jest + Testing Library

---

## File Map

| File | Change |
|------|--------|
| `types/index.ts` | Add `JawSize`, `Gender` types; extend `CalculatorInput` and `AreaData` |
| `data/areas.ts` | Add `jawSizeMultiplier` and `genderMultiplier` to both concerns |
| `lib/calculate.ts` | Apply multipliers in `calculate()`; update `buildExplanation()` signature |
| `__tests__/lib/calculate.test.ts` | Update fixtures; add multiplier test cases |
| `components/Calculator.tsx` | Add jaw size card selector and gender toggle |
| `__tests__/components/Calculator.test.tsx` | Update fixtures; add render tests for new inputs |

`components/ResultCard.tsx` and `__tests__/components/ResultCard.test.tsx` are **not touched** — `CalculatorResult` shape is unchanged.

---

## Task 1: Update Types and Data

**Files:**
- Modify: `types/index.ts`
- Modify: `data/areas.ts`

- [ ] **Step 1: Update `types/index.ts`**

Replace the entire file with:

```ts
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
```

- [ ] **Step 2: Update `data/areas.ts`**

Replace the entire file with:

```ts
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
```

- [ ] **Step 3: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see "Property 'jawSizeMultiplier' is missing", re-check Step 2.

- [ ] **Step 4: Commit**

```bash
git add types/index.ts data/areas.ts
git commit -m "feat: add JawSize and Gender types with dosage multipliers"
```

---

## Task 2: Calculation Logic (TDD)

**Files:**
- Modify: `__tests__/lib/calculate.test.ts`
- Modify: `lib/calculate.ts`

- [ ] **Step 1: Update test file with new fixtures and cases**

Replace `__tests__/lib/calculate.test.ts` with:

```ts
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
```

- [ ] **Step 2: Run tests — expect failures**

```bash
npm test -- __tests__/lib/calculate.test.ts
```

Expected: TypeScript compile errors — `Object literal may be missing 'jawSize', 'gender'` in `calculate.ts` call signature. That's correct — the implementation hasn't been updated yet.

- [ ] **Step 3: Replace `lib/calculate.ts`**

```ts
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
```

- [ ] **Step 4: Run tests — expect all pass**

```bash
npm test -- __tests__/lib/calculate.test.ts
```

Expected output:
```
Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
```

If any test fails, check the multiplier math using the formulas in the test comments.

- [ ] **Step 5: Run full suite — confirm no regressions**

```bash
npm test
```

Expected: all test suites pass.

- [ ] **Step 6: Commit**

```bash
git add lib/calculate.ts __tests__/lib/calculate.test.ts
git commit -m "feat: apply jaw size and gender multipliers in calculate()"
```

---

## Task 3: Calculator UI (TDD)

**Files:**
- Modify: `__tests__/components/Calculator.test.tsx`
- Modify: `components/Calculator.tsx`

- [ ] **Step 1: Update component test file**

Replace `__tests__/components/Calculator.test.tsx` with:

```tsx
// __tests__/components/Calculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from '@/components/Calculator'
import { masseterArea } from '@/data/areas'

describe('Calculator', () => {
  it('renders concern selection buttons', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Jaw Slimming')).toBeInTheDocument()
    expect(screen.getByText('Teeth Grinding (Bruxism)')).toBeInTheDocument()
  })

  it('renders jaw muscle size cards', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('圆润')).toBeInTheDocument()
    expect(screen.getByText('适中')).toBeInTheDocument()
    expect(screen.getByText('方形突出')).toBeInTheDocument()
  })

  it('renders jaw size sub-labels', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Subtle')).toBeInTheDocument()
    expect(screen.getByText('Average')).toBeInTheDocument()
    expect(screen.getByText('Prominent')).toBeInTheDocument()
  })

  it('renders jaw muscle build toggle', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Typically female')).toBeInTheDocument()
    expect(screen.getByText('Typically male')).toBeInTheDocument()
  })

  it('renders country dropdown', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders first-time buttons', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Yes, first time')).toBeInTheDocument()
    expect(screen.getByText('No, had it before')).toBeInTheDocument()
  })

  it('shows result after clicking Calculate', () => {
    render(<Calculator area={masseterArea} />)
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    expect(screen.getByText('Your Estimate')).toBeInTheDocument()
  })

  it('switches concern to bruxism and recalculates', () => {
    render(<Calculator area={masseterArea} />)
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const slimmingUnits = screen.getByText(/units per side/i)
      .closest('div')?.querySelector('dd')?.textContent

    fireEvent.click(screen.getByText('Teeth Grinding (Bruxism)'))
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const bruxismUnits = screen.getByText(/units per side/i)
      .closest('div')?.querySelector('dd')?.textContent

    expect(slimmingUnits).not.toBe(bruxismUnits)
  })
})
```

- [ ] **Step 2: Run tests — expect new tests to fail**

```bash
npm test -- __tests__/components/Calculator.test.tsx
```

Expected: `圆润`, `Subtle`, `Typically female` etc. not found. Existing tests still pass.

- [ ] **Step 3: Replace `components/Calculator.tsx`**

```tsx
'use client'

import { useRef, useState } from 'react'
import type { AreaData, CalculatorInput, CalculatorResult, Country, JawSize, Gender } from '@/types'
import { calculate } from '@/lib/calculate'
import ResultCard from './ResultCard'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Props { area: AreaData }

const JAW_SIZE_OPTIONS: { value: JawSize; label: string; subLabel: string; svgPath: string }[] = [
  {
    value: 'small',
    label: '圆润',
    subLabel: 'Subtle',
    svgPath: 'M30 5 C45 5, 52 18, 52 35 C52 52, 44 62, 30 65 C16 62, 8 52, 8 35 C8 18, 15 5, 30 5Z',
  },
  {
    value: 'medium',
    label: '适中',
    subLabel: 'Average',
    svgPath: 'M30 5 C46 5, 54 16, 54 33 C54 50, 46 60, 38 64 L30 66 L22 64 C14 60, 6 50, 6 33 C6 16, 14 5, 30 5Z',
  },
  {
    value: 'large',
    label: '方形突出',
    subLabel: 'Prominent',
    svgPath: 'M30 5 C47 5, 56 15, 57 30 C58 46, 55 57, 44 63 L30 66 L16 63 C5 57, 2 46, 3 30 C4 15, 13 5, 30 5Z',
  },
]

export default function Calculator({ area }: Props) {
  const [input, setInput] = useState<CalculatorInput>({
    concern:   'slimming',
    jawSize:   'medium',
    gender:    'female',
    country:   'US',
    firstTime: false,
  })
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  function handleCalculate() {
    const r = calculate(area, input)
    setResult(r)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  }

  return (
    <Card className="shadow-lg ring-1 ring-border">
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="font-heading text-lg font-bold text-foreground">
          Get Your Estimate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-5">

        {/* Treatment Goal */}
        <div className="space-y-2">
          <Label>Treatment Goal</Label>
          <ToggleGroup
            type="single"
            value={input.concern}
            onValueChange={(v) =>
              v && setInput((p) => ({ ...p, concern: v as CalculatorInput['concern'] }))
            }
            variant="outline"
            spacing={0}
            className="w-full"
          >
            {area.concerns.map((c) => (
              <ToggleGroupItem
                key={c}
                value={c}
                className="flex-1 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {c === 'slimming' ? 'Jaw Slimming' : 'Teeth Grinding (Bruxism)'}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Jaw Muscle Size */}
        <div className="space-y-2">
          <Label>Jaw Muscle Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {JAW_SIZE_OPTIONS.map(({ value, label, subLabel, svgPath }) => (
              <button
                key={value}
                type="button"
                onClick={() => setInput((p) => ({ ...p, jawSize: value }))}
                className={cn(
                  'flex flex-col items-center rounded-lg border p-3 text-center transition-colors',
                  input.jawSize === value
                    ? 'border-primary bg-primary/8'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <svg width="44" height="50" viewBox="0 0 60 70" aria-hidden="true">
                  <path
                    d={svgPath}
                    fill="none"
                    stroke={input.jawSize === value ? 'hsl(var(--primary))' : '#9ca3af'}
                    strokeWidth="2.5"
                  />
                </svg>
                <span className={cn(
                  'text-sm font-medium mt-1',
                  input.jawSize === value ? 'text-primary' : 'text-foreground'
                )}>
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">{subLabel}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            💡 Clench your jaw and compare the shape
          </p>
        </div>

        {/* Jaw Muscle Build */}
        <div className="space-y-2">
          <Label>Jaw Muscle Build</Label>
          <ToggleGroup
            type="single"
            value={input.gender}
            onValueChange={(v) =>
              v && setInput((p) => ({ ...p, gender: v as Gender }))
            }
            variant="outline"
            spacing={0}
            className="w-full"
          >
            <ToggleGroupItem
              value="female"
              className="flex-1 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Typically female
            </ToggleGroupItem>
            <ToggleGroupItem
              value="male"
              className="flex-1 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Typically male
            </ToggleGroupItem>
          </ToggleGroup>
          <p className="text-xs text-muted-foreground">
            Male jaw muscles are typically 30% denser — affects dosage
          </p>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Your Country</Label>
          <Select
            value={input.country}
            onValueChange={(v) => setInput((p) => ({ ...p, country: v as Country }))}
          >
            <SelectTrigger id="country" className="w-full cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States (USD)</SelectItem>
              <SelectItem value="UK">United Kingdom (GBP)</SelectItem>
              <SelectItem value="AU">Australia (AUD)</SelectItem>
              <SelectItem value="CA">Canada (CAD)</SelectItem>
              <SelectItem value="other">Other (USD estimate)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* First time */}
        <div className="space-y-2">
          <Label>First time getting this treatment?</Label>
          <ToggleGroup
            type="single"
            value={String(input.firstTime)}
            onValueChange={(v) =>
              v !== '' && setInput((p) => ({ ...p, firstTime: v === 'true' }))
            }
            variant="outline"
            spacing={0}
            className="w-full"
          >
            <ToggleGroupItem
              value="true"
              className="flex-1 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Yes, first time
            </ToggleGroupItem>
            <ToggleGroupItem
              value="false"
              className="flex-1 cursor-pointer data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              No, had it before
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Button className="w-full cursor-pointer" onClick={handleCalculate}>
          Calculate
        </Button>
      </CardContent>

      {result && (
        <CardContent className="pt-0">
          <div ref={resultRef}>
            <ResultCard result={result} />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
```

- [ ] **Step 4: Run component tests — expect all pass**

```bash
npm test -- __tests__/components/Calculator.test.tsx
```

Expected:
```
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
```

- [ ] **Step 5: Run full suite — confirm no regressions**

```bash
npm test
```

Expected: all 3 test suites pass (calculate + Calculator + ResultCard).

- [ ] **Step 6: Commit**

```bash
git add components/Calculator.tsx __tests__/components/Calculator.test.tsx
git commit -m "feat: add jaw size visual selector and gender toggle to calculator"
```

---

## Done

All tasks complete. Verify with `npm test` — all suites green. The calculator now factors jaw muscle size and biological build into every estimate, with personalised explanation text for non-baseline inputs.
