import { render, screen } from '@testing-library/react'
import RecoveryPage from '@/app/masseter/(guides)/recovery/page'

describe('Masseter Recovery Page', () => {
  it('renders H1 with correct text', () => {
    render(<RecoveryPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Masseter Botox Recovery'
    )
  })

  it('renders FAQ section', () => {
    render(<RecoveryPage />)
    expect(screen.getByText(/How long is recovery after masseter botox/i)).toBeInTheDocument()
  })

  it('renders aftercare section', () => {
    render(<RecoveryPage />)
    expect(screen.getByText(/Aftercare: Day of Treatment/i)).toBeInTheDocument()
  })
})
