import { render, screen } from '@testing-library/react'
import GuidePage from '@/app/masseter/(guides)/guide/page'

describe('Masseter Guide Page', () => {
  it('renders H1 with correct text', () => {
    render(<GuidePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'The Complete Guide to Masseter Botox'
    )
  })

  it('renders FAQ section', () => {
    render(<GuidePage />)
    expect(screen.getByText('Is masseter botox permanent?')).toBeInTheDocument()
  })

  it('renders results timeline section', () => {
    render(<GuidePage />)
    expect(screen.getByText(/Results Timeline/i)).toBeInTheDocument()
  })
})
