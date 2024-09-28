import 'dayjs/locale/pt-br'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTimes from 'dayjs/plugin/relativeTime'
import { ArrowRight, Ban, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { getOrderDetails } from '@/api/get/orders/get-order-details'
import type { GetOrdersResponse } from '@/api/get/orders/get-orders'
import { approveOrder } from '@/api/patch/approve-order'
import { cancelOrder } from '@/api/patch/cancel-order'
import { deliverOrder } from '@/api/patch/deliver-order'
import { dispatchOrder } from '@/api/patch/dispatch-order'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/utils/format-price'

import { OrderDetails } from './order-details'
import { OrderStatus, OrderStatusType } from './order-status'

dayjs.extend(relativeTimes)

export interface OrderTableRowProps {
	order: {
		orderId: string
		createdAt: string
		status: OrderStatusType
		customerName: string
		total: number
	}
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const queryClient = useQueryClient()

	const { data: quantitiesOfItems, isLoading } = useQuery({
		queryKey: ['order', order.orderId],
		queryFn: () => getOrderDetails({ orderId: order.orderId }),
		staleTime: 1000 * 60, // 1 min
	})

	const updateOrderStatusOnCache = (
		orderId: string,
		status: OrderStatusType,
	) => {
		const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ['orders'],
		})

		// biome-ignore lint/complexity/noForEach: <explanation>
		ordersListCache.forEach(([cacheKey, cacheData]) => {
			if (!cacheData) {
				return
			}

			queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map(order => {
					if (order.orderId === orderId) {
						return {
							...order,
							status,
						}
					}

					return order
				}),
			})
		})
	}

	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, OrderStatusType.Canceled)
			},
		})

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
		useMutation({
			mutationFn: approveOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, OrderStatusType.Processing)
			},
		})

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, OrderStatusType.Delivering)
			},
		})

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, OrderStatusType.Delivered)
			},
		})

	const handleCopyClick = (isCopied: boolean) => {
		navigator.clipboard.writeText(order.orderId).then(() => {
			setCopied(isCopied)

			toast.success('Id copiado para a área de transferência')
		})
	}

	const quantityOfItensForOrder = useMemo(() => {
		if (!quantitiesOfItems) {
			return 0
		}
		return quantitiesOfItems.orderItems.reduce(
			(acc, item) => acc + item.quantity,
			0,
		)
	}, [quantitiesOfItems])

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant='outline' size='xs'>
							<Search className='h-3 w-3' />
							<span className='sr-only'>Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails
						open={isDetailsOpen}
						orderId={order.orderId}
						status={order.status}
					/>
				</Dialog>
			</TableCell>

			<TableCell className='font-mono text-xs font-medium'>
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button
							variant='link'
							type='button'
							className='text-muted-foreground'
						>
							{order.orderId}
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className='w-80'>
						<div className='space-x-4'>
							<div className='space-y-1'>
								<h4 className='text-sm font-semibold'>Copie o id do pedido:</h4>
								<Button
									onClick={() => handleCopyClick(copied)}
									type='button'
									variant='ghost'
								>
									<p className='text-sm text-muted-foreground'>
										{order.orderId}
									</p>
								</Button>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</TableCell>

			<TableCell className='text-muted-foreground'>
				{dayjs(order.createdAt).locale('pt-br').fromNow()}
			</TableCell>

			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>

			<TableCell className='font-medium'>{order.customerName}</TableCell>

			<TableCell className='flex flex-col font-medium'>
				{formatPrice(order.total / 100)}
				{isLoading ? (
					<Skeleton className='mt-2 h-3 w-12' />
				) : (
					<span className='mt-2 text-xs text-muted-foreground'>
						{quantityOfItensForOrder} item(s)
					</span>
				)}
			</TableCell>

			<TableCell>
				{order.status === OrderStatusType.Pending && (
					<Button
						variant='outline'
						size='xs'
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						disabled={isApprovingOrder}
					>
						<ArrowRight className='mr-2 h-3 w-3' />
						Aprovar
					</Button>
				)}

				{order.status === OrderStatusType.Processing && (
					<Button
						variant='outline'
						size='xs'
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						disabled={isDispatchingOrder}
					>
						<ArrowRight className='mr-2 h-3 w-3' />
						Em entrega
					</Button>
				)}

				{order.status === OrderStatusType.Delivering && (
					<Button
						variant='outline'
						size='xs'
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						disabled={isDeliveringOrder}
					>
						<ArrowRight className='mr-2 h-3 w-3' />
						Entregue
					</Button>
				)}
			</TableCell>

			<TableCell>
				<Button
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
					disabled={
						!['pending', 'processing'].includes(order.status) ||
						isCancelingOrder
					}
					variant='ghost'
					size='xs'
				>
					<Ban className='mr-2 h-3 w-3' />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
