import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { ThemeProvider, ThemeProviderContext } from '..'

describe('ThemeProvider', () => {
  it('should initialize theme from localStorage or defaultTheme', () => {
    localStorage.setItem('vite-ui-theme', 'dark')

    render(
      <ThemeProvider defaultTheme="light">
        <div>Test</div>
      </ThemeProvider>
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
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={() => setTheme('dark')}>Change Theme</button>
        </div>
      )
    }

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    )

    userEvent.click(screen.getByText('Change Theme'))

    expect(screen.getByText('dark')).toBeInTheDocument()
  })
})
