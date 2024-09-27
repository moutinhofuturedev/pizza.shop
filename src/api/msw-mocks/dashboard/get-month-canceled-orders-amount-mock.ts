import type { GetMonthCanceledOrdersAmountResponse } from '@/api/get/dashboard/get-month-canceled-orders-amount'
import { http, HttpResponse } from 'msw'

export const getMonthCanceledOrdersAmountMock = http.get<
	never,
	never,
	GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
	return HttpResponse.json({
		amount: 5,
		diffFromLastMonth: -5,
	})
})
