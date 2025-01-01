import { fetchUsers, type User } from '@/shared/api'
import { CreateUserForm } from './ui/create-user-form'
import { UsersList } from './ui/user-list'
import { Suspense, useState } from 'react'

const defaultUsersPromise = fetchUsers()

export function UsersPage() {
  const [usersPromise, setUsersPromise] =
    useState<Promise<User[]>>(defaultUsersPromise)
  const refetchUsers = () => setUsersPromise(fetchUsers())

  return (
    <main className='container mx-auto space-y-6 p-4 pt-10'>
      <h1 className='text-3xl font-bold'>Users</h1>
      <CreateUserForm refetchUsers={refetchUsers} />

      <Suspense fallback={<div>Loading users...</div>}>
        <UsersList usersPromise={usersPromise} />
      </Suspense>
    </main>
  )
}
