import { api } from '@/lib/axios'

interface GetMonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthOrdersAmount = async () => {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  )

  return response.data
}
