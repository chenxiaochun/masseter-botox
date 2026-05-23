import { render, screen } from '@testing-library/react'
import BeforeAfterPage from '@/app/masseter/(guides)/before-after/page'

describe('Masseter Before-After Page', () => {
  it('renders H1 with correct text', () => {
    render(<BeforeAfterPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Masseter Botox Before and After'
    )
  })

  it('renders FAQ section', () => {
    render(<BeforeAfterPage />)
    expect(screen.getByText(/How long until I see results/i)).toBeInTheDocument()
  })

  it('renders peak results section', () => {
    render(<BeforeAfterPage />)
    expect(screen.getByText(/Month 3/i)).toBeInTheDocument()
  })
})
