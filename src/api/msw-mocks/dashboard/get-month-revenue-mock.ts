import { http, HttpResponse } from 'msw'
import type { GetMonthRevenueResponse } from '../../get/dashboard/get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-receipt', () => {
  return HttpResponse.json({
    receipt: 4000000,
    diffFromLastMonth: 10,
  })
})
