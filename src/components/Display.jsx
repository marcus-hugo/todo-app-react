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
              <label className="display__li-input-label" htmlFor={"toggle-" + todo.todo}>
                {todo.isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1" />
                    <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_144)" />
                    <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2" />
                    <defs>
                      <linearGradient id="paint0_linear_0_144" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#009FC7" />
                        <stop offset="1" stop-color="#870EC4" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11.5" stroke="url(#paint0_linear_0_155)" />
                    <g opacity="0.01">
                      <circle cx="12" cy="12" r="12" fill="url(#paint1_linear_0_155)" />
                      <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_0_155" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#009FC7" />
                        <stop offset="1" stop-color="#C058F3" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_0_155" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#009FC7" />
                        <stop offset="1" stop-color="#870EC4" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                <input className="display__li-input" type="checkbox" onChange={e => handleCheck(e, todo)} checked={todo.isCompleted} id={"toggle-" + todo.todo} aria-label={"Toggles " + todo.todo + " todo as completed"} />
              </label>

              <p className="display__li-text">{todo.todo}</p>
            </div>

            <button onClick={e => deleteItem(todo)} className="display__li-btn-delete" aria-label={"Delete " + todo.todo + " todo"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path className="close-x" fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#5B5E7E" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <StatusBar isLeft={isLeft} setTodos={setTodos} />
    </div>
  )
}

export default Display
