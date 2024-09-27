import type { GetDayOrdersAmountResponse } from '@/api/get/dashboard/get-day-orders-amount'
import { http, HttpResponse } from 'msw'

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
