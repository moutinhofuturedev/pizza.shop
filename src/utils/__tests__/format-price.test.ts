import { formatPrice } from '../format-price'

describe('formatPrice', () => {
  it('should format positive integer prices correctly', () => {
    const price = 1234
    const formattedPrice = formatPrice(price)

    expect(formattedPrice).toBe('R$ 1.234,00')
  })
})
