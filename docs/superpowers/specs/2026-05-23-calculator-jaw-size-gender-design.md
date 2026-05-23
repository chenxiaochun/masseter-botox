# Calculator: Add Jaw Size + Gender Inputs

**Date:** 2026-05-23  
**Scope:** `components/Calculator.tsx`, `lib/calculate.ts`, `types/index.ts`, `data/areas.ts`, `components/ResultCard.tsx`

## Problem

The current calculator asks only 3 questions (treatment goal, country, first time) and produces a single undifferentiated estimate. Jaw muscle size and biological build — the two strongest clinical determinants of Botox dosage — are completely absent. A male patient with prominent jaw muscles may need 2× the units of a female patient with subtle muscles, yet both receive the same estimate today.

## Solution

Add two new inputs:
1. **Jaw Muscle Size** — visual silhouette selector (small / medium / large)
2. **Jaw Muscle Build** — toggle ("Typically female" / "Typically male")

Apply corresponding multipliers in the calculation engine. Personalize the result explanation.

---

## Data Model

### New types (`types/index.ts`)

```ts
export type JawSize = 'small' | 'medium' | 'large'
export type Gender  = 'female' | 'male'
```

### Updated `CalculatorInput`

```ts
export interface CalculatorInput {
  concern:   Concern
  jawSize:   JawSize   // NEW
  gender:    Gender    // NEW
  country:   Country
  firstTime: boolean
}
```

### Updated `AreaData.units[concern]`

Add multiplier tables to the per-concern unit config:

```ts
units: {
  [key in Concern]: {
    perSide:            { min: number; max: number }
    firstTimeReduction: number
    jawSizeMultiplier:  { small: number; medium: number; large: number }  // NEW
    genderMultiplier:   { female: number; male: number }                  // NEW
  }
}
```

### Multiplier values (`data/areas.ts`)

Both concerns share the same multipliers (jaw anatomy is independent of treatment goal):

| Variable | Value | Multiplier |
|----------|-------|------------|
| Jaw size | small  | 0.80 |
| Jaw size | medium | 1.00 |
| Jaw size | large  | 1.30 |
| Gender   | female | 1.00 |
| Gender   | male   | 1.30 |

---

## Calculation Logic (`lib/calculate.ts`)

Application order — each step multiplies the running unit range:

```
units = base × jawSizeMultiplier × genderMultiplier × (1 - firstTimeReduction if firstTime)
```

Round each bound to the nearest integer after all multipliers are applied (single rounding step, not per-multiplier).

Example — first-time, prominent jaw, typically male, slimming:
```
base: 20–30 u/side
× 1.30 (large jaw)  → 26–39
× 1.30 (male build) → 34–51
× 0.75 (first time) → 25–38 u/side  (rounded)
total: 51–77 u
```

The `buildExplanation()` function receives `jawSize` and `gender` as additional parameters and generates a personalised sentence:

> "Based on your [prominent] jaw muscles and [typically male] build, we've adjusted the estimate upward. First-time conservative dose applied. Results appear in 4–6 weeks and last 4–6 months."

Label mapping for explanation text:
- `small` → "subtle", `medium` → "average", `large` → "prominent"
- `female` → "typically female", `male` → "typically male"

---

## UI (`components/Calculator.tsx`)

### New input order

1. Treatment Goal *(existing)*
2. **Jaw Muscle Size** *(new)*
3. **Jaw Muscle Build** *(new)*
4. Your Country *(existing)*
5. First time? *(existing)*
6. Calculate button

### Jaw Muscle Size input

Three-card selector. Each card contains:
- An SVG jaw-profile silhouette (distinct shape per size)
- Chinese label: 圆润 / 适中 / 方形突出
- English sub-label: Subtle / Average / Prominent

Selected state: `border-primary bg-primary/8`, unselected: `border-border`.  
Helper hint below the cards: *"Clench your jaw and compare the shape"*

Default value: `medium`.

### Jaw Muscle Build input

`ToggleGroup` (same pattern as existing inputs):
- Left: "Typically female"
- Right: "Typically male"

Sub-label below: *"Male jaw muscles are typically 30% denser — affects dosage"*

Default value: `female`.

---

## Result Card (`components/ResultCard.tsx`)

No structural or layout changes. Only the `explanation` string changes — it now references jaw size and build (see Calculation Logic above). The `CalculatorResult` type is unchanged.

---

## Tests

Update existing tests in `__tests__/lib/calculate.test.ts` and `__tests__/components/Calculator.test.tsx`:

- Add `jawSize` and `gender` to all `CalculatorInput` fixtures
- Add test cases for boundary combinations: small+female, large+male, medium+female first-time
- Verify multiplier math: large+male+not-first-time slimming → `20×1.3×1.3 = 33.8 → 34` min per side
- Verify rounding happens once at the end, not per multiplier

No new test files needed.

---

## Out of Scope

- Toxin brand selection (Botox vs Dysport vs Xeomin)
- Flat-fee / per-area pricing model
- Severity / desired outcome intensity
- Any changes to the About, Privacy, or FAQ pages
