import type { SignInBody } from '@/api/post/sign-in'
import { http, HttpResponse } from 'msw'

export const signInMock = http.post<never, SignInBody>(
	'/authenticate',
	async ({ request }) => {
		const { email } = await request.json()

		if (email === 'Jr5wA@example.com') {
			return new HttpResponse(JSON.stringify({ token: 'sample-jwt' }), {
				status: 200,
				headers: { 'Set-Cookie': 'auth=sample-jwt' },
			})
		}

		return new HttpResponse(JSON.stringify({ error: 'Invalid credentials' }), {
			status: 401,
		})
	},
)
