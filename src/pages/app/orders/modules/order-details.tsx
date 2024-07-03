import 'dayjs/locale/pt-br'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTimes from 'dayjs/plugin/relativeTime'

import { getOrderDetails } from '@/api/get/get-order-details'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/utils/format-price'

import { OrderStatus } from './order-status'

dayjs.extend(relativeTimes)

interface OrderIdProps {
  orderId: string
  open: boolean
}

export const OrderDetails = ({ orderId, open }: OrderIdProps) => {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    staleTime: 1000 * 60, // 1 min
    enabled: open,
  })

  if (!order) return null

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Id pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <OrderStatus status={order.status} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.phone || 'Não informado'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.email}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">
                {dayjs(order.createdAt).locale('pt-br').fromNow()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.orderItems.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.priceInCents / 100)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice((item.priceInCents / 100) * item.quantity)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-medium">
                {formatPrice(order.totalInCents / 100)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
