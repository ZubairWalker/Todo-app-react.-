const filters = ['All', 'Active', 'Completed']

function TasksFilter() {
  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter}>
          <button className={filter === 'All' ? 'selected' : ''} type="button">
            {filter}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksFilter
