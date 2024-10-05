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

	it('calls updateStoreProfileFn on form submit', async () => {
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

		const nameInput = screen.getByLabelText(/nome/i)
		const descriptionInput = screen.getByLabelText(/descrição/i)

		await userEvent.clear(nameInput)
		await userEvent.type(nameInput, 'Novo Nome do Restaurante')

		await userEvent.clear(descriptionInput)
		await userEvent.type(descriptionInput, 'Nova descrição do restaurante')

		await userEvent.click(screen.getByRole('button', { name: /salvar/i }))

		expect(mockUpdateStoreProfileFn).toHaveBeenCalledWith({
			name: 'Novo Nome do Restaurante',
			description: 'Nova descrição do restaurante',
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
