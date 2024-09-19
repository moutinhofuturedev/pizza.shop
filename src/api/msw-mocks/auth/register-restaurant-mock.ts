import { http, HttpResponse } from 'msw'
import type { RegisterRestaurantBody } from '../post/register-restaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json()
    const restaurant = 'Mexican Suzano'

    if (restaurantName === restaurant) {
      return new HttpResponse(JSON.stringify({ id: 1, name: restaurant }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new HttpResponse(
      JSON.stringify({ error: 'Invalid restaurant name' }),
      {
        status: 400,
      }
    )
  }
)
