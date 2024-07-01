import { api } from '@/lib/axios'
import { OrderStatusType } from '@/pages/app/orders/modules/order-status'

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

export const getOrders = async () => {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 1,
    },
  })

  return response.data
}
