import type { CalculatorResult } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Syringe, Layers, DollarSign, Clock, Info } from 'lucide-react'

interface Props { result: CalculatorResult }

export default function ResultCard({ result }: Props) {
  const { unitsPerSide, totalUnits, cost, duration, explanation } = result
  return (
    <Card className="bg-primary/8 ring-1 ring-primary/25 shadow-sm animate-in fade-in-0 slide-in-from-bottom-3 duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-base font-semibold flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
            <Syringe className="w-3 h-3 text-primary" />
          </span>
          Your Estimate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <dl className="space-y-3">
          <Row
            icon={<Syringe className="w-3.5 h-3.5" />}
            label="Units per side"
            value={`${unitsPerSide.min}–${unitsPerSide.max} units`}
          />
          <Row
            icon={<Layers className="w-3.5 h-3.5" />}
            label="Total units (both sides)"
            value={`${totalUnits.min}–${totalUnits.max} units`}
          />
          <Separator />
          <div className="flex justify-between items-center">
            <dt className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-muted-foreground/60">
                <DollarSign className="w-3.5 h-3.5" />
              </span>
              Estimated cost
            </dt>
            <dd>
              <Badge className="text-sm h-auto py-0.5 px-2.5 font-semibold">
                {`${cost.symbol}${cost.min}–${cost.symbol}${cost.max} ${cost.currency}`}
              </Badge>
            </dd>
          </div>
          <Row
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Results last"
            value={duration}
          />
        </dl>

        <Separator className="opacity-50" />

        <div className="flex gap-2 items-start">
          <Info className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">{explanation}</p>
        </div>

        <p className="text-[11px] text-muted-foreground/60 leading-relaxed pl-5">
          For estimation only. Actual units and costs vary by provider. Not medical advice.
        </p>
      </CardContent>
    </Card>
  )
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between items-center">
      <dt className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="text-muted-foreground/60">{icon}</span>
        {label}
      </dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  )
}
