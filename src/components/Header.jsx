import React from "react"

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

export default Header
