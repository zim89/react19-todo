export type Task = {
  id: string
  userId: string
  title: string
  done: boolean
  createdAt: number
}

export type PaginatedResponse<T> = {
  data: T[]
  first: number
  items: number
  last: number
  next: string | null
  pages: number
  prev: string | null
}

export function fetchTasks({
  page = 1,
  per_page = 10,
  sort = { createdAt: 'asc' },
  filters,
}: {
  page?: number
  per_page?: number
  filters?: {
    userId?: string
  }
  sort?: {
    createdAt: 'asc' | 'desc'
  }
}) {
  return fetch(
    `http://localhost:4000/tasks?_page=${page}&_per_page=${per_page}&_sort=${
      sort.createdAt === 'asc' ? 'createdAt' : '-createdAt'
    }&userId=${filters?.userId}`,
  ).then(res => res.json() as Promise<PaginatedResponse<Task>>)
}

export function createTask(task: Omit<Task, 'id' | 'createdAt'>) {
  return fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(res => res.json())
}

export function updateTask(id: string, task: Partial<Task>) {
  return fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(res => res.json())
}

export function deleteTask(id: string) {
  return fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
}
