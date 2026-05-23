// __tests__/components/Calculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from '@/components/Calculator'
import { masseterArea } from '@/data/areas'

describe('Calculator', () => {
  it('renders concern selection buttons', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Jaw Slimming')).toBeInTheDocument()
    expect(screen.getByText('Teeth Grinding (Bruxism)')).toBeInTheDocument()
  })

  it('renders jaw muscle size cards', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('圆润')).toBeInTheDocument()
    expect(screen.getByText('适中')).toBeInTheDocument()
    expect(screen.getByText('方形突出')).toBeInTheDocument()
  })

  it('renders jaw size sub-labels', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Subtle')).toBeInTheDocument()
    expect(screen.getByText('Average')).toBeInTheDocument()
    expect(screen.getByText('Prominent')).toBeInTheDocument()
  })

  it('renders jaw muscle build toggle', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Typically female')).toBeInTheDocument()
    expect(screen.getByText('Typically male')).toBeInTheDocument()
  })

  it('renders country dropdown', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders first-time buttons', () => {
    render(<Calculator area={masseterArea} />)
    expect(screen.getByText('Yes, first time')).toBeInTheDocument()
    expect(screen.getByText('No, had it before')).toBeInTheDocument()
  })

  it('shows result after clicking Calculate', () => {
    render(<Calculator area={masseterArea} />)
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    expect(screen.getByText('Your Estimate')).toBeInTheDocument()
  })

  it('switches concern to bruxism and recalculates', () => {
    render(<Calculator area={masseterArea} />)
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const slimmingUnits = screen.getByText(/units per side/i)
      .closest('div')?.querySelector('dd')?.textContent

    fireEvent.click(screen.getByText('Teeth Grinding (Bruxism)'))
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const bruxismUnits = screen.getByText(/units per side/i)
      .closest('div')?.querySelector('dd')?.textContent

    expect(slimmingUnits).not.toBe(bruxismUnits)
  })
})
