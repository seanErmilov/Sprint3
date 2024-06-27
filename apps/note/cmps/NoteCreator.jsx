const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'

export function NoteCreator({ onSaveNote }) {
  const [note, setNote] = useState(noteService.getEmptyNote())

  useEffect(() => {}, [])

  function handleSave(ev) {
    ev.preventDefault()
    onSaveNote(note)
    setNote(noteService.getEmptyNote())
  }

  function onSetNoteTodos() {
    setNote((prevNote) => ({
      ...prevNote,
      type: 'NoteTodos',
      info: {
        title: prevNote.info.title,
        todos: [{ txt: '', doneAt: null }],
      },
    }))
  }

  function onSetImg() {
    setNote((prevNote) => ({
      ...prevNote,
      type: 'NoteImg',
      info: {
        title: '',
        imgUrl: '',
      },
    }))
  }

  function onSetPined() {
    setNote((prevNote) => ({
      ...prevNote,
      isPinned: !prevNote.isPinned,
    }))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (note.type === 'NoteTodos' && field === 'todos') {
      value = value.split(',').map((txt) => ({ txt: txt.trim(), doneAt: null }))
    }

    setNote((prevNote) => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        [field]: value,
      },
    }))
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setNote((prevNote) => ({
        ...prevNote,
        info: {
          ...prevNote.info,
          imgUrl: reader.result,
        },
      }))
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  if (!note) return <div>Loading...</div>

  const { title } = note.info
  const noteImgUrl = note.info.imgUrl
  const { isPinned, type } = note

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

        {type === 'NoteTxt' && (
          <input
            placeholder='Take a note...'
            onChange={handleChange}
            type='text'
            value={note.info.txt}
            name='txt'
            id='txt'
          />
        )}
        {type === 'NoteTodos' && (
          <input
            placeholder='todos separated by ,'
            onChange={handleChange}
            type='text'
            name='todos'
            id='todos'
          />
        )}
        {type === 'NoteImg' && (
          <div>
            <input
              type='file'
              onChange={handleFileChange}
              name='img'
              id='img'
            />
            {noteImgUrl && (
              <img src={noteImgUrl} alt='Uploaded' style={{ width: '100px' }} />
            )}
          </div>
        )}
        <div className='note-creator-buttons'>
          <button name='pin' type='button' onClick={onSetPined}>
            <img src='../../../assets/img/icon/pin.svg' alt='Pin' />
          </button>
          <button type='button' onClick={onSetNoteTodos}>
            <img src='../../../assets/img/icon/check-note.svg' alt='Pin' />
          </button>
          <button type='button' onClick={onSetImg}>
            <img src='../../../assets/img/icon/img-icon.svg' alt='Pin' />
          </button>
          <button>
            {' '}
            <img src='../../../assets/img/icon/done.svg' alt='Pin' />
          </button>
        </div>
      </form>
    </section>
  )
}
