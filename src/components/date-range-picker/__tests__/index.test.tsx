import { fireEvent, render, screen } from '@testing-library/react'
import { DatePickerWithRange } from '../index'

describe('DatePickerWithRange', () => {
  it('renders with no date', () => {
    const onDateChange = vi.fn()
    const date = { from: undefined, to: undefined }

    render(<DatePickerWithRange date={date} onDateChange={onDateChange} />)

    const calendar = screen.getByText('Selecione uma data')

    expect(calendar).toBeInTheDocument()
  })

  it('renders with a date range selected', () => {
    const onDateChange = vi.fn()
    const date = {
      from: new Date('2024-09-20T00:00:00.000Z'),
      to: new Date('2024-09-27T00:00:00.000Z'),
    }

    const { container } = render(
      <DatePickerWithRange date={date} onDateChange={onDateChange} />
    )

    const calendar = screen.getByText('Sep 19, 2024 - Sep 26, 2024')
    fireEvent.click(calendar)

    expect(calendar).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
