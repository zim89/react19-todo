import type { User } from '@/shared/api'
import { UserCard } from './user-card'
import type { DeleteUserAction } from '../actions'

export function UsersList({
  useUsersList,
  deleteUserAction,
}: {
  useUsersList: () => User[]
  deleteUserAction: DeleteUserAction
}) {
  const users = useUsersList()

  return (
    <div className='flex flex-col gap-2'>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          deleteUserAction={deleteUserAction}
        />
      ))}
    </div>
  )
}
