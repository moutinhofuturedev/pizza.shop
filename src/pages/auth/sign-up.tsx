import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/post/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
	restaurantName: z.string(),
	managerName: z.string(),
	phone: z.string(),
	email: z.string().email({ message: 'E-mail inválido' }),
})

type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export const SignUp = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<SignUpFormSchema>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	})

	const { mutateAsync: registerRestaurantFn } = useMutation({
		mutationFn: registerRestaurant,
	})

	const handleSubmitForm = async (data: SignUpFormSchema) => {
		try {
			await registerRestaurantFn({
				restaurantName: data.restaurantName,
				managerName: data.managerName,
				email: data.email,
				phone: data.phone,
			})

			toast.success('Estabelecimento registrado com sucesso!', {
				action: {
					label: 'Fazer login',
					onClick: () => navigate(`/user/sign-in?email=${data.email}`),
				},
			})

			reset()
		} catch {
			toast.error('Erro ao registrar o estabelecimento')
		}
	}

	return (
		<div className='p-8'>
			<Helmet title='Cadastro' />
			<Button asChild variant='ghost' className='absolute right-4 top-4'>
				<Link to='/user/sign-in'>Fazer login</Link>
			</Button>
			<div className='flex w-[350px] flex-col justify-center gap-6'>
				<div className='flex flex-col gap-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Criar conta grátis
					</h1>
					<p className='text-sm text-muted-foreground'>
						Seja um parceiro e comece suas vendas!
					</p>
				</div>

				<form onSubmit={handleSubmit(handleSubmitForm)} className='space-y-4'>
					<div className='space-y-1'>
						<Label htmlFor='restaurantName'>Nome do restaurante</Label>
						<Input
							id='restaurantName'
							type='text'
							autoComplete='off'
							{...register('restaurantName')}
						/>
					</div>

					<div className='space-y-1'>
						<Label htmlFor='managerName'>Nome do gerente</Label>
						<Input
							id='managerName'
							type='text'
							autoComplete='off'
							{...register('managerName')}
						/>
					</div>

					<div className='space-y-1'>
						<Label htmlFor='email'>Seu e-mail</Label>
						<Input id='email' type='email' {...register('email')} />
					</div>

					<div className='space-y-1'>
						<Label htmlFor='phone'>Seu telefone</Label>
						<Input
							id='phone'
							type='tel'
							autoComplete='off'
							{...register('phone')}
						/>
					</div>

					<Button className='w-full' type='submit' disabled={isSubmitting}>
						Finalizar cadastro
					</Button>

					<p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
						Ao continuar, você concorda com nosso Termos de Serviço e políticas
						de privacidade
					</p>
				</form>
			</div>
		</div>
	)
}
