import { api } from '@/lib/axios'

interface SignInBody {
  email: string
}

export const signIn = async ({ email }: SignInBody) => {
  await api.post('/authenticate', { email })
}
