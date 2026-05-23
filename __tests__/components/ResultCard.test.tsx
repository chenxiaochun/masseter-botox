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
