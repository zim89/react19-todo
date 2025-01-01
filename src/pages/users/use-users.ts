import { fetchUsers, type User } from '@/shared/api'
import { startTransition, use, useOptimistic, useState } from 'react'
import { createUserAction, deleteUserAction } from './actions'

const defaultUsersPromise = fetchUsers()

export function useUsers() {
  const [usersPromise, setUsersPromise] =
    useState<Promise<User[]>>(defaultUsersPromise)
  const refetchUsers = () =>
    startTransition(() => setUsersPromise(fetchUsers()))

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
