function Filter({ setTab }) {
  return (
    <div className="filter">
      <button onClick={() => setTab("all")} className="filter__btn" aria-label="View all todos">
        All
      </button>
      <button onClick={() => setTab("active")} className="filter__btn" aria-label="View only active todos">
        Active
      </button>
      <button onClick={() => setTab("completed")} className="filter__btn" aria-label="View only completed todos">
        Completed
      </button>
    </div>
  )
}

export default Filter
