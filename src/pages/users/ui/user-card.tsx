import { User } from '@/shared/api'
import { useActionState } from 'react'
import { deleteUserAction } from '../actions'

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User
  refetchUsers: () => void
}) {
  const [state, dispatch, isPending] = useActionState(
    deleteUserAction({ id: user.id, refetchUsers }),
    {},
  )
  return (
    <div className='flex items-center rounded-md border bg-gray-100 p-2'>
      {user.email}
      <form action={dispatch} className='ml-auto'>
        <button
          disabled={isPending}
          className='rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:bg-gray-400'
        >
          Delete
          {state.error && <div className='text-red-500'>{state.error}</div>}
        </button>
      </form>
    </div>
  )
}
