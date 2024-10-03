import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useSearchParams } from 'react-router-dom'
import { vi } from 'vitest'
import { OrderTableFilter } from '../order-table-filter'

// Mock para useSearchParams
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom')
	return {
		...actual,
		useSearchParams: vi.fn(),
	}
})

describe('<OrderTableFilter />', () => {
	const mockSetSearchParams = vi.fn()

	beforeEach(() => {
		// Usar typeof vi.fn() para tipar corretamente a função mockada.
		;(useSearchParams as unknown as typeof vi.fn).mockReturnValue([
			new URLSearchParams(),
			mockSetSearchParams,
		])
		mockSetSearchParams.mockClear() // Limpa o mock antes de cada teste
	})

	it('should render filter form correctly', () => {
		render(
			<MemoryRouter>
				<OrderTableFilter />
			</MemoryRouter>,
		)

		// Verifica se os elementos do filtro são renderizados
		expect(screen.getByPlaceholderText('Id do pedido')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Nome do cliente')).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /Filtrar pedidos/i }),
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /Remover filtros/i }),
		).toBeInTheDocument()
	})

	it('should call setSearchParams with correct values when filters are applied', async () => {
		render(
			<MemoryRouter>
				<OrderTableFilter />
			</MemoryRouter>,
		)

		// Simula a entrada dos filtros
		fireEvent.change(screen.getByPlaceholderText('Id do pedido'), {
			target: { value: '123' },
		})
		fireEvent.change(screen.getByPlaceholderText('Nome do cliente'), {
			target: { value: 'John Doe' },
		})
		fireEvent.click(screen.getByRole('button', { name: /Filtrar pedidos/i }))

		await waitFor(() => {
			expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function))
		})

		// Verifica se os valores foram aplicados corretamente
		const params = new URLSearchParams()
		mockSetSearchParams.mock.calls[0][0](params) // Executa a função de atualização dos parâmetros

		expect(params.get('orderId')).toBe('123')
		expect(params.get('customerName')).toBe('John Doe')
		expect(params.get('status')).toBe('all')
	})

	it('should clear filters when "Remover filtros" button is clicked', async () => {
		render(
			<MemoryRouter>
				<OrderTableFilter />
			</MemoryRouter>,
		)

		// Simula o clique no botão de limpar filtros
		fireEvent.click(screen.getByRole('button', { name: /Remover filtros/i }))

		await waitFor(() => {
			expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function))
		})

		// Verifica se os valores foram removidos corretamente
		const params = new URLSearchParams()
		mockSetSearchParams.mock.calls[0][0](params) // Executa a função de atualização dos parâmetros

		expect(params.get('orderId')).toBeNull()
		expect(params.get('customerName')).toBeNull()
		expect(params.get('status')).toBeNull()
	})

	it('should set default values from search params', () => {
		// Mock de searchParams com valores iniciais
		;(useSearchParams as unknown as typeof vi.fn).mockReturnValue([
			new URLSearchParams('orderId=456&customerName=Jane Doe&status=pending'),
			mockSetSearchParams,
		])

		render(
			<MemoryRouter>
				<OrderTableFilter />
			</MemoryRouter>,
		)

		// Verifica se os valores iniciais são definidos corretamente
		expect(screen.getByPlaceholderText('Id do pedido')).toHaveValue('456')
		expect(screen.getByPlaceholderText('Nome do cliente')).toHaveValue(
			'Jane Doe',
		)
		expect(
			screen.getByRole('button', { name: /Filtrar pedidos/i }),
		).toBeInTheDocument()
	})
})
