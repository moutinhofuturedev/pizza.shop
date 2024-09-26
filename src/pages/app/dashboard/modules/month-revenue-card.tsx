import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get/dashboard/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/utils/format-price'

import { MetricsCardsSkeleton } from '../loading/metrics-cards-skeleton'

export const MonthRevenueCard = () => {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-receipt'],
		queryFn: getMonthRevenue,
		staleTime: 1000 * 60, // 1 min
	})

	return (
		<Card>
			<CardHeader className='flex-row items-center justify-between space-y-0 pb-2 max-md:items-end'>
				<CardTitle className='text-base font-semibold'>
					Receita total (mês)
				</CardTitle>
				<DollarSign className='h-4 w-4 text-muted-foreground max-md:hidden' />
			</CardHeader>
			<CardContent className='space-y-1'>
				{monthRevenue ? (
					<>
						<span className='text-2xl font-bold tracking-tight'>
							{formatPrice(monthRevenue.receipt / 100)}
						</span>
						<p className='text-sm text-muted-foreground'>
							{monthRevenue.diffFromLastMonth >= 0 ? (
								<>
									<span className='text-emerald-500 dark:text-emerald-400'>
										+{monthRevenue.diffFromLastMonth}%
									</span>{' '}
									em relação ao mês passado
								</>
							) : (
								<>
									<span className='text-rose-500 dark:text-rose-400'>
										{monthRevenue.diffFromLastMonth}%
									</span>{' '}
									em relação ao mês passado
								</>
							)}
						</p>
					</>
				) : (
					<MetricsCardsSkeleton />
				)}
			</CardContent>
		</Card>
	)
}
