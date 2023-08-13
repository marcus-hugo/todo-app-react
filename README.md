# Todo App - Frontend Mentor Challenge

## Goals

- Add new todos to the list
- Mark todos as completed
- Delete todos from the list
- Clear all completed todos
- Filter by all/active/complete todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

## UI/UX Features

## Solutions & Problems Solved

- Delete current todo. Seems like magic!

  ```js
  setTodos(prev => prev.filter(t => t.id != todo.id))
  ```

- Get current item when clicked.

  ```js
  const currentClicked = todos.filter(t => t.id == todo.id)
  ```

- Updating object properties in an array. Copy the previous props with the spread operator, then update the isCompleted prop from the click event. This will update state and local storage and render the checkbox as checked on render or reload.

  ```js
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
  ```

- Filtering todos with `.filter()`, based on React docs, say to use `useMemo` for performance only. My solution seems to work fine so far. Create a new array from `todos` array and save it in a variable named `filteredTodos`, then return those todos matching conditions based on which button/tab is selected.

  ```js
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
  ```

  Then render the `filteredTodos`.

  ```js
  {
    filteredTodos.map(todo => <ListItem todo={todo} todos={todos} id={todo.id} key={todo.id} setTodos={setTodos} isLeft={isLeft} />)
  }
  ```

  Updating the checked property from the click event.

  ```js
  <input className="display__li-input" type="checkbox" onChange={handleChange} checked={todo.isCompleted} />
  ```

## References

- React Docs

## Accessiblity
