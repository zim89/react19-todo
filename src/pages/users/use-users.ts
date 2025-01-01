import { fetchUsers, type User } from '@/shared/api'
import { startTransition, useState } from 'react'

const defaultUsersPromise = fetchUsers()

export function useUsers() {
  const [usersPromise, setUsersPromise] =
    useState<Promise<User[]>>(defaultUsersPromise)
  const refetchUsers = () =>
    startTransition(() => setUsersPromise(fetchUsers()))

  return [usersPromise, refetchUsers] as const
}
