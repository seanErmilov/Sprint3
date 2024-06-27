const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'

export function NoteCreator({ onSaveNote }) {
  //   const [note, setNote] = useState(noteService.getEmptyNote())
  const [note, setNote] = useState(noteService.getEmptyNote())
  useEffect(() => {}, [])

  function handleSave(ev) {
    ev.preventDefault()
    onSaveNote(note)
    setNote(noteService.getEmptyNote())
  }
  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'title':
      case 'txt':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setNote((prevNote) => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        [field]: value,
      },
    }))
  }
  if (!note) return <div>Loading...</div>
  const { title, txt } = note.info
  return (
    <section className='note-creator'>
      <form onSubmit={handleSave}>
        <input
          placeholder='Title'
          onChange={handleChange}
          type='text'
          value={title}
          name='title'
          id='title'
        />

        <input
          placeholder='Take a note...'
          onChange={handleChange}
          type='text'
          value={txt}
          name='txt'
          id='txt'
        />

        <button type='button'>pin</button>
        <button type='button'>list</button>
        <button type='button'>img</button>
        <button>Save</button>
      </form>
    </section>
  )
}
