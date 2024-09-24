import type { DeliverOrderParams } from '@/api/patch/deliver-order'
import { http, HttpResponse } from 'msw'

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  '/orders/:orderId/deliver',
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
