import type { TaskData } from '../types'

type TaskProps = {
  task: TaskData
  isEditing?: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEditStart: (id: number) => void
  onEditSave: (id: number, description: string) => void
  onEditCancel: () => void
}

function Task({
  task,
  isEditing = false,
  onToggle,
  onDelete,
  onEditStart,
  onEditSave,
  onEditCancel,
}: TaskProps) {
  const className = [task.completed && 'completed', isEditing && 'editing']
    .filter(Boolean)
    .join(' ')

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label>
          <span className="description">{task.description}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          aria-label="Edit task"
          onClick={() => onEditStart(task.id)}
        >
          ✎
        </button>
        <button
          className="icon icon-destroy"
          type="button"
          aria-label="Delete task"
          onClick={() => onDelete(task.id)}
        >
          ×
        </button>
      </div>
      {isEditing && (
        <input
          className="edit"
          defaultValue={task.description}
          autoFocus
          onBlur={(event) => onEditSave(task.id, event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.currentTarget.blur()
            if (event.key === 'Escape') onEditCancel()
          }}
        />
      )}
    </li>
  )
}

export default Task
