import { React, useEffect, useState } from "react"
import useLocalStorage from "use-local-storage"

function App() {
  // Theme
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches // true
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light") // true = 'dark'

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  mql.addEventListener("change", switchTheme)

  // Todos
  const [todos, setTodos] = useLocalStorage("todos", [])
  const [item, setItem] = useState("")
  const [isLeft, setIsLeft] = useState(todos.length)

  useEffect(() => {
    let newLength = todos.length

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted === true) {
        newLength--
      }
    }

    setIsLeft(newLength)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    console.log("new todo added")
    let newTodos = [...todos]
    newTodos.push({ todo: item, id: Date.now(), isCompleted: false })
    setTodos(newTodos)
    setItem("")
  }

  return (
    <div className="app-container" data-theme={theme}>
      <Header theme={theme} switchTheme={switchTheme} />
      <main>
        <div>
          <Form item={item} setItem={setItem} handleSubmit={handleSubmit} />
          <Display todos={todos} setTodos={setTodos} isLeft={isLeft} />
          <Filter />
          <div className="hint">
            <p>Drag and drop to reorder list</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Header Component
function Header({ theme, switchTheme }) {
  return (
    <header className="header">
      <div className="header__inner-container">
        <h1 className="header__title">TODO</h1>
        <div className="toggle-switch-wrapper">
          <img src="/icon-moon.svg" alt="" />

          <label className="toggle-switch" htmlFor="theme-toggle">
            <input onChange={switchTheme} checked={theme === "dark" ? false : true} type="checkbox" className="toggle-switch__input" id="theme-toggle" title="Toggles light and dark" role="switch" aria-checked={theme === "light" ? "true" : "false"} aria-live="polite" />
            <span className="toggle-switch__slider"></span>
          </label>

          <img src="/icon-sun.svg" alt="" />
        </div>
      </div>
    </header>
  )
}

// Form Component
function Form({ handleSubmit, item, setItem }) {
  return (
    <form onSubmit={handleSubmit} className="form" action="">
      <input value={item} onChange={e => setItem(e.target.value)} className="form__input" type="text" placeholder="Create a new todo..." />
      <button className="form__btn" type="submit">
        Add Todo
      </button>
    </form>
  )
}

// Display Componenet
function Display({ todos, setTodos, isLeft }) {
  return (
    <div className="display">
      <ul className="display__ul">
        {todos.map(todo => (
          <ListItem todo={todo} todos={todos} id={todo.id} key={todo.id} setTodos={setTodos} isLeft={isLeft} />
        ))}
      </ul>
      <StatusBar isLeft={isLeft} setTodos={setTodos} />
    </div>
  )
}

// List item Component
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

// Status Bar
function StatusBar({ isLeft, setTodos }) {
  function handleClick() {
    console.log("I got clicked!")

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

// Filter Component
function Filter() {
  return (
    <div className="filter">
      <button className="filter__btn">All</button>
      <button className="filter__btn">Active</button>
      <button className="filter__btn">Completed</button>
    </div>
  )
}

// Footer Compoenet
function Footer() {
  return (
    <footer className="footer">
      <small>
        <p>Challenged by Frontend Mentor</p>
      </small>
      <small>
        <p>Coded by Marcus Hugo</p>
      </small>
    </footer>
  )
}
export default App
