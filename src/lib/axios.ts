import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { env } from '@/env'

export const api: AxiosInstance = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 1000,
  withCredentials: true,
})

// Intercepta requisições
api.interceptors.request.use(
  async (config) => {
    if (env.VITE_ENABLE_DELAY_API) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('Solicitação enviada:', config.url)
    return config
  },
  (error) => {
    console.error('Erro na configuração da solicitação:', error)
    return Promise.reject(error)
  },
)

// Intercepta respostas
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log('Resposta de sucesso:', response.status, response.statusText)
    return response
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        // Erro na resposta da API
        console.error(
          'Erro na resposta da API:',
          axiosError.response.status,
          axiosError.response.statusText,
        )
      } else if (axiosError.request) {
        // Erro na solicitação da API
        console.error('Erro na solicitação da API:', axiosError.request)
      } else {
        // Erro genérico ou erro ao configurar solicitação da API
        console.error(
          'Erro na configuração da solicitação:',
          axiosError.message,
          error,
        )
      }
    } else {
      // Erro que não é do Axios
      console.error('Erro desconhecido:', error)
    }
    return Promise.reject(error)
  },
)
