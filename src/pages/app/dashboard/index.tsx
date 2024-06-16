import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from './modules/day-orders-amount-card'
import { MonthCanceledOrdersAmount } from './modules/month-canceled-orders-amount'
import { MonthOrdersAmountCard } from './modules/month-orders-amount-card'
import { MonthRevenueCard } from './modules/month-revenue-card'
import { PopularProductChart } from './modules/popular-product-charts'
import { RevenueChart } from './modules/revenue-chart'

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmount />
        </div>

        <div className="grid grid-cols-9 gap-4 max-md:grid-cols-6">
          <RevenueChart />
          <PopularProductChart />
        </div>
      </div>
    </>
  )
}
