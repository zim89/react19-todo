import { createUser, deleteUser } from '@/shared/api'

type CreateActionState = {
  email: string
  error?: string
}

export function createUserAction({
  refetchUsers,
}: {
  refetchUsers: () => void
}) {
  return async (
    _: CreateActionState,
    formData: FormData,
  ): Promise<CreateActionState> => {
    const email = formData.get('email') as string

    if (email.length === 0) {
      return {
        email,
        error: 'Email is required',
      }
    }

    try {
      await createUser({ email, id: crypto.randomUUID() })
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

export function deleteUserAction({
  id,
  refetchUsers,
}: {
  id: string
  refetchUsers: () => void
}) {
  return async (): Promise<DeleteActionState> => {
    try {
      await deleteUser(id)
      refetchUsers()
      return {}
    } catch (e) {
      return { error: 'Error while deleting user' }
    }
  }
}
