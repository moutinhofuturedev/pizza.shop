import { http, HttpResponse } from 'msw'
import type { GetDayOrdersAmountResponse } from '../../get/dashboard/get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json({
    amount: 90,
    diffFromYesterday: -5,
  })
})
