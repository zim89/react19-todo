import { deleteUser, User } from '@/shared/api'
import { useTransition } from 'react'

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User
  refetchUsers: () => void
}) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteUser(user.id)
      refetchUsers()
    })
  }

  return (
    <div className='flex items-center rounded-md border bg-gray-100 p-2'>
      {user.email}
      <button
        onClick={handleDelete}
        disabled={isPending}
        type='button'
        className='ml-auto rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:bg-gray-400'
      >
        Delete
      </button>
    </div>
  )
}
