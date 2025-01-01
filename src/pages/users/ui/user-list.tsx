import type { User } from '@/shared/api'
import { UserCard } from './user-card'
import { use } from 'react'

export function UsersList({
  usersPromise,
  refetchUsers,
}: {
  usersPromise: Promise<User[]>
  refetchUsers: () => void
}) {
  const users = use(usersPromise)

  return (
    <div className='flex flex-col gap-2'>
      {users.map(user => (
        <UserCard key={user.id} user={user} refetchUsers={refetchUsers} />
      ))}
    </div>
  )
}
