import { Suspense, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { CreateTaskForm } from './ui/create-task-form'
import { TasksList } from './ui/tasks-list'
import { Pagination } from './ui/pagination'
import { useTasks } from './use-tasks'
import { useSearch } from './use-search'
import { useSort } from './use-sort'

export function TodoListPage() {
  const { userId = '' } = useParams()

  const {
    paginatedTasksPromise,
    refetchTasks,
    defaultCreatedAtSort,
    defaultSearch,
  } = useTasks({
    userId,
  })

  const { search, handleChangeSearch } = useSearch(defaultSearch, title =>
    refetchTasks({ title }),
  )

  const { sort, handleChangeSort } = useSort(defaultCreatedAtSort, sort =>
    refetchTasks({ createdAtSortNew: sort as 'asc' | 'desc' }),
  )

  const onPageChange = async (newPage: number) => {
    refetchTasks({ page: newPage })
  }

  const tasksPromise = useMemo(
    () => paginatedTasksPromise.then(r => r.data),
    [paginatedTasksPromise],
  )

  return (
    <main className='container mx-auto flex flex-col gap-4 p-4 pt-10'>
      <h1 className='text-3xl font-bold'>Tasks</h1>
      <CreateTaskForm refetchTasks={() => refetchTasks({})} userId={userId} />
      <div className='flex gap-2'>
        <input
          placeholder='Search'
          type='text'
          className='rounded border p-2'
          value={search}
          onChange={handleChangeSearch}
        />
        <select
          className='rounded border p-2'
          value={sort}
          onChange={handleChangeSort}
        >
          <option value='asc'>asc</option>
          <option value='desc'>desc</option>
        </select>
      </div>
      <ErrorBoundary
        fallbackRender={e => (
          <div className='text-red-500'>
            Something went wrong:{JSON.stringify(e)}{' '}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <TasksList
            tasksPromise={tasksPromise}
            refetchTasks={() => refetchTasks({})}
          />
          <Pagination
            tasksPaginated={paginatedTasksPromise}
            onPageChange={onPageChange}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
