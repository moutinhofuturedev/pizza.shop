import { http, HttpResponse } from 'msw'
import type { GetManagedRestaurantResponsePick } from '../../get/orders/get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponsePick
>('/managed-restaurant', () => {
  return HttpResponse.json({
    name: 'Mexican Suzano',
    description: 'Melhor mexicano de suzano',
  })
})
