import { http, HttpResponse } from 'msw'
import type { GetProfileResponsePick } from '../../get/get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponsePick>(
  '/me',
  () => {
    return HttpResponse.json({
      name: 'John Doe',
      email: 'Jr5wA@example.com',
    })
  }
)
