import { fetchTasks } from '@/shared/task.api'
import { startTransition, Suspense, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { CreateTaskForm } from './ui/create-task-form'
import { TasksList } from './ui/tasks-list'

export function TodoListPage() {
  const { userId = '' } = useParams()

  const [paginatedTasksPromise, setTasksPromise] = useState(() =>
    fetchTasks({ filters: { userId } }),
  )

  const refetchTasks = () =>
    startTransition(() => setTasksPromise(fetchTasks({ filters: { userId } })))

  const tasksPromise = useMemo(
    () => paginatedTasksPromise.then(r => r.data),
    [paginatedTasksPromise],
  )

  return (
    <main className='container mx-auto flex flex-col gap-4 p-4 pt-10'>
      <h1 className='text-3xl font-bold'>Tasks</h1>
      <CreateTaskForm refetchTasks={refetchTasks} userId={userId} />
      <ErrorBoundary
        fallbackRender={e => (
          <div className='text-red-500'>
            Something went wrong:{JSON.stringify(e)}{' '}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <TasksList tasksPromise={tasksPromise} refetchTasks={refetchTasks} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
