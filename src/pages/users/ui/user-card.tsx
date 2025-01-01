import type { User } from '@/shared/api'

export function UserCard({ user }: { user: User }) {
  return (
    <div className='flex items-center rounded-md border bg-gray-100 p-2'>
      {user.email}
      <button
        type='button'
        className='ml-auto rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
      >
        Delete
      </button>
    </div>
  )
}
