import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

export const registerRestaurant = async ({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantBody) => {
  await api.post<ApiResponse<string>>('/restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  })
}
