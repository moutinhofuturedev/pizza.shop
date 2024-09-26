import { Link, type LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export const NavLink = (props: NavLinkProps) => {
	const { pathname } = useLocation()

	return (
		<Link
			{...props}
			data-active={pathname === props.to}
			className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground data-[active=true]:underline'
		/>
	)
}
