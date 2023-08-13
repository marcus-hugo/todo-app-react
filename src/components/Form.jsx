// Form Component
function Form({ handleSubmit, item, setItem }) {
  return (
    <form onSubmit={handleSubmit} className="form" action="">
      <label htmlFor="new-todo"></label>
      <input value={item} onChange={e => setItem(e.target.value)} className="form__input" type="text" placeholder="Create a new todo..." id="new-todo" />
      <button className="form__btn" type="submit">
        Add Todo
      </button>
    </form>
  )
}

export default Form
