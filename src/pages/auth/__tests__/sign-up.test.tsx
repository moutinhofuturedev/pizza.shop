import { registerRestaurant } from '@/api/post/register-restaurant'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { SignUp } from '../sign-up'

// Criando uma instância do QueryClient
const queryClient = new QueryClient()

// Mockando a função registerRestaurant usando Vitest (vi)
vi.mock('@/api/post/register-restaurant', () => ({
	registerRestaurant: vi.fn(),
}))

// Função de renderização padrão, como no exemplo fornecido
const renderComponent = () =>
	render(<SignUp />, {
		wrapper: ({ children }) => (
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<MemoryRouter initialEntries={['/user/sign-up']}>
						{children}
					</MemoryRouter>
				</QueryClientProvider>
			</HelmetProvider>
		),
	})

describe('<SignUp />', () => {
	it('should render form fields correctly', () => {
		renderComponent()

		expect(screen.getByLabelText('Nome do restaurante')).toBeInTheDocument()
		expect(screen.getByLabelText('Nome do gerente')).toBeInTheDocument()
		expect(screen.getByLabelText('Seu e-mail')).toBeInTheDocument()
		expect(screen.getByLabelText('Seu telefone')).toBeInTheDocument()
	})

	it('should show error message when submitting form with invalid email', async () => {
		renderComponent()

		const emailInput = screen.getByLabelText('Seu e-mail')
		const submitButton = screen.getByRole('button', {
			name: /finalizar cadastro/i,
		})

		await userEvent.type(emailInput, 'invalid-email')
		await userEvent.click(submitButton)

		waitFor(() => {
			expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
		})
	})

	it('should call registerRestaurant when the form is successfully submitted', async () => {
		renderComponent()

		const restaurantNameInput = screen.getByLabelText('Nome do restaurante')
		const managerNameInput = screen.getByLabelText('Nome do gerente')
		const emailInput = screen.getByLabelText('Seu e-mail')
		const phoneInput = screen.getByLabelText('Seu telefone')
		const submitButton = screen.getByRole('button', {
			name: /finalizar cadastro/i,
		})

		await userEvent.type(restaurantNameInput, 'Restaurante Teste')
		await userEvent.type(managerNameInput, 'Gerente Teste')
		await userEvent.type(emailInput, 'teste@exemplo.com')
		await userEvent.type(phoneInput, '123456789')

		userEvent.click(submitButton)

		await waitFor(() => {
			expect(registerRestaurant).toHaveBeenCalledWith({
				restaurantName: 'Restaurante Teste',
				managerName: 'Gerente Teste',
				email: 'teste@exemplo.com',
				phone: '123456789',
			})
		})
	})

	it('should display success message when registration is successful', async () => {
		;(registerRestaurant as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			status: 200,
		})
		renderComponent()

		const restaurantNameInput = screen.getByLabelText('Nome do restaurante')
		const managerNameInput = screen.getByLabelText('Nome do gerente')
		const emailInput = screen.getByLabelText('Seu e-mail')
		const phoneInput = screen.getByLabelText('Seu telefone')
		const submitButton = screen.getByRole('button', {
			name: /finalizar cadastro/i,
		})

		await userEvent.type(restaurantNameInput, 'Restaurante Teste')
		await userEvent.type(managerNameInput, 'Gerente Teste')
		await userEvent.type(emailInput, 'teste@exemplo.com')
		await userEvent.type(phoneInput, '123456789')

		await userEvent.click(submitButton)

		waitFor(() => {
			expect(
				screen.getByText('Estabelecimento registrado com sucesso!'),
			).toBeInTheDocument()
		})
	})

	it('should display error message when registration fails', async () => {
		// Mockando a função para simular uma falha
		;(registerRestaurant as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error('Erro ao registrar'),
		)
		renderComponent()

		const restaurantNameInput = screen.getByLabelText('Nome do restaurante')
		const managerNameInput = screen.getByLabelText('Nome do gerente')
		const emailInput = screen.getByLabelText('Seu e-mail')
		const phoneInput = screen.getByLabelText('Seu telefone')
		const submitButton = screen.getByRole('button', {
			name: /finalizar cadastro/i,
		})

		await userEvent.type(restaurantNameInput, 'Restaurante Teste')
		await userEvent.type(managerNameInput, 'Gerente Teste')
		await userEvent.type(emailInput, 'teste@exemplo.com')
		await userEvent.type(phoneInput, '123456789')

		await userEvent.click(submitButton)

		// Verificando se a mensagem de erro é exibida
		waitFor(() => {
			expect(
				screen.getByText('Erro ao registrar o estabelecimento'),
			).toBeInTheDocument()
		})
	})
})
