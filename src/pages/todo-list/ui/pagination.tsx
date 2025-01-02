import type { PaginatedResponse } from '@/shared/task.api'
import { use, useTransition } from 'react'

export function Pagination<T>({
  tasksPaginated,
  onPageChange,
}: {
  tasksPaginated: Promise<PaginatedResponse<T>>
  onPageChange?: (page: number) => void
}) {
  const [isLoading, startTransition] = useTransition()
  const { last, page, first, next, prev, pages } = use(tasksPaginated)

  const handlePageChange = (page: number) => () => {
    console.log(page)
    startTransition(() => onPageChange?.(page))
  }
  return (
    <nav
      className={`${
        isLoading ? 'opacity-50' : ''
      } flex items-center justify-between`}
    >
      <div className='grid grid-cols-4 gap-2'>
        <button
          disabled={isLoading}
          onClick={handlePageChange(first)}
          className='rounded-l px-3 py-2'
        >
          First ({first})
        </button>
        {prev && (
          <button
            disabled={isLoading}
            onClick={handlePageChange(prev)}
            className='px-3 py-2'
          >
            Prev ({prev})
          </button>
        )}
        {next && (
          <button
            disabled={isLoading}
            onClick={handlePageChange(next)}
            className='px-3 py-2'
          >
            Next ({next})
          </button>
        )}
        <button
          disabled={isLoading}
          onClick={handlePageChange(last)}
          className='rounded-r px-3 py-2'
        >
          Last ({last})
        </button>
      </div>
      <span className='text-sm'>
        Page {page} of {pages}
      </span>
    </nav>
  )
}
