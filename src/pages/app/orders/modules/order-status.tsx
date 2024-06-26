export enum OrderStatusType {
  Pending = 'pending',
  Canceled = 'canceled',
  Processing = 'processing',
  Delivering = 'delivering',
  Delivered = 'delivered',
}

interface OrderStatusProps {
  status: OrderStatusType
}

const OrderStatusMap: Record<OrderStatusType, string> = {
  [OrderStatusType.Pending]: 'Pendente',
  [OrderStatusType.Canceled]: 'Cancelado',
  [OrderStatusType.Processing]: 'Em preparo',
  [OrderStatusType.Delivering]: 'Em entrega',
  [OrderStatusType.Delivered]: 'Entregue',
}

const StatusColorMap: Record<OrderStatusType, string> = {
  [OrderStatusType.Pending]: 'bg-slate-400',
  [OrderStatusType.Canceled]: 'bg-rose-500',
  [OrderStatusType.Processing]: 'bg-amber-500',
  [OrderStatusType.Delivering]: 'bg-amber-500',
  [OrderStatusType.Delivered]: 'bg-emerald-500',
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${StatusColorMap[status]}`} />
      <span className="font-medium text-muted-foreground">
        {OrderStatusMap[status]}
      </span>
    </div>
  )
}
