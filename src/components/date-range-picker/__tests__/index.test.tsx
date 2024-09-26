import { fireEvent, render, screen } from '@testing-library/react'
import { DatePickerWithRange } from '../index'

const onDateChange = vi.fn()

describe('DatePickerWithRange', () => {
	beforeEach(() => {
		onDateChange.mockClear()
	})

	it('renders with no date', () => {
		const date = { from: undefined, to: undefined }
		const className = 'test-class'

		render(
			<DatePickerWithRange
				date={date}
				onDateChange={onDateChange}
				className={className}
			/>,
		)

		const calendar = screen.getByText('Selecione uma data')

		expect(calendar).toBeInTheDocument()
	})

	it.skip('renders with a date range selected', () => {
		const date = {
			from: new Date('2024-09-20T00:00:00.000Z'),
			to: new Date('2024-09-27T00:00:00.000Z'),
		}
		const className = 'test-class'

		render(
			<DatePickerWithRange
				date={date}
				onDateChange={onDateChange}
				className={className}
			/>,
		)

		const calendar = screen.getByText('Sep 20, 2024 - Sep 27, 2024')
		fireEvent.click(calendar)

		expect(calendar).toBeInTheDocument()
	})

	it.skip('renders with only from date selected', () => {
		const date = {
			from: new Date('2024-09-20T00:00:00.000Z'),
			to: undefined,
		}
		const className = 'test-class'

		render(
			<DatePickerWithRange
				date={date}
				onDateChange={onDateChange}
				className={className}
			/>,
		)

		const calendar = screen.getByText('Sep 20, 2024')
		fireEvent.click(calendar)

		expect(calendar).toBeInTheDocument()
	})

	it('renders with no date and applies text-muted-foreground class', () => {
		const className = 'test-class'

		render(
			<DatePickerWithRange
				date={undefined}
				onDateChange={onDateChange}
				className={className}
			/>,
		)

		const calendar = screen.getByText('Selecione uma data')
		const button = screen.getByRole('button', { name: /selecione uma data/i })

		expect(calendar).toBeInTheDocument()
		expect(button).toHaveClass('text-muted-foreground')
	})
})
