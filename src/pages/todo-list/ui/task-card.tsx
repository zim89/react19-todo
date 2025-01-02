import type { Task } from '@/shared/task.api'
import { Suspense, useActionState } from 'react'
import { deleteTaskAction } from '../actions'
import { UserPreview } from '@/pages/users/ui/user-preview'

export function TaskCard({
  task,
  refetchTasks,
}: {
  task: Task
  refetchTasks: () => void
}) {
  const [deleteState, handleDelete, isPending] = useActionState(
    deleteTaskAction({ refetchTasks }),
    {},
  )

  return (
    <div className='m-2 flex items-center gap-2 rounded border bg-gray-100 p-2'>
      {task.title} -
      <Suspense fallback={<div>Loading...</div>}>
        <UserPreview userId={task.userId} />
      </Suspense>
      <form className='ml-auto' action={handleDelete}>
        <input type='hidden' name='id' value={task.id} />
        <button
          disabled={isPending}
          className='ml-auto rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:bg-gray-400'
        >
          Delete{' '}
          {deleteState.error && (
            <div className='text-red-500'>{deleteState.error}</div>
          )}
        </button>
      </form>
    </div>
  )
}
