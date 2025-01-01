import { useActionState } from 'react'
import { createUserAction } from '../actions'

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [state, dispatch, isPending] = useActionState(
    createUserAction({ refetchUsers }),
    { email: '' },
  )

  return (
    <form className='flex gap-2' action={dispatch}>
      <input
        type='email'
        name='email'
        defaultValue={state.email}
        className='rounded-md border p-2'
        disabled={isPending}
      />
      <button
        disabled={isPending}
        type='submit'
        className='rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400'
      >
        Add
      </button>

      {state.error && <div className='text-red-500'>{state.error}</div>}
    </form>
  )
}
