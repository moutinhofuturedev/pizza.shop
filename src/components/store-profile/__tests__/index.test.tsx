import { Dialog } from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { toast } from 'sonner'
import { describe, expect, it, vi } from 'vitest'

import { StoreProfile } from '../index'

// Mocking necessary dependencies
vi.mock('@tanstack/react-query', () => ({
	useQuery: vi.fn(),
	useMutation: vi.fn(),
	useQueryClient: vi.fn(),
}))

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}))

afterAll(() => {
	// Cleanup for any global initialization that is costly or should happen only once
	vi.restoreAllMocks()
})

describe('<StoreProfile />', () => {
	const mockUpdateStoreProfileFn = vi.fn()
	const mockQueryClient = {
		getQueryData: vi.fn(),
		setQueryData: vi.fn(),
	}

	beforeEach(() => {
		// Reset mock implementations before each test
		vi.clearAllMocks()

		// Mocking useQueryClient
		useQueryClient.mockReturnValue(mockQueryClient)

		// Mocking useQuery to return restaurant data
		useQuery.mockReturnValue({
			data: {
				name: 'Restaurante Exemplo',
				description: 'Descrição do Restaurante',
			},
		})

		// Mocking useMutation
		useMutation.mockReturnValue({
			mutateAsync: mockUpdateStoreProfileFn,
		})
	})

	it('renders form with initial values', () => {
		render(
			<HelmetProvider>
				<MemoryRouter>
					<Dialog open={true}>
						<StoreProfile />
					</Dialog>
				</MemoryRouter>
			</HelmetProvider>,
		)

		expect(screen.getByLabelText('Nome')).toHaveValue('Restaurante Exemplo')
		expect(screen.getByLabelText('Descrição')).toHaveValue(
			'Descrição do Restaurante',
		)
	})

	it.skip('validates the name field as required', async () => {
		render(
			<HelmetProvider>
				<MemoryRouter>
					<Dialog open={true}>
						<StoreProfile />
					</Dialog>
				</MemoryRouter>
			</HelmetProvider>,
		)

		const saveButton = screen.getByRole('button', { name: /salvar/i })
		await userEvent.click(saveButton)

		// Verifique a mensagem de erro usando um matcher mais flexível
		expect(
			await screen.findByText(/must contain at least 1 character/i),
		).toBeInTheDocument()
	})

	it('calls updateStoreProfileFn on form submit', async () => {
		render(
			<HelmetProvider>
				<MemoryRouter>
					<Dialog open={true}>
						<StoreProfile />
					</Dialog>
				</MemoryRouter>
			</HelmetProvider>,
		)

		await userEvent.type(
			screen.getByLabelText('Nome'),
			'Novo Nome do Restaurante',
		)
		await userEvent.type(
			screen.getByLabelText('Descrição'),
			'Nova descrição do restaurante',
		)
		await userEvent.click(screen.getByRole('button', { name: /salvar/i }))

		expect(mockUpdateStoreProfileFn).toHaveBeenCalledWith({
			name: 'Restaurante ExemploNovo Nome do Restaurante',
			description: 'Descrição do RestauranteNova descrição do restaurante',
		})
	})

	it('resets form and shows success message on successful update', async () => {
		mockUpdateStoreProfileFn.mockResolvedValueOnce({})
		render(
			<HelmetProvider>
				<MemoryRouter>
					<Dialog open={true}>
						<StoreProfile />
					</Dialog>
				</MemoryRouter>
			</HelmetProvider>,
		)

		await userEvent.click(screen.getByRole('button', { name: /salvar/i }))

		expect(mockUpdateStoreProfileFn).toHaveBeenCalled()
		expect(toast.success).toHaveBeenCalledWith('Perfil atualizado com sucesso!')
	})

	it('shows error message on update failure', async () => {
		mockUpdateStoreProfileFn.mockRejectedValueOnce(
			new Error('Erro ao atualizar'),
		)
		render(
			<HelmetProvider>
				<MemoryRouter>
					<Dialog open={true}>
						<StoreProfile />
					</Dialog>
				</MemoryRouter>
			</HelmetProvider>,
		)

		await userEvent.click(screen.getByRole('button', { name: /salvar/i }))

		expect(mockUpdateStoreProfileFn).toHaveBeenCalled()
		expect(toast.error).toHaveBeenCalledWith('Falha ao atualizar o perfil!')
	})
})
