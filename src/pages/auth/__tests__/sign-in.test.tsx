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

import { signIn } from '@/api/post/sign-in'
import { queryClient } from '@/lib/react-query'

import { toast } from 'sonner'
import { vi } from 'vitest'
import { SignIn } from '../sign-in'

// Mock the signIn API function and the toast functions
vi.mock('@/api/post/sign-in', () => ({
	signIn: vi.fn(),
}))

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}))

describe('<SignIn />', () => {
	beforeEach(() => {
		// Clear all mock history before each test
		vi.clearAllMocks()
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

	it('should call authenticate and show success toast on successful form submission', async () => {
		// Mock signIn API to resolve successfully
		;(signIn as ReturnType<typeof vi.fn>).mockResolvedValueOnce({})

		render(<SignIn />, {
			wrapper: ({ children }) => (
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						<MemoryRouter initialEntries={['/user/sign-in']}>
							{children}
						</MemoryRouter>
					</QueryClientProvider>
				</HelmetProvider>
			),
		})

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', { name: /acessar painel/i })

		await userEvent.type(emailInput, 'valid@example.com')
		await userEvent.click(submitButton)

		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith({ email: 'valid@example.com' })
		})

		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith(
				'Enviamos um link de autenticação para o seu email',
				expect.objectContaining({
					action: expect.any(Object),
				}),
			)
		})
	})

	it('should show error toast on failed form submission', async () => {
		// Mock signIn API to reject with an error
		;(signIn as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error('Failed to authenticate'),
		)

		render(<SignIn />, {
			wrapper: ({ children }) => (
				<HelmetProvider>
					<MemoryRouter initialEntries={['/auth/sign-in']}>
						<QueryClientProvider client={queryClient}>
							{children}
						</QueryClientProvider>
					</MemoryRouter>
				</HelmetProvider>
			),
		})

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', { name: /acessar painel/i })

		await userEvent.type(emailInput, 'valid@example.com')
		await userEvent.click(submitButton)

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				'Erro ao enviar o link de autenticação',
			)
		})
	})

	it('should reset form after successful submission', async () => {
		// Mock signIn API to resolve successfully
		;(signIn as ReturnType<typeof vi.fn>).mockResolvedValueOnce({})

		render(<SignIn />, {
			wrapper: ({ children }) => (
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						<MemoryRouter initialEntries={['/user/sign-in']}>
							{children}
						</MemoryRouter>
					</QueryClientProvider>
				</HelmetProvider>
			),
		})

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', { name: /acessar painel/i })

		await userEvent.type(emailInput, 'valid@example.com')
		await userEvent.click(submitButton)

		expect(emailInput).toHaveValue('')
	})
})
