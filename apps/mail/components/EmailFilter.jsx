const { useState, useEffect } = React

const SearchBar = ({ onSetFilter }) => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    onSetFilter(searchTerm)
  }, [searchTerm])

  return (
    <div className="search-bar">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(ev) => setSearchTerm(ev.target.value)}
      />
    </div>
  )
}

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case "number":
      case "range":
        value = +value
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const handleSearchChange = (value) => {
    const txt = value
    setFilterByToEdit({ ...filterByToEdit, txt })
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  function handleUnreadClick() {
    setFilterByToEdit({
      ...filterByToEdit,
      isRead: filterBy.isRead === false ? undefined : false,
    })
  }

  const { txt, isRead, isStarred, folder } = filterByToEdit

  return (
    <section className="email-filter">
      <form onSubmit={onSubmitFilter}>
        <SearchBar onSetFilter={handleSearchChange} />
        <button
          onClick={handleUnreadClick}
          className={"button" + (filterBy.isRead === false ? " active" : "")}
        >
          Unread
        </button>
      </form>
    </section>
  )
}
