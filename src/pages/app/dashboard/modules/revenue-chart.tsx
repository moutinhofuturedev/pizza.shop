import { faker } from '@faker-js/faker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import color from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '01/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
  { date: '02/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
  { date: '03/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
  { date: '04/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
  { date: '05/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
  { date: '06/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
  { date: '07/12', revenue: faker.number.int({ min: 1000, max: 10000 }) },
]

console.log(data[0].revenue)

export const RevenueChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              stroke="#9CA3AF"
              dy={16}
            />
            <YAxis
              stroke="#9CA3AF"
              width={80}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <CartesianGrid vertical={false} stroke="#9CA3AF" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={color.rose[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
