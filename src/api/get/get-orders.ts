import { api } from '@/lib/axios'
import { OrderStatusType } from '@/pages/app/orders/modules/order-status'

interface GetOrdersResponse {
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
}

export const getOrders = async ({ pageIndex }: GetOrderPageIndex) => {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
