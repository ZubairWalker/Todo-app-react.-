import { useState } from 'react'
import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import type { TaskData } from './types'
import './App.css'

const initialTasks: TaskData[] = [
  {
    id: 1,
    description: 'Completed task',
    completed: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    description: 'Editing task',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 3,
    description: 'Active task',
    completed: false,
    createdAt: new Date(),
  },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)

  const addTask = (description: string) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), description, completed: false, createdAt: new Date() },
    ])
  }

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const editTask = (id: number, description: string) => {
    const trimmedDescription = description.trim()

    if (trimmedDescription) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, description: trimmedDescription } : task,
        ),
      )
    }

    setEditingTaskId(null)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          editingTaskId={editingTaskId}
          onTaskToggle={toggleTask}
          onTaskDelete={deleteTask}
          onTaskEditStart={setEditingTaskId}
          onTaskEditSave={editTask}
          onTaskEditCancel={() => setEditingTaskId(null)}
        />
        <Footer tasks={tasks} />
      </section>
    </section>
  )
}

export default App
