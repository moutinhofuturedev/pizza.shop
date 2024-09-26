import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Dashboard } from '@/pages/app/dashboard/index'
import { Orders } from '@/pages/app/orders/index'
import { SignIn } from '@/pages/auth/sign-in'
import { SignUp } from '@/pages/auth/sign-up'

import { NotFound } from './pages/404'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from './pages/Error'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Dashboard />,
			},
			{
				path: '/orders',
				element: <Orders />,
			},
		],
	},
	{
		path: '/user',
		element: <AuthLayout />,
		children: [
			{
				path: 'sign-in',
				element: <SignIn />,
			},
			{
				path: 'sign-up',
				element: <SignUp />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
