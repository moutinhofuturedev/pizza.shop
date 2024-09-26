import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { ModeToggle } from '..'

const setThemeMock = vi.fn()
// Mocking the useTheme hook
vi.mock('@/components/theme-provider', () => ({
	useTheme: () => ({
		setTheme: setThemeMock, // Mock da função setTheme
		theme: 'system', // Mock do estado inicial do tema
	}),
}))

describe('<ModeToggle />', () => {
	beforeEach(() => {
		// Resetar o mock antes de cada teste
		setThemeMock.mockClear()
	})

	it('should render correctly', () => {
		const { container } = render(<ModeToggle />)

		expect(container).toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should show buttons with correct label', async () => {
		render(<ModeToggle />)

		const button = screen.getByRole('button', { name: /toggle theme/i })
		await userEvent.click(button)

		const button1 = screen.getByText('Dark')
		const button2 = screen.getByText('Light')
		const button3 = screen.getByText('System')

		expect(button1).toBeInTheDocument()
		expect(button2).toBeInTheDocument()
		expect(button3).toBeInTheDocument()
	})

	it('should change to light mode when the dark option is clicked', async () => {
		render(<ModeToggle />)

		const button = screen.getByRole('button', { name: /toggle theme/i })
		await userEvent.click(button)

		const button1 = screen.getByText('Light')
		await userEvent.click(button1)

		expect(setThemeMock).toHaveBeenCalledWith('light')
	})

	it('should change to dark mode when the light option is clicked', async () => {
		render(<ModeToggle />)

		const button = screen.getByRole('button', { name: /toggle theme/i })
		await userEvent.click(button)

		const button2 = screen.getByText('Dark')
		await userEvent.click(button2)

		expect(setThemeMock).toHaveBeenCalledWith('dark')
	})

	it('should change to system mode when the system option is clicked', async () => {
		render(<ModeToggle />)

		const button = screen.getByRole('button', { name: /toggle theme/i })
		await userEvent.click(button)

		const button3 = screen.getByText('System')
		await userEvent.click(button3)

		expect(setThemeMock).toHaveBeenCalledWith('system')
	})
})
