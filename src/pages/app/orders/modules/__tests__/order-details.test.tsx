import { Dialog } from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { OrderDetails } from '../order-details'
import { OrderStatusType } from '../order-status'

const mockOrder = {
	customer: {
		name: 'John Doe',
		phone: '123456789',
		email: 'john@example.com',
	},
	createdAt: new Date(),
	orderItems: [
		{
			id: 1,
			product: { name: 'Product 1' },
			quantity: 2,
			priceInCents: 1000,
		},
	],
	totalInCents: 2000,
}

const orderDetailsMock = {
	...mockOrder,
	status: OrderStatusType.Delivered,
	orderId: '123',
	open: true,
}

describe('<OrderDetails />', () => {
	it('should render order details correctly', async () => {
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<MemoryRouter>
						<Dialog open={true}>
							<OrderDetails {...orderDetailsMock} />
						</Dialog>
					</MemoryRouter>
				</HelmetProvider>
			</QueryClientProvider>,
		)

		expect(container).toBeInTheDocument()
	})
})
