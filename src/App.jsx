import { React, useState } from "react"
import useLocalStorage from "use-local-storage"

function App() {
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches // true
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light") // true = 'dark'

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  mql.addEventListener("change", switchTheme)

  return (
    <div className="app-container" data-theme={theme}>
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
      <main>
        <div>
          <form className="form" action="">
            <input className="form__input" type="text" placeholder="Create a new todo..." />
            <button className="form__btn" type="submit">
              Add Todo
            </button>
          </form>
          {/* Display */}
          <div className="display">
            <ul className="display__ul">
              <li className="display__li">
                <div className="display__li-input-wrapper">
                  <input className="display__li-input" type="checkbox" />
                  <p className="strikethrough">Complete online JavaScript course</p>
                </div>

                <button className="display__li-btn-delete">X</button>
              </li>
              <li className="display__li">
                <div className="display__li-input-wrapper">
                  <input className="display__li-input" type="checkbox" />
                  <p>Jog around the park 3x</p>
                </div>

                <button className="display__li-btn-delete">X</button>
              </li>
            </ul>
            <div className="status-bar">
              <p status-bar__text>5 items left</p>
              <button className="status-bar__btn">Clear Completed</button>
            </div>
          </div>
          <div className="filter">
            <button className="filter__btn">All</button>
            <button className="filter__btn">Active</button>
            <button className="filter__btn">Completed</button>
          </div>
          <div className="hint">
            <p>Drag and drop to reorder list</p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <small>
          <p>Challenged by Frontend Mentor</p>
        </small>
        <small>
          <p>Coded by Marcus Hugo</p>
        </small>
      </footer>
    </div>
  )
}

export default App
