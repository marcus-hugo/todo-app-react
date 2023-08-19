import { React, useEffect, useState } from "react"
import useLocalStorage from "use-local-storage"
import Header from "./components/Header"
import Form from "./components/Form"
import Display from "./components/Display"
import Filter from "./components/Filter"
import Footer from "./components/Footer"

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
  const [tab, setTab] = useState("all")

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
    newTodos.push({ todo: item, id: todos.length, isCompleted: false })
    setTodos(newTodos)
    setItem("")
  }

  return (
    <div className="app-container" data-theme={theme}>
      <Header theme={theme} switchTheme={switchTheme} />
      <main>
        <div>
          <Form item={item} setItem={setItem} handleSubmit={handleSubmit} />
          <Display todos={todos} setTodos={setTodos} isLeft={isLeft} tab={tab} setTab={setTab} />
          <Filter tab={tab} setTab={setTab} />
          <div>
            <p className="hint">Drag and drop to reorder List</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
