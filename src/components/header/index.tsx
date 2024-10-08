import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from '../account-menu'
import { ModeToggle } from '../mode-toggle'
import { NavLink } from '../nav-link'
import { Separator } from '../ui/separator'

export const Header = () => {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center gap-6 px-6 max-md:justify-center max-md:gap-3'>
				<Pizza className='h-6 w-6 max-sm:hidden' />

				<Separator orientation='vertical' className='h-6 max-sm:hidden' />
				<nav className='flex items-center space-x-4 lg:space-x-6'>
					<NavLink to='/'>
						<Home className='h-4 w-4' />
						Inicio
					</NavLink>
				</nav>
				<nav className='flex items-center space-x-4 lg:space-x-6'>
					<NavLink to='/orders'>
						<UtensilsCrossed className='h-4 w-4' />
						Pedidos
					</NavLink>
				</nav>

				<div className='ml-auto flex items-center gap-2'>
					<ModeToggle />
					<AccountMenu />
				</div>
			</div>
		</div>
	)
}
