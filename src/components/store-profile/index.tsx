import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
	type GetManagedRestaurantResponsePick,
	getManagedRestaurant,
} from '@/api/get/orders/get-managed-restaurant'
import { updateStoreProfile } from '@/api/put/update-store-profile'

import { Button } from '../ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const storeProfileSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export const StoreProfile = () => {
	const queryClient = useQueryClient()
	const { data: managedRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		// biome-ignore lint/style/useNumberNamespace: <explanation>
		staleTime: Infinity,
	})

	const { mutateAsync: updateStoreProfileFn } = useMutation({
		mutationFn: updateStoreProfile,
		// Este trecho de código define uma função onSuccess que é chamada após uma atualização bem-sucedida do perfil
		onSuccess(_, { name, description }) {
			// Obter os dados em cache do restaurante gerenciado
			const cached = queryClient.getQueryData<GetManagedRestaurantResponsePick>(
				['managed-restaurant'],
			)

			if (cached) {
				// Atualiza o nome e a descrição nos dados armazenados em cache
				queryClient.setQueryData<GetManagedRestaurantResponsePick>(
					['managed-restaurant'],
					{
						...cached,
						name,
						description,
					},
				)
			}
		},
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<StoreProfileSchema>({
		resolver: zodResolver(storeProfileSchema),
		values: {
			name: managedRestaurant?.name ?? '',
			description: managedRestaurant?.description ?? '',
		},
	})

	const handleUpdateStoreProfile = async (data: StoreProfileSchema) => {
		try {
			await updateStoreProfileFn(data)

			reset()

			toast.success('Perfil atualizado com sucesso!')
		} catch {
			toast.error('Falha ao atualizar o perfil!')
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da loja</DialogTitle>
				<DialogDescription>
					Atualiza as informações do seu estabelecimento
				</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleSubmit(handleUpdateStoreProfile)}>
				<div className='space-y-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Nome
						</Label>
						<Input className='col-span-3' id='name' {...register('name')} />
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='description' className='text-right'>
							Descrição
						</Label>
						<Textarea
							className='col-span-3'
							id='description'
							{...register('description')}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline'>
							Cancelar
						</Button>
					</DialogClose>
					<Button type='submit' variant='sucess' disabled={isSubmitting}>
						Salvar
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	)
}
