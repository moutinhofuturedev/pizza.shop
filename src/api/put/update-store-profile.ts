import { api } from '@/lib/axios'

export interface UpdateStoreProfileBody {
  name: string
  description: string | null
}

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

export const updateStoreProfile = async ({
  name,
  description,
}: UpdateStoreProfileBody) => {
  await api.put<ApiResponse<string>>('/profile', { name, description })
}
