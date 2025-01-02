import { createUser, deleteUser, type User } from '@/shared/user.api'

type CreateActionState = {
  email: string
  error?: string
}

export type CreateUserAction = (
  state: CreateActionState,
  formData: FormData,
) => Promise<CreateActionState>

export function createUserAction({
  refetchUsers,
  optimisticCreate,
}: {
  refetchUsers: () => void
  optimisticCreate: (user: User) => void
}): CreateUserAction {
  return async (_, formData) => {
    const email = formData.get('email') as string

    if (email.length === 0) {
      return {
        email,
        error: 'Email is required',
      }
    }

    try {
      const user = { email, id: crypto.randomUUID() }
      optimisticCreate(user)
      await createUser(user)
      refetchUsers()

      return { email: '' }
    } catch (e) {
      return {
        email,
        error: 'Error while creating user',
      }
    }
  }
}

type DeleteActionState = {
  error?: string
}

export type DeleteUserAction = (
  state: DeleteActionState,
  formData: FormData,
) => Promise<DeleteActionState>

export function deleteUserAction({
  refetchUsers,
  optimisticDelete,
}: {
  refetchUsers: () => void
  optimisticDelete: (id: string) => void
}): DeleteUserAction {
  return async (_, formData) => {
    const id = formData.get('id') as string

    try {
      optimisticDelete(id)
      await deleteUser(id)
      refetchUsers()
      return {}
    } catch (e) {
      return { error: 'Error while deleting user' }
    }
  }
}
