import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from '..'

describe('<NavLink />', () => {
	it('it should highlight the nav link when active is true', () => {
		const wrapper = render(
			<>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/orders'>Pedidos</NavLink>
			</>,
			{
				// Função wrapper para renderizar componentes que dependem de um Context Provider no App.
				wrapper: ({ children }) => {
					// Renderiza o componente com um MemoryRouter e uma entrada inicial de '/orders'.
					return (
						// O componente MemoryRouter é usado para simular o comportamento da API de histórico e URL de um navegador em um ambiente de teste.
						<MemoryRouter
							// A propriedade initialEntries é usada para definir as entradas iniciais no histórico de memória.
							// Neste caso, ele é definido como ['/orders'], o que significa que a URL inicial será '/orders'.
							initialEntries={['/orders']}
						>
							{/* Render the children components. */}
							{children}
						</MemoryRouter>
					)
				},
			},
		)

		const homeLink = wrapper.getByText('Home')
		const navLink = wrapper.getByText('Pedidos')

		expect(homeLink).toHaveAttribute('data-active', 'false')
		expect(navLink).toHaveAttribute('data-active', 'true')
	})
})
