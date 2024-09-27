import type { CancelOrderParams } from '@/api/patch/cancel-order'
import { http, HttpResponse } from 'msw'

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
	'/orders/:orderId/cancel',
	async ({ params }) => {
		if (params.orderId === 'error-order-id') {
			return new HttpResponse(JSON.stringify({ error: 'Invalid order id' }), {
				status: 400,
			})
		}

		return new HttpResponse(JSON.stringify({ message: 'Order approved' }), {
			status: 204,
		})
	},
)
