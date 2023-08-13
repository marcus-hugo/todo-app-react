function ListItem({ todo, todos, setTodos }) {
  // Delete Item
  function deleteItem() {
    console.log("note deleted")
    setTodos(prev => prev.filter(t => t.id != todo.id))
  }

  function handleChange(e) {
    // get currently clicked item

    const currentClicked = todos.filter(t => t.id == todo.id)
    // update the todos array
    const updatedTodos = todos.map(t => {
      if (t.id === currentClicked[0].id) {
        return {
          ...t,
          isCompleted: e.target.checked
        }
      } else {
        return t
      }
    })

    setTodos(updatedTodos)
  }

  return (
    <li className="display__li">
      <div className="display__li-input-wrapper">
        <input className="display__li-input" type="checkbox" onChange={handleChange} checked={todo.isCompleted} />
        <p className="display__li-text">{todo.todo}</p>
      </div>

      <button onClick={deleteItem} className="display__li-btn-delete">
        X
      </button>
    </li>
  )
}

export default ListItem
