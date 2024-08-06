import { QueryClientProvider } from '@tanstack/react-query'
import { render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { toast } from 'sonner'

import { queryClient } from '@/lib/react-query'

import { SignIn } from '../sign-in'

const handleSubmitForm = vi.fn().mockImplementationOnce(() => Promise.resolve())

describe('<SignIn />', () => {
  beforeEach(() => {
    handleSubmitForm.mockClear()
  })

  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter
                initialEntries={['/user/sign-in?email=Jr5wA@example.com']}
              >
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </HelmetProvider>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail')

    expect(emailInput).toHaveValue('Jr5wA@example.com')
  })

  it('should show error message when submitting form with invalid email format', async () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter
                initialEntries={['/user/sign-in?email=Jr5wA@example.com']}
              >
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </HelmetProvider>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail')
    const submitButton = wrapper.getByRole('button', {
      name: /acessar painel/i,
    })

    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.click(submitButton)
    const errorMessage = await wrapper.findByText(/e-mail inválido/i)

    expect(errorMessage).toBeInTheDocument()
  })

  it('should accept valid email addresses in email input field', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter
                initialEntries={['/user/sign-in?email=test@example.com']}
              >
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </HelmetProvider>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail')
    userEvent.type(emailInput, 'test@example.com')

    expect(emailInput).toHaveValue('test@example.com')
  })

  it('should trigger handleSubmitForm on form submission', async () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter initialEntries={['/user/sign-in']}>
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </HelmetProvider>
        )
      },
    })

    const form = wrapper.getByTestId('sign-in-form')
    const submitButton = wrapper.getByRole('button', {
      name: /acessar painel/i,
    })

    await userEvent.type(form, 'test@example.com')
    await userEvent.click(submitButton)

    waitFor(() => {
      expect(handleSubmitForm).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining(
          'Enviamos um link de autenticação para o seu email',
        ),
        expect.any(Object),
      )
    })
  })

  it('should render the "Novo estabelecimento" link', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter initialEntries={['/user/sign-in']}>
                {children}
              </MemoryRouter>
            </QueryClientProvider>
          </HelmetProvider>
        )
      },
    })

    const link = wrapper.getByRole('link', {
      name: /novo estabelecimento/i,
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/user/sign-up')
  })
})
