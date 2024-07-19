import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get/dashboard/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricsCardsSkeleton } from '../components/skeletons/metrics-cards-skeleton'

export const DayOrdersAmountCard = () => {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
    staleTime: 1000 * 60, // 1 min
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 max-md:items-end">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground max-md:hidden" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>{' '}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>{' '}
                  em relação a ontem
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
