import { api } from '@/lib/axios'

export type PopularProductResponse = {
  product: string
  amount: number
}[]

export const getPopularProducts = async () => {
  const response = await api.get<PopularProductResponse>(
    '/metrics/popular-products'
  )

  return response.data
}
