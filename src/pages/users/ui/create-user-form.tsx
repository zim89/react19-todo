import { createUser } from '@/shared/api'
import { useState } from 'react'

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createUser({ email, id: crypto.randomUUID() })
    refetchUsers()
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type='email'
        className='rounded-md border p-2'
      />
      <button
        type='submit'
        className='rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      >
        Add
      </button>
    </form>
  )
}
