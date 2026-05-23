import { render, screen } from '@testing-library/react'
import BruxismPage from '@/app/masseter/(guides)/bruxism/page'

describe('Masseter Bruxism Page', () => {
  it('renders H1 with correct text', () => {
    render(<BruxismPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Botox for Bruxism'
    )
  })

  it('renders FAQ section', () => {
    render(<BruxismPage />)
    expect(screen.getByText(/How is bruxism botox different from jaw slimming/i)).toBeInTheDocument()
  })

  it('renders dosage comparison section', () => {
    render(<BruxismPage />)
    expect(screen.getByText(/Bruxism Dosage vs\. Jaw Slimming/i)).toBeInTheDocument()
  })
})
