import { type User } from '@/shared/user.api'
import { use, useOptimistic } from 'react'
import { createUserAction, deleteUserAction } from './actions'
import { useUsersGlobal } from '@/entities/user'

export function useUsers() {
  const { usersPromise, refetchUsers } = useUsersGlobal()

  const [createdUsers, optimisticCreate] = useOptimistic(
    [] as User[],
    (createdUsers, user: User) => [...createdUsers, user],
  )

  const [deletedUserIds, optimisticDelete] = useOptimistic(
    [] as string[],
    (deletedUsers, id: string) => deletedUsers.concat(id),
  )

  const useUsersList = () => {
    const users = use(usersPromise)
    return users
      .concat(createdUsers)
      .filter(user => !deletedUserIds.includes(user.id))
  }

  return {
    createUserAction: createUserAction({ refetchUsers, optimisticCreate }),
    deleteUserAction: deleteUserAction({ refetchUsers, optimisticDelete }),
    useUsersList,
  } as const
}
