import { api } from '@/lib/axios'

interface SignInBody {
  email: string
}

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

export const signIn = async ({ email }: SignInBody) => {
  await api.post<ApiResponse<string>>('/authenticate', { email })
}
