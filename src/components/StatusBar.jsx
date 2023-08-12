function StatusBar({ isLeft, setTodos }) {
  function handleClick() {
    setTodos(prev =>
      prev.filter(t => {
        return t.isCompleted === false
      })
    )
  }

  return (
    <div className="status-bar">
      <p className="status-bar__text">{isLeft} items left</p>
      <button onClick={handleClick} className="status-bar__btn">
        Clear Completed
      </button>
    </div>
  )
}

export default StatusBar
