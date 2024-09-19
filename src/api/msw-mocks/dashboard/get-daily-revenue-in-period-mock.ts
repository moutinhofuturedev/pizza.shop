import { http, HttpResponse } from 'msw'
import type { GetDailyRevenueInPeriodResponse } from '../../get/dashboard/get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/01/2024', receipt: 10000 },
    { date: '02/02/2024', receipt: 8500 },
    { date: '03/03/2024', receipt: 12000 },
    { date: '04/04/2024', receipt: 9300 },
    { date: '05/05/2024', receipt: 11500 },
    { date: '06/06/2024', receipt: 10750 },
    { date: '07/07/2024', receipt: 9800 },
  ])
})
