export type TaskData = {
  id: number
  description: string
  completed: boolean
  createdAt: Date
}

export type TaskFilter = 'all' | 'active' | 'completed'
