import { Ban } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MonthCanceledOrdersAmount = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 max-sm:items-end">
        <CardTitle className="text-base font-semibold">
          Cancelados (mês)
        </CardTitle>
        <Ban className="h-4 w-4 text-muted-foreground max-md:hidden" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">32</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-2%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
