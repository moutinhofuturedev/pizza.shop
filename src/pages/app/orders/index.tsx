import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getManagedRestaurant } from '@/api/get/get-managed-restaurant'
import { getOrders } from '@/api/get/get-orders'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilter } from './modules/order-table-filter'
import { OrderTableRow } from './modules/order-table-row'

export const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const handlePaginate = (pageIndex: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(pageIndex + 1))

      return prev
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { data: managedRestaurant, isLoading } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { data: orderResult } = useQuery({
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrders({ pageIndex }),
    staleTime: 1000 * 60, // 1 min
  })

  return (
    <>
      <Helmet
        title={`Pedidos | ${isLoading ? 'Carregando...' : managedRestaurant?.name}`}
      />
      <div className="flex flex-col gap-4">
        <h1 className="tracking-tight text-3xl font-bold">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilter />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[180px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderResult &&
                  orderResult.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </TableBody>
            </Table>
          </div>
          {orderResult && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={orderResult.meta.pageIndex}
              totalCount={orderResult.meta.totalCount}
              perPage={orderResult.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
