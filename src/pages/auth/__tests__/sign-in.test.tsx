vi.mock('@/env', () => ({
  env: {
    VITE_BASE_URL: 'http://localhost:3000',
    VITE_ENABLE_DELAY_API: 'false',
  },
}))

import { render } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import { queryClient } from '@/lib/react-query'

import { SignIn } from '../sign-in'

const handleSubmitForm = vi.fn()

describe('<SignIn />', () => {
  beforeEach(() => {
    handleSubmitForm.mockClear()
  })

  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter initialEntries={['/auth/sign-in?email=Jr5wA@example.com']}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
          </HelmetProvider>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail')

    expect(emailInput).toHaveValue('Jr5wA@example.com')
  })
})



