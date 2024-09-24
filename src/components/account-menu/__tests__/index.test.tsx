import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AccountMenu } from '..'

describe('<AccountMenu />', () => {
  it('should render managed restaurant name', async () => {
    queryClient.setQueryData(['managed-restaurant'], {
      name: 'Restaurant Name',
    })

    render(<AccountMenu />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>,
        </QueryClientProvider>
      ),
    })

    const button = screen.getByTestId('account-menu')
    await userEvent.click(button)

    const restaurantName = screen.getByText('Restaurant Name')

    expect(restaurantName).toBeInTheDocument()
  })

  it('should render profile data', async () => {
    queryClient.setQueryData(['profile'], {
      name: 'John Doe',
      email: 'Jr5wA@example.com',
    })

    render(<AccountMenu />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>,
        </QueryClientProvider>
      ),
    })

    const button = screen.getByTestId('account-menu')
    await userEvent.click(button)

    const profileName = screen.getByText('John Doe')
    const profileEmail = screen.getByText('Jr5wA@example.com')

    expect(profileName).toBeInTheDocument()
    expect(profileEmail).toBeInTheDocument()
  })

  it('should render logout and store profile button', async () => {
    render(<AccountMenu />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>,
        </QueryClientProvider>
      ),
    })

    const button = screen.getByTestId('account-menu')
    await userEvent.click(button)

    const logoutButton = screen.getByRole('button', {
      name: 'Sair',
    })
    const storeProfile = screen.getByText('Perfil da loja')

    expect(logoutButton).toBeInTheDocument()
    expect(storeProfile).toBeInTheDocument()
  })
})
