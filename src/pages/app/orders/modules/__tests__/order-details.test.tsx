import { Dialog } from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import {} from '@testing-library/react'
import { render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { OrderDetails } from '../order-details'
import { OrderStatusType } from '../order-status'

import { getOrderDetails } from '@/api/get/orders/get-order-details'

vi.mock('@/api/get/orders/get-order-details', () => ({
	getOrderDetails: vi.fn(),
}))

describe('<OrderDetails />', () => {
	beforeEach(() => {
		queryClient.clear() // Limpa o cache das queries antes de cada teste
	})

	it('should render order details when data is loaded', async () => {
		;(getOrderDetails as ReturnType<typeof vi.fn>).mockResolvedValue({
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
					quantity: 1,
					priceInCents: 1000,
				},
			],
			totalInCents: 2000,
		})

		render(
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
			expect(screen.getByText('Cliente')).toBeInTheDocument()
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Telefone')).toBeInTheDocument()
			expect(screen.getByText('123456789')).toBeInTheDocument()
			expect(screen.getByText('Email')).toBeInTheDocument()
			expect(screen.getByText('john@example.com')).toBeInTheDocument()
			expect(screen.getByText('Produto')).toBeInTheDocument()
			expect(screen.getByText('Product 1')).toBeInTheDocument()
			expect(screen.getByText('Total do pedido')).toBeInTheDocument()
			expect(screen.getByText('R$ 20,00')).toBeInTheDocument()
		})
	})

	it('should render "Não informado" if phone or email is missing', async () => {
		;(getOrderDetails as ReturnType<typeof vi.fn>).mockResolvedValue({
			customer: {
				name: 'John Doe',
				phone: null,
				email: null,
			},
			createdAt: new Date(),
			orderItems: [],
			totalInCents: 0,
		})

		render(
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

		waitFor(() => {
			expect(screen.getByText('Não informado')).toBeInTheDocument()
		})
	})
})
