import { useEffect, useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import type { TaskData } from '../types'

type TaskEditInputProps = {
  initialValue?: string
  onSave?: (value: string) => void
  onCancel?: () => void
}

function TaskEditInput({
  initialValue = '',
  onSave = () => {},
  onCancel = () => {},
}: TaskEditInputProps) {
  const [value, setValue] = useState(initialValue)
  const isCancelledRef = useRef(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const trimmed = value.trim()
      if (trimmed) {
        onSave(trimmed)
      } else {
        onCancel()
      }
    } else if (event.key === 'Escape') {
      isCancelledRef.current = true
      onCancel()
    }
  }

  const handleBlur = () => {
    if (isCancelledRef.current) return
    const trimmed = value.trim()
    if (trimmed) {
      onSave(trimmed)
    } else {
      onCancel()
    }
  }

  return (
    <input
      className="edit"
      value={value}
      autoFocus
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      aria-label="Edit task description"
    />
  )
}

type TaskProps = {
  task: TaskData
  isEditing?: boolean
  onToggle?: (id: number) => void
  onDelete?: (id: number) => void
  onEditStart?: (id: number) => void
  onEditSave?: (id: number, description: string) => void
  onEditCancel?: () => void
}

function Task({
  task,
  isEditing = false,
  onToggle = () => {},
  onDelete = () => {},
  onEditStart = () => {},
  onEditSave = () => {},
  onEditCancel = () => {},
}: TaskProps) {
  const [timeAgo, setTimeAgo] = useState(() =>
    formatDistanceToNow(task.createdAt, {
      includeSeconds: true,
      addSuffix: true,
    }),
  )

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(
        formatDistanceToNow(task.createdAt, {
          includeSeconds: true,
          addSuffix: true,
        }),
      )
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [task.createdAt])

  const className = [task.completed && 'completed', isEditing && 'editing']
    .filter(Boolean)
    .join(' ')

  const toggleInputId = `task-toggle-${task.id}`

  return (
    <li className={className}>
      <div className="view">
        <input
          id={toggleInputId}
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.description}" as ${task.completed ? 'active' : 'completed'}`}
        />
        <label htmlFor={toggleInputId}>
          <span className="description">{task.description}</span>
          <span className="created">{`created ${timeAgo}`}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          aria-label={`Edit task "${task.description}"`}
          onClick={() => onEditStart(task.id)}
        >
          ✎
        </button>
        <button
          className="icon icon-destroy"
          type="button"
          aria-label={`Delete task "${task.description}"`}
          onClick={() => onDelete(task.id)}
        >
          ×
        </button>
      </div>
      {isEditing && (
        <TaskEditInput
          initialValue={task.description}
          onSave={(description) => onEditSave(task.id, description)}
          onCancel={onEditCancel}
        />
      )}
    </li>
  )
}

export default Task
