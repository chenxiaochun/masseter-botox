import { render, screen } from '@testing-library/react'
import GuidesLayout from '@/app/masseter/(guides)/layout'

describe('GuidesLayout', () => {
  it('renders breadcrumb with BotoxCalc link', () => {
    render(<GuidesLayout><div>content</div></GuidesLayout>)
    expect(screen.getByRole('link', { name: /botoxcalc/i })).toHaveAttribute('href', '/')
  })

  it('renders Masseter Botox breadcrumb segment', () => {
    render(<GuidesLayout><div>content</div></GuidesLayout>)
    expect(screen.getByText('Masseter Botox')).toBeInTheDocument()
  })

  it('renders CTA link to calculator', () => {
    render(<GuidesLayout><div>content</div></GuidesLayout>)
    expect(screen.getByRole('link', { name: /use the free calculator/i }))
      .toHaveAttribute('href', '/masseter')
  })

  it('renders children content', () => {
    render(<GuidesLayout><div>test-child</div></GuidesLayout>)
    expect(screen.getByText('test-child')).toBeInTheDocument()
  })
})
