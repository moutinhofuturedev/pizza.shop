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

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getDailyRevenueInPeriodMock
)

export const enabledWorker = async () => {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
