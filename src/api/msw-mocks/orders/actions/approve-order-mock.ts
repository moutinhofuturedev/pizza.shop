import type { ApproveOrderParams } from '@/api/patch/approve-order'
import { http, HttpResponse } from 'msw'

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  '/orders/:orderId/approve',
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
