import { render, screen } from '@testing-library/react'
import UnitsPage from '@/app/masseter/(guides)/units/page'

describe('Masseter Units Page', () => {
  it('renders H1 with correct text', () => {
    render(<UnitsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'How Many Units of Botox'
    )
  })

  it('renders FAQ section', () => {
    render(<UnitsPage />)
    expect(screen.getByText(/How many units of Botox for jaw slimming/i)).toBeInTheDocument()
  })

  it('renders dosage ranges section', () => {
    render(<UnitsPage />)
    expect(screen.getByRole('heading', { name: /Typical Dosage Ranges/i })).toBeInTheDocument()
  })
})
