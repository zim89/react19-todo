import { createUser } from '@/shared/api'
import { useState, useTransition } from 'react'

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await createUser({ email, id: crypto.randomUUID() })
      refetchUsers()
      setEmail('')
    })
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input
        value={email}
        disabled={isPending}
        onChange={e => setEmail(e.target.value)}
        type='email'
        className='rounded-md border p-2'
      />
      <button
        disabled={isPending}
        type='submit'
        className='rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400'
      >
        Add
      </button>
    </form>
  )
}
