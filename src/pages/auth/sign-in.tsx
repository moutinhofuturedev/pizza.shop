import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/post/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export const SignIn = () => {
	const [searchParams] = useSearchParams()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<SignInFormSchema>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	})

	const handleSubmitForm = async (data: SignInFormSchema) => {
		try {
			await authenticate({ email: data.email })

			toast.success('Enviamos um link de autenticação para o seu email', {
				action: {
					label: 'Reenviar',
					onClick: () => handleSubmitForm(data),
				},
			})

			reset()
		} catch {
			toast.error('Erro ao enviar o link de autenticação')
		}
	}

	return (
		<div className='p-8'>
			<Helmet title='Login' />
			<Button asChild variant='ghost' className='absolute right-4 top-4'>
				<Link to='/user/sign-up'>Novo estabelecimento</Link>
			</Button>
			<div className='flex w-[350px] flex-col justify-center gap-6'>
				<div className='flex flex-col gap-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Acesse o painel
					</h1>
					<p className='text-sm text-muted-foreground'>
						Acompanhe suas vendas pelo painel do parceiro
					</p>
				</div>

				<form
					data-testid='sign-in-form'
					onSubmit={handleSubmit(handleSubmitForm)}
					className='space-y-4'
				>
					<div className='space-y-2'>
						<Label htmlFor='email'>Seu e-mail</Label>
						<Input
							id='email'
							type='email'
							autoComplete='off'
							{...register('email')}
						/>
						{errors.email && (
							<p className='text-sm text-red-500'>{errors.email.message}</p>
						)}
					</div>

					<Button className='w-full' type='submit' disabled={isSubmitting}>
						Acessar Painel
					</Button>
				</form>
			</div>
		</div>
	)
}
