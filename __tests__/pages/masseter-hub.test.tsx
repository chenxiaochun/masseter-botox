// __tests__/pages/masseter-hub.test.tsx
import { render, screen } from '@testing-library/react'
import MasseterPage from '@/app/masseter/page'

describe('Masseter Hub Page - Learn More section', () => {
  it('renders Learn More heading', () => {
    render(<MasseterPage />)
    expect(screen.getByText('Learn More About Masseter Botox')).toBeInTheDocument()
  })

  it('renders link to cost guide', () => {
    render(<MasseterPage />)
    expect(screen.getByRole('link', { name: /cost guide/i })).toHaveAttribute(
      'href',
      '/masseter/cost'
    )
  })

  it('renders link to units guide', () => {
    render(<MasseterPage />)
    expect(screen.getByRole('link', { name: /units & dosage/i })).toHaveAttribute(
      'href',
      '/masseter/units'
    )
  })

  it('renders all 6 guide links', () => {
    render(<MasseterPage />)
    const hrefs = screen.getAllByRole('link').map((l) => l.getAttribute('href'))
    ;[
      '/masseter/guide',
      '/masseter/cost',
      '/masseter/units',
      '/masseter/before-after',
      '/masseter/recovery',
      '/masseter/bruxism',
    ].forEach((href) => expect(hrefs).toContain(href))
  })
})
