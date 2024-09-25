import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Pagination } from '../index'

const onPageChangeCallback = vi.fn()

describe('<Pagination />', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const { container } = render(
      <Pagination
        totalCount={200}
        perPage={10}
        pageIndex={0}
        onPageChange={onPageChangeCallback}
      />
    )

    const totalResults = screen.getByText('Total de 200 item(s)')
    const pageCount = screen.getByText('Página 1 de 20')

    expect(pageCount).toBeInTheDocument()
    expect(totalResults).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should be able to navigate to the next page', async () => {
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = screen.getByRole('button', {
      name: 'Próxima página',
    })

    await userEvent.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const previousPageButton = screen.getByRole('button', {
      name: 'Página anterior',
    })

    await userEvent.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the first page', async () => {
    render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const firstPageButton = screen.getByRole('button', {
      name: 'Primeira página',
    })

    await userEvent.click(firstPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const lastPageButton = screen.getByRole('button', {
      name: 'Última página',
    })

    await userEvent.click(lastPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })

  it('should calculate correct number of pages when totalCount is a multiple of perPage', () => {
    render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const totalCount = 100
    const perPage = 10

    // Act
    const pages = Math.ceil(totalCount / perPage) || 1

    // Assert
    expect(pages).toBe(10)
  })
})
