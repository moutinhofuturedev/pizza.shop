import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { Header } from '..'

describe('<Header />', () => {
  it('it should render correctly', () => {
    const { container } = render(<Header />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    expect(container).toMatchSnapshot()
  })

  it('should display text "Inicio" and "Pedidos" in the header', () => {
    const wrapper = render(<Header />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
          </QueryClientProvider>
        )
      },
    })

    const homeLink = wrapper.getByText('Inicio')
    const orderLink = wrapper.getByText('Pedidos')

    expect(homeLink).toBeInTheDocument()
    expect(orderLink).toBeInTheDocument()
  })
})
