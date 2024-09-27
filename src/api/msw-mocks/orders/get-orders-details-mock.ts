import type {
	GetOrderDetailsParams,
	GetOrderDetailsResponse,
} from '@/api/get/orders/get-order-details'
import { OrderStatusType } from '@/pages/app/orders/modules/order-status'
import { http, HttpResponse } from 'msw'

export const getOrdersDetailsMock = http.get<
	GetOrderDetailsParams,
	never,
	GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
	const { orderId } = params

	return HttpResponse.json({
		id: orderId,
		customer: {
			name: 'John Doe',
			email: 'Jr5wA@example.com',
			phone: '123456789',
		},
		createdAt: new Date().toISOString(),
		status: OrderStatusType.Delivered,
		totalInCents: 1000,
		orderItems: [
			{
				id: '1',
				priceInCents: 1000,
				quantity: 1,
				product: {
					name: 'Product 1',
				},
			},
			{
				id: '2',
				priceInCents: 2000,
				quantity: 2,
				product: {
					name: 'Product 2',
				},
			},
		],
	})
})
