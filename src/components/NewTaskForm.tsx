import { useState } from 'react'

type NewTaskFormProps = {
  onTaskAdded: (description: string) => void
}

function NewTaskForm({ onTaskAdded }: NewTaskFormProps) {
  const [description, setDescription] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedDescription = description.trim()

    if (!trimmedDescription) return

    onTaskAdded(trimmedDescription)
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  )
}

export default NewTaskForm
