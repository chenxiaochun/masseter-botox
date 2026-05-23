# Botox Units & Cost Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Botox units & cost calculator website targeting English-speaking global traffic, starting with a Masseter-focused tool and designed to expand to all major treatment areas.

**Architecture:** Next.js 15 App Router with static generation (SSG) for maximum Lighthouse scores. Pure client-side calculation logic (no backend needed) enables fast loads and easy testing. Each treatment area gets its own SEO-optimised page under a shared dynamic route.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, Jest + React Testing Library, Vercel (free tier)

---

## File Map

| File | Responsibility |
|------|---------------|
| `types/index.ts` | Shared TypeScript types (inputs, results, area data shape) |
| `data/areas.ts` | Per-area unit ranges, pricing by country, duration data |
| `lib/calculate.ts` | Pure function: input → result (fully unit-testable) |
| `components/Calculator.tsx` | Client component: form inputs + calls calculate() |
| `components/ResultCard.tsx` | Displays a CalculatorResult with context text |
| `components/FAQ.tsx` | Renders FAQ items + injects FAQPage schema |
| `components/AdUnit.tsx` | AdSense slot wrapper (shows placeholder if no publisher ID) |
| `app/layout.tsx` | Root layout: header, footer, AdSense script injection |
| `app/globals.css` | Tailwind directives only |
| `app/page.tsx` | Redirects `/` → `/masseter` |
| `app/masseter/page.tsx` | Masseter SEO page: metadata, structured data, Calculator, FAQ |
| `app/about/page.tsx` | About page (required for AdSense approval) |
| `app/privacy/page.tsx` | Privacy Policy page (required for AdSense approval) |
| `app/sitemap.ts` | Auto-generates sitemap.xml |
| `app/robots.ts` | Generates robots.txt |
| `__tests__/lib/calculate.test.ts` | Unit tests for calculation logic |
| `__tests__/components/ResultCard.test.tsx` | Component tests for result display |
| `__tests__/components/Calculator.test.tsx` | Component tests for form interaction |

---

## Task 1: Project Initialisation

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `.env.local`

- [ ] **Step 1: Scaffold the Next.js project**

Run inside `/Users/chenxiaochun/Documents/MyProject/seoer`:
```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --no-git \
  --import-alias "@/*"
```
When prompted for project name, press Enter to accept `.`.

- [ ] **Step 2: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event ts-jest @types/jest
```

- [ ] **Step 3: Create jest.config.ts**

```typescript
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create jest.setup.ts**

```typescript
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Create .env.local**

```bash
# .env.local
# Add your AdSense publisher ID here after approval, e.g.: ca-pub-1234567890123456
NEXT_PUBLIC_ADSENSE_CLIENT=
```

- [ ] **Step 6: Remove create-next-app boilerplate**

Replace `app/page.tsx` content with a single line (will be replaced in Task 11):
```tsx
export default function Home() { return null }
```

Replace `app/globals.css` with only Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 7: Verify tests run**

```bash
npm test -- --passWithNoTests
```
Expected: `Test Suites: 0 passed`

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: initialise Next.js 15 project with Jest"
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Create types/index.ts**

```typescript
// types/index.ts
export type Concern = 'slimming' | 'bruxism'
export type Country = 'US' | 'UK' | 'AU' | 'CA' | 'other'

