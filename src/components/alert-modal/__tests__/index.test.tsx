import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AlertModal } from '..'

vi.mock('@/api/post/sign-out', () => ({
  signOut: () => {
    return Promise.resolve()
  },
}))

describe('<AlertModal />', () => {
  it('should open modal when button is clicked', async () => {
    render(<AlertModal />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    const button = screen.getByRole('button', { name: /sair/i })
    await userEvent.click(button)

    const text1 = screen.getByText(/tem certeza que deseja sair\?/i)
    const text2 = screen.getByText(
      /para acessar os dados do seu estabelecimento, você precisará fazer login novamente./i
    )

    expect(text1).toBeInTheDocument()
    expect(text2).toBeInTheDocument()
  })

  it('should call sign-out function when "Continue" is clicked', async () => {
    render(<AlertModal />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    const button = screen.getByRole('button', { name: /sair/i })
    await userEvent.click(button)

    const cancelButton = screen.getByText('Cancelar')
    const continueButton = screen.getByText('Continue')

    expect(cancelButton).toBeInTheDocument()
    expect(continueButton).toBeInTheDocument()
  })

  it('should close modal when "Cancel" is clicked', async () => {
    render(<AlertModal />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    const button = screen.getByRole('button', { name: /sair/i })
    await userEvent.click(button)

    const cancelButton = screen.getByText('Cancelar')
    await userEvent.click(cancelButton)

    const modal = screen.findByTestId('alert-modal')

    expect(modal).not.toContain('Cancelar')
  })

  it('should ignore button click when already disabled', async () => {
    render(<AlertModal />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    const button = screen.getByRole('button', { name: /sair/i })
    await userEvent.click(button)

    waitFor(() => {
      expect(button).toBeDisabled()
    })
  })

  it('should navigate to "/user/sign-in" on successful sign-out', async () => {
    const navigate = vi.fn()

    render(<AlertModal />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    const button = screen.getByRole('button', { name: /sair/i })
    await userEvent.click(button)

    const continueButton = screen.getByText('Continue')
    await userEvent.click(continueButton)

    waitFor(() => {
      expect(navigate).toHaveBeenCalled()
      expect(window.location.pathname).toBe('/user/sign-in')
    })
  })
})
