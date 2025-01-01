import type { User } from '@/shared/api'
import { UserCard } from './user-card'
import { use } from 'react'

export function UsersList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  const users = use(usersPromise)

  return (
    <div className='flex flex-col gap-2'>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
