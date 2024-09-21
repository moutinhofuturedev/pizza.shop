import type { GetProfileResponsePick } from '@/api/get/get-profile'
import { http, HttpResponse } from 'msw'

export const getProfileMock = http.get<never, never, GetProfileResponsePick>(
  '/me',
  () => {
    return HttpResponse.json({
      name: 'John Doe',
      email: 'Jr5wA@example.com',
    })
  }
)
