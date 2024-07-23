/* eslint-disable react-hooks/exhaustive-deps */
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
          const message = error.response?.data?.message

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/user/sign-in', { replace: true })
          }

          if (status === 400 && code === 'INVALID_PERIOD') {
            return toast.error('Período inválido.', {
              duration: 8000,
              description: `${message}.`,
            })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptor)
      toast.info('Sua sessão expirou, realize o login novamente!', {
        duration: 8000,
      })
    }
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
