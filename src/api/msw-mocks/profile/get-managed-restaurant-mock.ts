import type { GetManagedRestaurantResponsePick } from '@/api/get/orders/get-managed-restaurant'
import { http, HttpResponse } from 'msw'

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
