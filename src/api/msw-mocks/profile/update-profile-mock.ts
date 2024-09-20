import type { UpdateStoreProfileBody } from '@/api/put/update-store-profile'
import { http, HttpResponse } from 'msw'

export const updateProfileMock = http.put<never, UpdateStoreProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name, description } = await request.json()

    if (name === 'Italian Cafe' && description === 'Best Cafe') {
      return new HttpResponse(JSON.stringify({ message: 'Profile updated' }), {
        status: 204,
      })
    }

    return new HttpResponse(JSON.stringify({ error: 'Invalid name' }), {
      status: 400,
    })
  }
)
