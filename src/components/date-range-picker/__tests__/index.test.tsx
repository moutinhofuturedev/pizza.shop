import { render, screen } from '@testing-library/react'
import { DatePickerWithRange } from '../index'

describe('DatePickerWithRange', () => {
  it('renders with no date', () => {
    const onDateChange = vi.fn()
    const date = { from: undefined, to: undefined }

    render(<DatePickerWithRange date={date} onDateChange={onDateChange} />)

    const calendar = screen.getByText('Selecione uma data')

    expect(calendar).toBeInTheDocument()
  })

  // it('renders with a date range selected', () => {
  //   const onDateChange = vi.fn()
  //   const date = { from: new Date('2022-01-01'), to: new Date('2022-01-31') }

  //   const { container } = render(
  //     <DatePickerWithRange date={date} onDateChange={onDateChange} />
  //   )

  //   const calendar = screen.getByText('Dec 31, 2021 - Jan 30, 2022')
  //   fireEvent.click(calendar)

  //   expect(calendar).toBeInTheDocument()
  //   expect(container).toMatchSnapshot()
  // })
})
