import Task from './Task'
import type { TaskData } from '../types'

type TaskListProps = {
  tasks?: TaskData[]
  editingTaskId?: number | null
  onTaskToggle?: (id: number) => void
  onTaskDelete?: (id: number) => void
  onTaskEditStart?: (id: number) => void
  onTaskEditSave?: (id: number, description: string) => void
  onTaskEditCancel?: () => void
}

function TaskList({
  tasks = [],
  editingTaskId = null,
  onTaskToggle = () => {},
  onTaskDelete = () => {},
  onTaskEditStart = () => {},
  onTaskEditSave = () => {},
  onTaskEditCancel = () => {},
}: TaskListProps) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          isEditing={task.id === editingTaskId}
          onToggle={onTaskToggle}
          onDelete={onTaskDelete}
          onEditStart={onTaskEditStart}
          onEditSave={onTaskEditSave}
          onEditCancel={onTaskEditCancel}
        />
      ))}
    </ul>
  )
}

export default TaskList
