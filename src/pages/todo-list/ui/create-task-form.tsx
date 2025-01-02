import { useActionState } from 'react'
import { createTaskAction } from '../actions'

export function CreateTaskForm({
  userId,
  refetchTasks,
}: {
  userId: string
  refetchTasks: () => void
}) {
  const [state, dispatch, isPending] = useActionState(
    createTaskAction({ refetchTasks, userId }),
    { title: '' },
  )
  return (
    <form className='flex gap-2' action={dispatch}>
      <input name='title' type='text' className='rounded border p-2' />
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400'
        type='submit'
        defaultValue={state.title}
        disabled={isPending}
      >
        Add
      </button>
      {state.error && <div className='text-red-500'>{state.error}</div>}
    </form>
  )
}
