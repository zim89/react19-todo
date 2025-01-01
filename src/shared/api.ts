export type User = {
  id: string
  email: string
}

export function fetchUsers(): Promise<User[]> {
  return fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(data => data as User[])
}

export function createUser(user: User) {
  return fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json())
}

export function deleteUser(id: string) {
  return fetch(`http://localhost:4000/users/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
}
