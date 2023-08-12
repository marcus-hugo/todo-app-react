import ListItem from "./ListItem"
import StatusBar from "./StatusBar"

function Display({ todos, setTodos, isLeft, tab }) {
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

  return (
    <div className="display">
      <ul className="display__ul">
        {filteredTodos.map(todo => (
          <ListItem todo={todo} todos={todos} id={todo.id} key={todo.id} setTodos={setTodos} isLeft={isLeft} />
        ))}
      </ul>

      {/* <ul className="display__ul">
        {todos.map(todo => (
          <ListItem todo={todo} todos={todos} id={todo.id} key={todo.id} setTodos={setTodos} isLeft={isLeft} />
        ))}
      </ul> */}
      <StatusBar isLeft={isLeft} setTodos={setTodos} />
    </div>
  )
}

export default Display
