function Filter({ setTab }) {
  return (
    <div className="filter">
      <button onClick={() => setTab("all")} className="filter__btn">
        All
      </button>
      <button onClick={() => setTab("active")} className="filter__btn">
        Active
      </button>
      <button onClick={() => setTab("completed")} className="filter__btn">
        Completed
      </button>
    </div>
  )
}

export default Filter
