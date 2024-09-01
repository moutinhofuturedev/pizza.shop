// import { QueryClientProvider } from '@tanstack/react-query'
// import { render, screen } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom'

// import { queryClient } from '@/lib/react-query'

// import { Header } from '..'

// describe('<Header />', () => {
//   it('it should render correctly', () => {
//     const { container } = render(<Header />, {
//       wrapper: ({ children }) => {
//         return (
//           <QueryClientProvider client={queryClient}>
//             <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
//           </QueryClientProvider>
//         )
//       },
//     })

//     const homeLink = screen.getByText('Inicio')
//     const orderLink = screen.getByText('Pedidos')

//     expect(homeLink).toBeInTheDocument()
//     expect(orderLink).toBeInTheDocument()
//     expect(container).toMatchSnapshot()
//   })
// })