export interface CalculatorInput {
  concern: Concern
  country: Country
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
      perSide: { min: number; max: number }
      firstTimeReduction: number
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add types/index.ts
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Data Layer

**Files:**
- Create: `data/areas.ts`

- [ ] **Step 1: Create data/areas.ts**

```typescript
// data/areas.ts
import type { AreaData } from '@/types'

export const masseterArea: AreaData = {
  slug: 'masseter',
  name: 'Masseter / Jaw',
  concerns: ['slimming', 'bruxism'],
  units: {
    slimming: { perSide: { min: 20, max: 30 }, firstTimeReduction: 25 },
    bruxism:  { perSide: { min: 25, max: 35 }, firstTimeReduction: 20 },
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add data/areas.ts
git commit -m "feat: add masseter area data"
```

---

## Task 4: Calculation Logic (TDD)

**Files:**
- Create: `__tests__/lib/calculate.test.ts`
- Create: `lib/calculate.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// __tests__/lib/calculate.test.ts
import { calculate } from '@/lib/calculate'
import { masseterArea } from '@/data/areas'

describe('calculate – masseter slimming, US, not first time', () => {
  const result = calculate(masseterArea, { concern: 'slimming', country: 'US', firstTime: false })

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

describe('calculate – first-time reduction', () => {
  const result = calculate(masseterArea, { concern: 'slimming', country: 'US', firstTime: true })

  it('reduces units per side by 25%', () => {
    expect(result.unitsPerSide.min).toBe(15) // 20 * 0.75
    expect(result.unitsPerSide.max).toBe(23) // 30 * 0.75 = 22.5 → rounded to 23
  })

  it('total units equal double the per-side units', () => {
    expect(result.totalUnits.min).toBe(result.unitsPerSide.min * 2)
    expect(result.totalUnits.max).toBe(result.unitsPerSide.max * 2)
  })
})

describe('calculate – masseter bruxism, UK', () => {
  const result = calculate(masseterArea, { concern: 'bruxism', country: 'UK', firstTime: false })

  it('uses bruxism unit ranges', () => {
    expect(result.unitsPerSide).toEqual({ min: 25, max: 35 })
  })

  it('returns cost in GBP', () => {
    expect(result.cost.currency).toBe('GBP')
    expect(result.cost.symbol).toBe('£')
    expect(result.cost.min).toBe(400)  // 50 * £8
    expect(result.cost.max).toBe(1050) // 70 * £15
  })

  it('returns bruxism duration', () => {
    expect(result.duration).toBe('3–4 months')
  })
})

describe('calculate – explanation text', () => {
  it('mentions "first" for first-time treatment', () => {
    const result = calculate(masseterArea, { concern: 'slimming', country: 'US', firstTime: true })
    expect(result.explanation.toLowerCase()).toMatch(/first/)
  })

  it('mentions "grinding" for bruxism', () => {
    const result = calculate(masseterArea, { concern: 'bruxism', country: 'US', firstTime: false })
    expect(result.explanation.toLowerCase()).toMatch(/grinding/)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- __tests__/lib/calculate.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/calculate'`

- [ ] **Step 3: Implement lib/calculate.ts**

```typescript
// lib/calculate.ts
import type { AreaData, CalculatorInput, CalculatorResult, Concern } from '@/types'

export function calculate(area: AreaData, input: CalculatorInput): CalculatorResult {
  const { concern, country, firstTime } = input
  const unitData = area.units[concern]
  const pricing = area.pricing[country]
  const factor = firstTime ? 1 - unitData.firstTimeReduction / 100 : 1

  const unitsPerSide = {
    min: Math.round(unitData.perSide.min * factor),
    max: Math.round(unitData.perSide.max * factor),
  }
  const totalUnits = { min: unitsPerSide.min * 2, max: unitsPerSide.max * 2 }
  const cost = {
    min: totalUnits.min * pricing.perUnit.min,
    max: totalUnits.max * pricing.perUnit.max,
    currency: pricing.currency,
    symbol: pricing.symbol,
  }

  return {
    unitsPerSide,
    totalUnits,
    cost,
    duration: area.duration[concern],
    explanation: buildExplanation(concern, firstTime, area.duration[concern]),
  }
}

function buildExplanation(concern: Concern, firstTime: boolean, duration: string): string {
  if (concern === 'slimming') {
    return firstTime
      ? `First treatments use a conservative dose to assess muscle response. Slimming results appear after 4–6 weeks and last ${duration}.`
      : `A standard dose for jaw slimming. Results take 4–6 weeks to show fully and last ${duration}.`
  }
  return firstTime
    ? `Starting dose for bruxism relief. Most patients notice reduced grinding within 2 weeks. Effects last ${duration}.`
    : `Typical maintenance dose for teeth grinding. Jaw tension relief usually begins within 2 weeks and lasts ${duration}.`
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- __tests__/lib/calculate.test.ts
```
Expected: PASS — all 9 tests green

- [ ] **Step 5: Commit**

```bash
git add lib/calculate.ts __tests__/lib/calculate.test.ts
git commit -m "feat: add calculate() logic with tests"
```

---

## Task 5: ResultCard Component (TDD)

**Files:**
- Create: `__tests__/components/ResultCard.test.tsx`
- Create: `components/ResultCard.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
// __tests__/components/ResultCard.test.tsx
import { render, screen } from '@testing-library/react'
import ResultCard from '@/components/ResultCard'
import type { CalculatorResult } from '@/types'

const mockResult: CalculatorResult = {
  unitsPerSide: { min: 20, max: 30 },
  totalUnits:   { min: 40, max: 60 },
  cost: { min: 400, max: 1200, currency: 'USD', symbol: '$' },
  duration: '4–6 months',
  explanation: 'A standard dose for jaw slimming.',
}

describe('ResultCard', () => {
  beforeEach(() => render(<ResultCard result={mockResult} />))

  it('displays units per side', () => {
    expect(screen.getByText('20–30 units')).toBeInTheDocument()
  })

  it('displays total units', () => {
    expect(screen.getByText('40–60 units')).toBeInTheDocument()
  })

  it('displays cost with symbol and currency code', () => {
    expect(screen.getByText('$400–$1200 USD')).toBeInTheDocument()
  })

  it('displays duration', () => {
    expect(screen.getByText('4–6 months')).toBeInTheDocument()
  })

  it('displays explanation', () => {
    expect(screen.getByText('A standard dose for jaw slimming.')).toBeInTheDocument()
  })

  it('displays disclaimer mentioning not medical advice', () => {
    expect(screen.getByText(/not medical advice/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- __tests__/components/ResultCard.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/ResultCard'`

- [ ] **Step 3: Implement components/ResultCard.tsx**

```tsx
// components/ResultCard.tsx
import type { CalculatorResult } from '@/types'

interface Props { result: CalculatorResult }

export default function ResultCard({ result }: Props) {
  const { unitsPerSide, totalUnits, cost, duration, explanation } = result
  return (
    <div className="mt-6 p-5 bg-rose-50 rounded-xl border border-rose-100">
      <h3 className="font-semibold text-gray-900 mb-4">Your Estimate</h3>
      <dl className="space-y-3">
        <Row label="Units per side"          value={`${unitsPerSide.min}–${unitsPerSide.max} units`} />
        <Row label="Total units (both sides)" value={`${totalUnits.min}–${totalUnits.max} units`} />
        <div className="border-t border-rose-200 pt-3">
          <Row
            label="Estimated cost"
            value={`${cost.symbol}${cost.min}–${cost.symbol}${cost.max} ${cost.currency}`}
            highlight
          />
        </div>
        <Row label="Results last" value={duration} />
      </dl>
      <p className="mt-4 text-xs text-gray-500 leading-relaxed">{explanation}</p>
      <p className="mt-2 text-xs text-gray-400">
        For estimation only. Actual units and costs vary by provider. Not medical advice.
      </p>
    </div>
  )
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-sm text-gray-600">{label}</dt>
      <dd className={`text-sm font-medium ${highlight ? 'text-rose-600 font-semibold' : 'text-gray-900'}`}>
        {value}
      </dd>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- __tests__/components/ResultCard.test.tsx
```
Expected: PASS — all 6 tests green

- [ ] **Step 5: Commit**

```bash
git add components/ResultCard.tsx __tests__/components/ResultCard.test.tsx
git commit -m "feat: add ResultCard component with tests"
```

---

## Task 6: Calculator Component (TDD)

**Files:**
- Create: `__tests__/components/Calculator.test.tsx`
- Create: `components/Calculator.tsx`

- [ ] **Step 1: Write the failing tests**

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

