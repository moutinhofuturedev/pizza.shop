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
  [OrderStatusType.Pending]: 'bg-blue-500',
  [OrderStatusType.Canceled]: 'bg-red-500',
  [OrderStatusType.Processing]: 'bg-yellow-500',
  [OrderStatusType.Delivering]: 'bg-orange-500',
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
