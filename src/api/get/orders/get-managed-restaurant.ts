import { api } from '@/lib/axios'

interface GetManagedRestaurantResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export type GetManagedRestaurantResponsePick = Pick<
  GetManagedRestaurantResponse,
  'name' | 'description'
>

export const getManagedRestaurant = async () => {
  const response = await api.get<GetManagedRestaurantResponsePick>(
    '/managed-restaurant'
  )

  return response.data
}
