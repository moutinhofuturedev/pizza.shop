import { api } from '@/lib/axios'
import type { OrderStatusType } from '@/pages/app/orders/modules/order-status'

export interface GetOrdersResponse {
	orders: {
		orderId: string
		createdAt: string
		status: OrderStatusType
		customerName: string
		total: number
	}[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

interface GetOrderPageIndex {
	pageIndex: number | null
	orderId: string | null
	customerName: string | null
	status: string | null
}

export const getOrders = async ({
	pageIndex,
	orderId,
	customerName,
	status,
}: GetOrderPageIndex) => {
	const response = await api.get<GetOrdersResponse>('/orders', {
		params: {
			pageIndex,
			orderId,
			customerName,
			status,
		},
	})

	return response.data
}
