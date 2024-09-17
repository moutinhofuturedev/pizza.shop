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
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await userEvent.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await userEvent.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the first page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const firstPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await userEvent.click(firstPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const lastPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await userEvent.click(lastPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })
})
