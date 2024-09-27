import type { GetMonthRevenueResponse } from '@/api/get/dashboard/get-month-revenue'
import { http, HttpResponse } from 'msw'

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
