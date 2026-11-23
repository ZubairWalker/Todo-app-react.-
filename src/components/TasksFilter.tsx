import type { TaskFilter } from '../types'

type TasksFilterProps = {
  filter?: TaskFilter
  onFilterChange?: (filter: TaskFilter) => void
}

const filterOptions: { label: string; value: TaskFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

function TasksFilter({
  filter = 'all',
  onFilterChange = () => {},
}: TasksFilterProps) {
  return (
    <ul className="filters">
      {filterOptions.map(({ label, value }) => (
        <li key={value}>
          <button
            className={filter === value ? 'selected' : ''}
            type="button"
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksFilter
