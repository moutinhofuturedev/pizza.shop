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

import { SignIn } from '../sign-in'

const handleSubmitForm = vi.fn()

describe('<SignIn />', () => {
	beforeEach(() => {
		handleSubmitForm.mockClear()
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
})
