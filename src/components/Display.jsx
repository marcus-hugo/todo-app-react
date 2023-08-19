import { useRef } from "react"
import StatusBar from "./StatusBar"

function Display({ todos, setTodos, isLeft, tab }) {
  function handleCheck(e, todo) {
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

  function deleteItem(todo) {
    console.log("note deleted")
    console.log(todo)
    setTodos(prev => prev.filter(t => t.id != todo.id))
  }

  let filteredTodos
  filteredTodos = todos.filter(t => {
    if (tab === "all") {
      return t
    } else if (tab === "active") {
      return !t.isCompleted
    } else if (tab === "completed") {
      return t.isCompleted
    }
  })

  let dragItem = useRef()
  let dragOverItem = useRef()

  function handleSort() {
    console.log("sorting...")
    let newItems = [...todos]
    const draggedItemContent = newItems.splice(dragItem.current, 1)[0]
    newItems.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTodos(newItems)
  }

  return (
    <div className="display">
      <ul className="display__ul">
        {filteredTodos.map((todo, index) => (
          <li className="display__li" id={index} key={index} draggable onDragStart={e => (dragItem.current = index)} onDragEnter={e => (dragOverItem.current = index)} onDragEnd={handleSort} onDragOver={e => e.preventDefault()}>
            <div className="display__li-input-wrapper">
              <label htmlFor={"toggle-" + todo.todo}></label>
              <input className="display__li-input" type="checkbox" onChange={e => handleCheck(e, todo)} checked={todo.isCompleted} id={"toggle-" + todo.todo} aria-label={"Toggles " + todo.todo + " todo as completed"} />
              <p className="display__li-text">{todo.todo}</p>
            </div>

            <button onClick={e => deleteItem(todo)} className="display__li-btn-delete" aria-label={"Delete " + todo.todo + " todo"}>
              X
            </button>
          </li>
        ))}
      </ul>
      <StatusBar isLeft={isLeft} setTodos={setTodos} />
    </div>
  )
}

export default Display
