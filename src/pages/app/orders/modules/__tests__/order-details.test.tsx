import { Dialog } from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { OrderDetails } from '../order-details'
import { OrderStatusType } from '../order-status'

describe('<OrderDetails />', () => {
	it('should render order details correctly', async () => {
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<MemoryRouter>
						<Dialog open={true}>
							<OrderDetails
								orderId='123'
								status={OrderStatusType.Delivered}
								open={true}
							/>
						</Dialog>
					</MemoryRouter>
				</HelmetProvider>
			</QueryClientProvider>,
		)

		await waitFor(() => {
			expect(container).toBeInTheDocument()
		})
	})
})
