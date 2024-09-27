import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodResponse = {
	date: string
	receipt: number
}[]

interface DateRangeProps {
	from?: Date
	to?: Date
}

export const getDailyRevenueInPeriod = async ({ from, to }: DateRangeProps) => {
	const response = await api.get<GetDailyRevenueInPeriodResponse>(
		'/metrics/daily-receipt-in-period',
		{
			params: {
				from,
				to,
			},
		},
	)

	return response.data
}
