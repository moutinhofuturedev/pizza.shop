import { render, screen } from '@testing-library/react'

import { OrderStatus, OrderStatusType } from '../order-status'

describe('<OrderStatus />', () => {
	it('should render display order status correctly with props', () => {
		render(<OrderStatus status={OrderStatusType.Delivered} />)

		const statusText = screen.getByText('Entregue')

		expect(statusText).toBeInTheDocument()
	})

	it('should render display order status correctly with class badge color', () => {
		render(<OrderStatus status={OrderStatusType.Canceled} />)

		const statusText = screen.getByText('Cancelado')
		const orderStatus = screen.getByTestId('order-status')

		expect(statusText).toBeInTheDocument()
		expect(orderStatus).toHaveClass('bg-red-500')
	})

	it('should render display order status correctly', () => {
		const { container } = render(
			<OrderStatus status={OrderStatusType.Pending} />,
		)

		expect(container).toMatchSnapshot()
	})
})
