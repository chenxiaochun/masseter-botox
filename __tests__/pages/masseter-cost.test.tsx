import { render, screen } from '@testing-library/react'
import CostPage from '@/app/masseter/(guides)/cost/page'

describe('Masseter Cost Page', () => {
  it('renders H1 with correct text', () => {
    render(<CostPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Masseter Botox Cost'
    )
  })

  it('renders FAQ section', () => {
    render(<CostPage />)
    expect(screen.getByText(/How much does masseter botox cost per unit/i)).toBeInTheDocument()
  })

  it('renders price comparison section', () => {
    render(<CostPage />)
    expect(screen.getByText('United States')).toBeInTheDocument()
    expect(screen.getByText('United Kingdom')).toBeInTheDocument()
    expect(screen.getByText('Canada')).toBeInTheDocument()
  })
})
