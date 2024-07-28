import { render } from '@testing-library/react'

import { OrderStatus, OrderStatusType } from '../order-status'

describe('<OrderStatus />', () => {
  it('should render display order status correctly with props', () => {
    const wrapper = render(<OrderStatus status={OrderStatusType.Delivered} />)

    const statusText = wrapper.getByText('Entregue')

    expect(statusText).toBeInTheDocument()
  })

  it('should render display order status correctly with class badge color', () => {
    const wrapper = render(<OrderStatus status={OrderStatusType.Canceled} />)

    const statusText = wrapper.getByText('Cancelado')
    const orderStatus = wrapper.getByTestId('order-status')

    expect(statusText).toBeInTheDocument()
    expect(orderStatus).toHaveClass('bg-red-500')
  })

  it('should render display order status correctly', () => {
    const { container } = render(
      <OrderStatus status={OrderStatusType.Pending} />,
    )

    expect(container).toMatchSnapshot()
  })
})
