/* eslint-disable camelcase */
import 'dayjs/locale/pt-br'

import { faker, fakerPT_BR } from '@faker-js/faker'
import dayjs from 'dayjs'
import relativeTimes from 'dayjs/plugin/relativeTime'
import { ArrowRight, Ban, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

dayjs.extend(relativeTimes)
dayjs.locale('pt-br')

export const OrderTableRow = () => {
  const tableInfo = {
    randomOrderId: faker.string.alphanumeric(20),
    orderTime: dayjs().to(fakerPT_BR.date.recent({ days: 1 })),
    clientName: fakerPT_BR.person.fullName(),
    totalOrder: fakerPT_BR.commerce.price({
      min: 100,
      max: 280,
      symbol: 'R$',
      dec: 2,
    }),
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
            orderId={tableInfo.randomOrderId}
            clientName={tableInfo.clientName}
            phone={tableInfo.phone}
            email={tableInfo.email}
            orderTime={tableInfo.orderTime}
          />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {tableInfo.randomOrderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {tableInfo.orderTime}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">{tableInfo.clientName}</TableCell>

      <TableCell className="font-medium">{tableInfo.totalOrder}</TableCell>

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
