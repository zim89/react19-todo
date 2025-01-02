import { use } from 'react'
import { TaskCard } from './task-card'
import type { Task } from '@/shared/task.api'

export function TasksList({
  tasksPromise,
  refetchTasks,
}: {
  tasksPromise: Promise<Task[]>
  refetchTasks: () => void
}) {
  const tasks = use(tasksPromise)

  return (
    <div className='flex flex-col'>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} refetchTasks={refetchTasks} />
      ))}
    </div>
  )
}
