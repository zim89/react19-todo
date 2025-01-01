import { CreateUserForm } from './ui/create-user-form'
import { UsersList } from './ui/user-list'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useUsers } from './use-users'

export function UsersPage() {
  const { useUsersList, createUserAction, deleteUserAction } = useUsers()

  return (
    <main className='container mx-auto space-y-6 p-4 pt-10'>
      <h1 className='text-3xl font-bold'>Users</h1>
      <CreateUserForm createUserAction={createUserAction} />

      <ErrorBoundary
        fallbackRender={e => (
          <div className='text-red-500'>
            Something went wrong: {JSON.stringify(e)}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading users...</div>}>
          <UsersList
            useUsersList={useUsersList}
            deleteUserAction={deleteUserAction}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
