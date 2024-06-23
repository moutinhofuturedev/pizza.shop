import { api } from '@/lib/axios'

interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export type GetProfileResponsePick = Pick<GetProfileResponse, 'name' | 'email'>

export const getProfile = async () => {
  const response = await api.get<GetProfileResponsePick>('/me')

  return response.data
}
