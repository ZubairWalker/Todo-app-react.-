import TasksFilter from './TasksFilter'
import type { TaskData, TaskFilter } from '../types'

type FooterProps = {
  tasks?: TaskData[]
  filter?: TaskFilter
  onFilterChange?: (filter: TaskFilter) => void
  onClearCompleted?: () => void
}

function Footer({
  tasks = [],
  filter = 'all',
  onFilterChange = () => {},
  onClearCompleted = () => {},
}: FooterProps) {
  const activeTasks = tasks.filter((task) => !task.completed).length

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button
        className="clear-completed"
        type="button"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
