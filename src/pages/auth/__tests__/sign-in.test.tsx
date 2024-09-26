//mock das variáveis de ambiente
// vi.mock('@/env', () => ({
//   env: {
//     VITE_BASE_URL: 'http://localhost:3000',
//     VITE_ENABLE_DELAY_API: 'false',
//   },
// }))

import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { toast } from 'sonner'
import { SignIn } from '../sign-in'

const handleSubmitForm = vi.fn()
const authenticateMock = vi.fn()

describe('<SignIn />', () => {
	beforeEach(() => {
		handleSubmitForm.mockClear()
		authenticateMock.mockClear()
	})

	it('should set default email input value if email is present on search params', () => {
		render(<SignIn />, {
			wrapper: ({ children }) => {
				return (
					<HelmetProvider>
						<MemoryRouter
							initialEntries={['/auth/sign-in?email=Jr5wA@example.com']}
						>
							<QueryClientProvider client={queryClient}>
								{children}
							</QueryClientProvider>
						</MemoryRouter>
					</HelmetProvider>
				)
			},
		})

		const emailInput = screen.getByLabelText('Seu e-mail')

		expect(emailInput).toHaveValue('Jr5wA@example.com')
	})

	it('should show error message when submitting form with invalid email format', async () => {
		render(<SignIn />, {
			wrapper: ({ children }) => {
				return (
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<MemoryRouter
								initialEntries={['/user/sign-in?email=Jr5wA@example.com']}
							>
								{children}
							</MemoryRouter>
						</QueryClientProvider>
					</HelmetProvider>
				)
			},
		})

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', {
			name: /acessar painel/i,
		})

		await userEvent.type(emailInput, 'invalid-email')
		await userEvent.click(submitButton)
		const errorMessage = await screen.findByText(/e-mail inválido/i)

		expect(errorMessage).toBeInTheDocument()
	})

	it('deve enviar o formulário e mostrar um toast de sucesso', async () => {
		handleSubmitForm.mockImplementation(() => Promise.resolve())

		render(<SignIn />, {
			wrapper: ({ children }) => {
				return (
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<MemoryRouter initialEntries={['/user/sign-in']}>
								{children}
							</MemoryRouter>
						</QueryClientProvider>
					</HelmetProvider>
				)
			},
		})

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', {
			name: /acessar painel/i,
		})

		await userEvent.type(emailInput, 'Jr5wA@example.com')
		await userEvent.click(submitButton)

		waitFor(() => {
			expect(handleSubmitForm).toHaveBeenCalled()
			expect(toast.success).toHaveBeenCalledWith(
				'Enviamos um link de autenticação para o seu email',
			)
			expect(emailInput).toHaveValue('')
		})
	})

	it('deve mostrar um toast de erro se a autenticação falhar', async () => {
		authenticateMock.mockRejectedValueOnce(
			new Error('Erro ao enviar o link de autenticação'),
		)

		render(<SignIn />, {
			wrapper: ({ children }) => (
				<HelmetProvider>
					<MemoryRouter
						initialEntries={['/auth/sign-in?email=test@example.com']}
					>
						<QueryClientProvider client={queryClient}>
							{children}
						</QueryClientProvider>
					</MemoryRouter>
				</HelmetProvider>
			),
		})

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', { name: /acessar painel/i })

		await userEvent.type(emailInput, 'test@example.com')
		await userEvent.click(submitButton)

		waitFor(() => {
			expect(authenticateMock).toHaveBeenCalledWith({
				email: 'test@example.com',
			})
			expect(toast.error).toHaveBeenCalledWith(
				'Erro ao enviar o link de autenticação',
			)
		})
	})

	it('should render the "Novo estabelecimento" link', () => {
		render(<SignIn />, {
			wrapper: ({ children }) => {
				return (
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<MemoryRouter initialEntries={['/user/sign-in']}>
								{children}
							</MemoryRouter>
						</QueryClientProvider>
					</HelmetProvider>
				)
			},
		})

		const link = screen.getByRole('link', {
			name: /novo estabelecimento/i,
		})

		expect(link).toBeInTheDocument()
		waitFor(() => {
			expect(window.location.pathname).toBe('/user/sign-up')
		})
	})
})
