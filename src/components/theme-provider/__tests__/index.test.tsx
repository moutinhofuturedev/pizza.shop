import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { ThemeProvider, ThemeProviderContext, useTheme } from '..'

describe('ThemeProvider', () => {
	it('should initialize theme from localStorage or defaultTheme', () => {
		localStorage.setItem('vite-ui-theme', 'dark')

		render(
			<ThemeProvider defaultTheme='light'>
				<div>Test</div>
			</ThemeProvider>,
		)

		const root = window.document.documentElement

		expect(root.classList.contains('dark')).toBe(true)
	})

	it('should provide theme and setTheme via context to children components', () => {
		const TestComponent = () => {
			const { theme, setTheme } = useContext(ThemeProviderContext)
			return (
				<div>
					<span>{theme}</span>
					<button onClick={() => setTheme('dark')}>Change Theme</button>
				</div>
			)
		}

		render(
			<ThemeProvider defaultTheme='light'>
				<TestComponent />
			</ThemeProvider>,
		)

		userEvent.click(screen.getByText('Change Theme'))

		expect(screen.getByText('dark')).toBeInTheDocument()
	})

	it('should update localStorage when theme changes', () => {
		const { result } = renderHook(() => useContext(ThemeProviderContext), {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
		})

		act(() => {
			result.current.setTheme('dark')
		})

		expect(localStorage.getItem('vite-ui-theme')).toBe('dark')
	})

	it('should react to changes in system theme preference', () => {
		window.matchMedia = vi.fn().mockImplementation(query => ({
			matches: query === '(prefers-color-scheme: dark)',
			addListener: vi.fn(),
			removeListener: vi.fn(),
		}))

		render(
			<ThemeProvider defaultTheme='system'>
				<div>Test</div>
			</ThemeProvider>,
		)

		expect(document.documentElement.classList.contains('dark')).toBe(true)
		// clear value from localStorage before next test
		localStorage.removeItem('vite-ui-theme')
	})

	it('should have default theme as "system" and setTheme should not be null', () => {
		const { result } = renderHook(() => useTheme(), {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
		})

		expect(result.current.theme).toBe('system')

		expect(result.current.setTheme).not.toBe(null)
	})
})
