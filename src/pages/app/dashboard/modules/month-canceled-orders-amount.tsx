import { useQuery } from '@tanstack/react-query'
import { Ban } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get/dashboard/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MonthCanceledOrdersAmount = () => {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
    staleTime: 1000 * 60, // 1 min
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 max-sm:items-end">
        <CardTitle className="text-base font-semibold">
          Cancelados (mês)
        </CardTitle>
        <Ban className="h-4 w-4 text-muted-foreground max-md:hidden" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
