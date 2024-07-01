/* eslint-disable camelcase */
import 'dayjs/locale/pt-br'

import { fakerPT_BR } from '@faker-js/faker'
import dayjs from 'dayjs'
import relativeTimes from 'dayjs/plugin/relativeTime'
import { ArrowRight, Ban, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { OrderStatus, OrderStatusType } from './order-status'

dayjs.extend(relativeTimes)

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: OrderStatusType
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const tableInfo = {
    phone: fakerPT_BR.phone.number(),
    email: fakerPT_BR.internet.email({ allowSpecialCharacters: false }),
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails
            orderId={order.orderId}
            clientName={order.customerName}
            phone={tableInfo.phone}
            email={tableInfo.email}
            orderTime={dayjs(order.createdAt).locale('pt-br').fromNow()}
            status={order.status}
          />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {dayjs(order.createdAt).locale('pt-br').fromNow()}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {order.total.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant="ghost" size="xs">
          <Ban className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
