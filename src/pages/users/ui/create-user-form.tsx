import { useActionState, useOptimistic, useRef } from 'react'
import { type CreateUserAction } from '../actions'

export function CreateUserForm({
  createUserAction,
}: {
  createUserAction: CreateUserAction
}) {
  const [state, dispatch] = useActionState(createUserAction, {
    email: '',
  })

  const [optimisticState, setOptimisticState] = useOptimistic(state)
  const form = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={form}
      className='flex gap-2'
      action={(formData: FormData) => {
        setOptimisticState({ email: '' })
        dispatch(formData)
        form.current?.reset()
      }}
    >
      <input
        name='email'
        type='email'
        defaultValue={optimisticState.email}
        className='rounded-md border p-2'
      />
      <button
        type='submit'
        className='rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400'
      >
        Add
      </button>

      {optimisticState.error && (
        <div className='text-red-500'>{optimisticState.error}</div>
      )}
    </form>
  )
}
