import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { registerRestaurantMock } from './auth/register-restaurant-mock'
import { signInMock } from './auth/sign-in-mock'
import { getDailyRevenueInPeriodMock } from './dashboard/get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './dashboard/get-day-orders-amount-mock'
import { getMonthCanceledOrdersAmountMock } from './dashboard/get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './dashboard/get-month-orders-amount-mock'
import { getMonthRevenueMock } from './dashboard/get-month-revenue-mock'
import { getPopularProductsMock } from './dashboard/get-popular-products-mock'
import { approveOrderMock } from './orders/actions/approve-order-mock'
import { cancelOrderMock } from './orders/actions/cancel-order-mock'
import { deliverOrderMock } from './orders/actions/deliver-order-mock'
import { getOrdersDetailsMock } from './orders/get-orders-details-mock'
import { getOrdersMock } from './orders/get-orders-mock'
import { updateProfileMock } from './profile//update-profile-mock'
import { getManagedRestaurantMock } from './profile/get-managed-restaurant-mock'
import { getProfileMock } from './profile/get-profile-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getDailyRevenueInPeriodMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrdersDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock
)

export const enabledWorker = async () => {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
