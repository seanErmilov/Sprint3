const { useState, useEffect } = React

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { txt, isRead, isStared } = filterByToEdit

  return (
    <section className='email-filter'>
      <h2>Filter Emails</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor='txt'>Search</label>
        <input
          value={txt}
          onChange={handleChange}
          name='txt'
          type='text'
          id='txt'
        />

        <label htmlFor='isRead'>Read</label>
        <input
          checked={isRead || false}
          onChange={handleChange}
          name='isRead'
          type='checkbox'
          id='isRead'
        />

        <label htmlFor='isStared'>Stared</label>
        <input
          checked={isStared || false}
          onChange={handleChange}
          name='isStared'
          type='checkbox'
          id='isStared'
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
