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
                aria-pressed={input.jawSize === value}
                onClick={() => setInput((p) => ({ ...p, jawSize: value }))}
                className={cn(
                  'flex flex-col items-center rounded-lg border p-3 text-center transition-colors',
                  input.jawSize === value
                    ? 'border-primary bg-primary/10'
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
