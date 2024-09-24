import type { DispatchOrderParams } from '@/api/patch/dispatch-order'
import { http, HttpResponse } from 'msw'

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(JSON.stringify({ error: 'Invalid order id' }), {
        status: 400,
      })
    }

    return new HttpResponse(JSON.stringify({ message: 'Order approved' }), {
      status: 204,
    })
  }
)
