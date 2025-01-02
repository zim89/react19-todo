import { User } from '@/shared/user.api'
import { useActionState } from 'react'
import { type DeleteUserAction } from '../actions'
import { Link } from 'react-router-dom'

export function UserCard({
  user,
  deleteUserAction,
}: {
  user: User
  deleteUserAction: DeleteUserAction
}) {
  const [state, dispatch] = useActionState(deleteUserAction, {})

  return (
    <div className='m-2 flex items-center gap-2 rounded border bg-gray-100 p-2'>
      {user.email}
      <form action={dispatch} className='ml-auto flex items-center gap-2'>
        <input type='hidden' name='id' value={user.id} />
        <Link
          to={`/${user.id}/tasks`}
          className='ml-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400'
        >
          Tasks
        </Link>
        <button className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:bg-gray-400'>
          Delete
          {state.error && <div className='text-red-500'>{state.error}</div>}
        </button>
      </form>
    </div>
  )
}
