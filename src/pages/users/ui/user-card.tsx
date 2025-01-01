import { User } from '@/shared/api'
import { useActionState } from 'react'
import { type DeleteUserAction } from '../actions'

export function UserCard({
  user,
  deleteUserAction,
}: {
  user: User
  deleteUserAction: DeleteUserAction
}) {
  const [state, dispatch] = useActionState(deleteUserAction, {})

  return (
    <div className='flex items-center rounded-md border bg-gray-100 p-2'>
      {user.email}
      <form action={dispatch} className='ml-auto'>
        <input type='hidden' name='id' value={user.id} />
        <button className='rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:bg-gray-400'>
          Delete
          {state.error && <div className='text-red-500'>{state.error}</div>}
        </button>
      </form>
    </div>
  )
}
