import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { NotFound } from '../404'

describe('<404 />', () => {
	it('should render correctly', () => {
		const { container } = render(<NotFound />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={['/404']}>{children}</MemoryRouter>
			),
		})

		expect(container).toMatchSnapshot()
	})

	it('should render 404 message', () => {
		render(<NotFound />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={['/404']}>{children}</MemoryRouter>
			),
		})

		const message1 = screen.getByText('Whoops!404')
		const message2 = screen.getByText('Página não encontrada.')

		expect(message1).toBeInTheDocument()
		expect(message2).toBeInTheDocument()
	})

	it('should render 404 message with button back to home', async () => {
		render(<NotFound />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={['/404']}>{children}</MemoryRouter>
			),
		})

		const button = screen.getByRole('button', {
			name: /volte para o dashboard/i,
		})
		await userEvent.click(button)

		expect(window.location.pathname).toBe('/')
	})
})
