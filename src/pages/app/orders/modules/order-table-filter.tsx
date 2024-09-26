import { zodResolver } from '@hookform/resolvers/zod'
import { Ban, Search } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const orderFilterSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.string().optional(),
})

type OrderFilterType = z.infer<typeof orderFilterSchema>

export const OrderTableFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } = useForm<OrderFilterType>({
		resolver: zodResolver(orderFilterSchema),
		defaultValues: {
			orderId: orderId ?? '',
			customerName: customerName ?? '',
			status: status ?? 'all',
		},
	})

	const handleFilter = ({ orderId, customerName, status }: OrderFilterType) => {
		setSearchParams(state => {
			if (orderId) {
				state.set('orderId', orderId)
			} else {
				state.delete('orderId')
			}

			if (customerName) {
				state.set('customerName', customerName)
			} else {
				state.delete('customerName')
			}

			if (status) {
				state.set('status', status)
			} else {
				state.delete('status')
			}

			state.set('page', '1')

			return state
		})
	}

	const handleClearFilters = () => {
		setSearchParams(state => {
			state.delete('orderId')
			state.delete('customerName')
			state.delete('status')
			state.set('page', '1')

			reset()

			return state
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className='flex items-center gap-2'
		>
			<span className='text-sm font-semibold'>Filtros:</span>
			<Input
				className='h-8 w-auto'
				placeholder='Id do pedido'
				{...register('orderId')}
			/>
			<Input
				className='h-8 w-[320px]'
				placeholder='Nome do cliente'
				{...register('customerName')}
			/>

			<Controller
				name='status'
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue='all'
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className='h-8 w-[180px]'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Todos</SelectItem>
								<SelectItem value='pending'>Pendente</SelectItem>
								<SelectItem value='canceled'>Cancelado</SelectItem>
								<SelectItem value='processing'>Em preparo</SelectItem>
								<SelectItem value='delivering'>Em entrega</SelectItem>
								<SelectItem value='delivered'>Entregue</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>

			<Button type='submit' variant='secondary' size='xs'>
				<Search className='mr-2 h-4 w-4' />
				Filtrar pedidos
			</Button>

			<Button
				onClick={handleClearFilters}
				type='button'
				variant='outline'
				size='xs'
			>
				<Ban className='mr-2 h-4 w-4' />
				Remover filtros
			</Button>
		</form>
	)
}
