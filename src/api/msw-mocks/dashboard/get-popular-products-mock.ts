import type { PopularProductResponse } from '@/api/get/dashboard/get-popular-products'
import { http, HttpResponse } from 'msw'

export const getPopularProductsMock = http.get<
  never,
  never,
  PopularProductResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Margherita', amount: 10 },
    { product: 'Pepperoni', amount: 8 },
    { product: 'Quatro Queijos', amount: 12 },
    { product: 'Frango com Catupiry', amount: 9 },
    { product: 'Calabresa', amount: 11 },
  ])
})
