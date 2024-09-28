import {
	approveOrder,
	cancelOrder,
	deliverOrder,
	dispatchOrder,
} from '@/api/patch/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { toast } from 'sonner'
import { describe, expect, it, vi } from 'vitest'
import { OrderStatusType } from '../order-status'
import { OrderTableRow } from '../order-table-row'

vi.mock('@/api/patch/approve-order', () => ({
	approveOrder: vi.fn(),
}))

vi.mock('@/api/patch/cancel-order', () => ({
	cancelOrder: vi.fn(),
}))

vi.mock('@/api/patch/dispatch-order', () => ({
	dispatchOrder: vi.fn(),
}))

vi.mock('@/api/patch/deliver-order', () => ({
	deliverOrder: vi.fn(),
}))

vi.mock('navigator.clipboard', () => ({
	writeText: vi.fn(),
}))

vi.mock('toast', () => ({
	success: vi.fn(),
}))

const queryClient = new QueryClient()

const renderComponent = (order: {
	orderId: string
	createdAt: string
	status: OrderStatusType
	customerName: string
	total: number
}) =>
	render(<OrderTableRow order={order} />, {
		wrapper: ({ children }) => (
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<MemoryRouter initialEntries={['/user/sign-up']}>
						{children}
					</MemoryRouter>
				</QueryClientProvider>
			</HelmetProvider>
		),
	})

describe('<OrderTableRow />', () => {
	const order = {
		orderId: '12345',
		createdAt: new Date().toISOString(),
		status: OrderStatusType.Pending,
		customerName: 'John Doe',
		total: 5000,
	}

	it('should render order details', () => {
		renderComponent(order)

		expect(screen.getByText('12345')).toBeInTheDocument()
		expect(screen.getByText('há poucos segundos')).toBeInTheDocument()
		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('R$ 50,00')).toBeInTheDocument()
		expect(screen.getByText('Pendente')).toBeInTheDocument()
	})

	it('should call approveOrder when Approve button is clicked', async () => {
		renderComponent(order)

		const approveButton = screen.getByText(/aprovar/i)
		fireEvent.click(approveButton)

		await waitFor(() => {
			expect(approveOrder).toHaveBeenCalledWith({ orderId: '12345' })
		})
	})

	it('should call dispatchOrder when Dispatch button is clicked', async () => {
		renderComponent({ ...order, status: OrderStatusType.Processing })

		const dispatchButton = screen.getByText(/em entrega/i)
		fireEvent.click(dispatchButton)

		await waitFor(() => {
			expect(dispatchOrder).toHaveBeenCalledWith({ orderId: '12345' })
		})
	})

	it('should call deliverOrder when Deliver button is clicked', async () => {
		renderComponent({ ...order, status: OrderStatusType.Delivering })

		const deliverButton = screen.getByText(/entregue/i)
		fireEvent.click(deliverButton)

		await waitFor(() => {
			expect(deliverOrder).toHaveBeenCalledWith({ orderId: '12345' })
		})
	})

	it('should call cancelOrder when Cancel button is clicked', async () => {
		renderComponent(order)

		const cancelButton = screen.getByText(/cancelar/i)
		fireEvent.click(cancelButton)

		await waitFor(() => {
			expect(cancelOrder).toHaveBeenCalledWith({ orderId: '12345' })
		})
	})

	it('displays a success toast message', async () => {
		renderComponent(order)

		const copyButton = screen.getByText('12345')
		fireEvent.click(copyButton)

		waitFor(() => {
			expect(toast.success).toHaveBeenCalledTimes(1)
			expect(toast.success).toHaveBeenCalledWith(
				'Id copiado para a área de transferência',
			)
		})
	})
})