    // Bruxism uses more units than slimming
    expect(slimmingUnits).not.toBe(bruxismUnits)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- __tests__/components/Calculator.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Calculator'`

- [ ] **Step 3: Implement components/Calculator.tsx**

```tsx
// components/Calculator.tsx
'use client'

import { useState } from 'react'
import type { AreaData, CalculatorInput, CalculatorResult, Country } from '@/types'
import { calculate } from '@/lib/calculate'
import ResultCard from './ResultCard'

interface Props { area: AreaData }

export default function Calculator({ area }: Props) {
  const [input, setInput] = useState<CalculatorInput>({
    concern: 'slimming',
    country: 'US',
    firstTime: false,
  })
  const [result, setResult] = useState<CalculatorResult | null>(null)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="space-y-5">

        {/* Concern */}
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Treatment Goal
          </legend>
          <div className="flex gap-3">
            {area.concerns.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setInput((p) => ({ ...p, concern: c }))}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  input.concern === c
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-rose-300'
                }`}
              >
                {c === 'slimming' ? 'Jaw Slimming' : 'Teeth Grinding (Bruxism)'}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Your Country
          </label>
          <select
            id="country"
            value={input.country}
            onChange={(e) => setInput((p) => ({ ...p, country: e.target.value as Country }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="US">United States (USD)</option>
            <option value="UK">United Kingdom (GBP)</option>
            <option value="AU">Australia (AUD)</option>
            <option value="CA">Canada (CAD)</option>
            <option value="other">Other (USD estimate)</option>
          </select>
        </div>

        {/* First time */}
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            First time getting this treatment?
          </legend>
          <div className="flex gap-3">
            {([true, false] as const).map((val) => (
              <button
                key={String(val)}
                type="button"
                onClick={() => setInput((p) => ({ ...p, firstTime: val }))}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  input.firstTime === val
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-rose-300'
                }`}
              >
                {val ? 'Yes, first time' : 'No, had it before'}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => setResult(calculate(area, input))}
          className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors"
        >
          Calculate
        </button>
      </div>

      {result && <ResultCard result={result} />}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- __tests__/components/Calculator.test.tsx
```
Expected: PASS — all 5 tests green

- [ ] **Step 5: Run full test suite to confirm nothing is broken**

```bash
npm test
```
Expected: PASS — all tests green

- [ ] **Step 6: Commit**

```bash
git add components/Calculator.tsx __tests__/components/Calculator.test.tsx
git commit -m "feat: add Calculator component with tests"
```

---

## Task 7: FAQ Component

**Files:**
- Create: `components/FAQ.tsx`

- [ ] **Step 1: Create components/FAQ.tsx**

```tsx
// components/FAQ.tsx
interface FAQItem { question: string; answer: string }
interface Props { items: FAQItem[] }

export default function FAQ({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.question} className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-gray-900 mb-1 text-sm">{item.question}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat: add FAQ component with FAQPage schema"
```

---

## Task 8: AdUnit Component

**Files:**
- Create: `components/AdUnit.tsx`

- [ ] **Step 1: Create components/AdUnit.tsx**

```tsx
// components/AdUnit.tsx
'use client'

import { useEffect } from 'react'

interface Props {
  slot: string
  className?: string
}

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? ''

export default function AdUnit({ slot, className = '' }: Props) {
  useEffect(() => {
    if (!CLIENT) return
    try {
      // @ts-expect-error adsbygoogle is injected by the external AdSense script
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {
      // Script not yet loaded — silently ignore
    }
  }, [])

  if (!CLIENT) {
    return (
      <div
        className={`bg-gray-100 rounded-lg flex items-center justify-center min-h-[90px] text-xs text-gray-400 ${className}`}
        aria-hidden="true"
      >
        Ad
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ minHeight: 90 }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/AdUnit.tsx
git commit -m "feat: add AdUnit component (placeholder until AdSense approved)"
```

---

## Task 9: Root Layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? ''

export const metadata: Metadata = {
  title: {
    default: 'Botox Calculator – Units & Cost Estimator',
    template: '%s | BotoxCalc',
  },
  description: 'Free Botox unit and cost calculator. Estimate how many units you need and what it will cost for any treatment area.',
  metadataBase: new URL('https://yourdomain.com'), // TODO: replace with real domain after registration
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-rose-500 text-lg tracking-tight">
              BotoxCalc
            </a>
            <nav className="text-sm text-gray-600 space-x-5">
              <a href="/masseter" className="hover:text-rose-500">Masseter</a>
              <a href="/about"    className="hover:text-rose-500">About</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-6 text-xs text-gray-400 flex flex-wrap gap-4">
            <span>© {new Date().getFullYear()} BotoxCalc</span>
            <a href="/privacy" className="hover:text-gray-600">Privacy Policy</a>
            <a href="/about"   className="hover:text-gray-600">About</a>
            <span>For estimation only. Not medical advice.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add root layout with header, footer, and AdSense script"
```

---

## Task 10: Masseter Page (Main SEO Page)

**Files:**
- Create: `app/masseter/page.tsx`

- [ ] **Step 1: Create app/masseter/page.tsx**

```tsx
// app/masseter/page.tsx
import type { Metadata } from 'next'
import Calculator from '@/components/Calculator'
import FAQ from '@/components/FAQ'
import AdUnit from '@/components/AdUnit'
import { masseterArea } from '@/data/areas'

export const metadata: Metadata = {
  title: 'Masseter Botox Calculator – Units & Cost Estimator',
  description:
    'Calculate how many units of Botox you need for masseter jaw slimming or teeth grinding (bruxism). Get an instant cost estimate for the US, UK, Australia, and Canada.',
  alternates: { canonical: '/masseter' },
}

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Masseter Botox Calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  description: 'Estimate Botox units and cost for masseter jaw slimming and bruxism treatment.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const faqs = [
  {
    question: 'How many units of Botox do I need for masseter jaw slimming?',
    answer:
      'Most patients need 20–30 units per side (40–60 units total) for jaw slimming. First-time patients typically start with 15–25 units per side to assess muscle response.',
  },
  {
    question: 'How much does masseter Botox cost?',
    answer:
      'Masseter Botox typically costs $400–$1,200 in the US, £320–£1,050 in the UK, and A$480–$1,320 in Australia, depending on the number of units used and the provider.',
  },
  {
    question: 'How long does masseter Botox last?',
    answer:
      'Results for jaw slimming last 4–6 months. For bruxism (teeth grinding), effects typically last 3–4 months. Repeated treatments may extend duration over time.',
  },
  {
    question: 'How many units of Botox are needed for teeth grinding (bruxism)?',
    answer:
      'Bruxism treatment typically requires 25–35 units per side (50–70 units total). The masseter muscles engaged in grinding are often stronger and need a higher dose.',
  },
  {
    question: 'Is masseter Botox the same as jaw slimming Botox?',
    answer:
      'Yes. "Masseter Botox," "jaw Botox," and "jaw slimming Botox" all refer to injecting botulinum toxin into the masseter muscle. It reduces muscle bulk gradually over 4–6 weeks when used for facial slimming.',
  },
  {
    question: 'When will I see results from masseter Botox?',
    answer:
      'Reduced jaw tension may be noticeable within 1–2 weeks. Visible slimming results develop over 4–6 weeks as the masseter muscle gradually reduces in size.',
  },
]

export default function MasseterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Masseter Botox Calculator
        </h1>
        <p className="text-gray-500 mb-6">
          Estimate how many units you need and what it will cost — for jaw slimming or
          teeth grinding (bruxism).
        </p>

        <AdUnit slot="top-banner" className="mb-6" />

        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <Calculator area={masseterArea} />
          </div>
          <aside className="hidden lg:block">
            <AdUnit slot="sidebar" />
          </aside>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            How to use this calculator
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Select your treatment goal: jaw slimming or bruxism relief.</li>
            <li>Choose your country to get local pricing estimates.</li>
            <li>Indicate whether this is your first treatment.</li>
            <li>Tap <strong>Calculate</strong> to see your personalised estimate.</li>
          </ol>
        </section>

        <AdUnit slot="mid-content" className="my-8" />

        <FAQ items={faqs} />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Start the dev server and verify the page looks correct**

```bash
npm run dev
```
Open `http://localhost:3000/masseter` and check:
- H1 visible: "Masseter Botox Calculator"
- Calculator inputs render (two concern buttons, country dropdown, first-time buttons)
- Clicking Calculate shows result card
- Three ad placeholder boxes visible (top, sidebar, mid)
- FAQ section present with 6 questions

- [ ] **Step 3: Commit**

```bash
git add app/masseter/page.tsx
git commit -m "feat: add masseter SEO page with calculator, FAQ, and structured data"
```

---

## Task 11: Homepage Redirect

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/masseter')
}
```

- [ ] **Step 2: Verify redirect works**

With the dev server running, open `http://localhost:3000` and confirm the browser redirects to `/masseter`.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redirect homepage to /masseter"
```

---

## Task 12: About and Privacy Pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About BotoxCalc – a free tool for estimating Botox units and treatment costs.',
}

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">About BotoxCalc</h1>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          BotoxCalc is a free online tool that helps you estimate the number of Botox
          units you may need and the approximate cost for common cosmetic treatments.
        </p>
        <p>
          Our estimates are based on published clinical guidelines and typical provider
          pricing across multiple countries. They are intended as a starting point for
          conversations with your provider — not as medical advice.
        </p>
        <p>
          <strong className="text-gray-900">Disclaimer:</strong> BotoxCalc is for
          informational and estimation purposes only. Always consult a qualified medical
          professional before undergoing any cosmetic procedure.
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create app/privacy/page.tsx**

```tsx
// app/privacy/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-xs text-gray-400 mb-8">Last updated: 2026-05-22</p>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-semibold text-gray-900 mb-2">Data We Collect</h2>
          <p>
            BotoxCalc does not collect any personal information. All calculations run
            locally in your browser. We do not store your inputs or results.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900 mb-2">Advertising</h2>
          <p>
            We use Google AdSense to display ads. Google may use cookies to serve ads
            based on your browsing history. You can opt out at{' '}
            <a
              href="https://www.google.com/settings/ads"
              className="text-rose-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900 mb-2">Analytics</h2>
          <p>
            We may use Google Analytics to understand aggregate, anonymous site usage.
            No personally identifiable data is collected.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900 mb-2">Contact</h2>
          <p>For privacy questions, please use the contact information on the About page.</p>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx app/privacy/page.tsx
git commit -m "feat: add About and Privacy pages for AdSense approval"
```

---

## Task 13: SEO Infrastructure

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Create app/sitemap.ts**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'

// Update BASE_URL after registering your domain
const BASE_URL = 'https://yourdomain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/masseter`, lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.3 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.2 },
  ]
}
```

- [ ] **Step 2: Create app/robots.ts**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

// Update BASE_URL after registering your domain
const BASE_URL = 'https://yourdomain.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Verify sitemap and robots.txt render**

With dev server running:
- Open `http://localhost:3000/sitemap.xml` — should return XML with 3 URLs
- Open `http://localhost:3000/robots.txt` — should return `User-agent: *`, `Allow: /`, `Sitemap: ...`

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: add sitemap.xml and robots.txt"
```

---

## Task 14: Lighthouse Audit & Deploy

**Files:**
- Modify: `app/layout.tsx` (update metadataBase with real domain)
- Modify: `app/sitemap.ts` (update BASE_URL)
- Modify: `app/robots.ts` (update BASE_URL)

- [ ] **Step 1: Run a production build locally**

```bash
npm run build
```
Expected: ✓ Compiled successfully, no TypeScript errors

- [ ] **Step 2: Run Lighthouse on the masseter page**

```bash
npm run start
```
Open Chrome DevTools → Lighthouse → run on `http://localhost:3000/masseter`.

Target scores:
- Performance: ≥ 90
- SEO: ≥ 95
- Accessibility: ≥ 90
- Best Practices: ≥ 90

Fix any flagged issues before deploying.

- [ ] **Step 3: Register your domain**

Buy a domain containing `botox` + `calculator` or `calc` (e.g., `botoxcalc.com`, `botoxunits.com`) on Namecheap (~$10/year).

- [ ] **Step 4: Update domain references in the codebase**

Replace `yourdomain.com` with your real domain in these three files:
- `app/layout.tsx` — `metadataBase`
- `app/sitemap.ts` — `BASE_URL`
- `app/robots.ts` — `BASE_URL`

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "chore: set production domain"
```

- [ ] **Step 5: Deploy to Vercel**

```bash
npx vercel --prod
```
Follow the prompts to link your GitHub account and project. Add your custom domain in the Vercel dashboard under Settings → Domains.

- [ ] **Step 6: Submit to Google Search Console**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain property
3. Verify ownership via DNS TXT record (Vercel dashboard makes this easy)
4. Submit `https://yourdomain.com/sitemap.xml`

---

## Post-Launch Checklist

- [ ] Wait 2–4 weeks for Google to index the site
- [ ] Monitor Google Search Console for indexing status and impressions
- [ ] Once traffic is steady, apply for Google AdSense
- [ ] After AdSense approval: add your publisher ID to `.env.local` on Vercel (Settings → Environment Variables) and redeploy
