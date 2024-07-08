import axios from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data?.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/user/sign-in', { replace: true })
            toast.info('Sua sessão expirou, realize o login novamente!')
          }
        }
      },
    )

    return () => api.interceptors.response.eject(interceptor)
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
