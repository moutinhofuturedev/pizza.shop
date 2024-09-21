import type { GetMonthOrdersAmountResponse } from '@/api/get/dashboard/get-month-orders-amount'
import { http, HttpResponse } from 'msw'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({
    amount: 2000,
    diffFromLastMonth: 9,
  })
})
