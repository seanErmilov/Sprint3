import { NoteList } from '../cmps/NoteList.jsx'
import { NoteCreator } from '../cmps/NoteCreator.jsx'
import { noteService } from '../services/note.service.js'

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
    document.body.style.backgroundColor = '#f0f0f0'

    return () => {
      document.body.style.backgroundColor = ''
    }
    // setSearchParams(filterBy)
  }, [])

  //end result should be more like this

  //   useEffect(() => {
  //     loadNotes()
  //     setSearchParams(filterBy)
  // }, [filterBy])

  function onRemoveNote(noteId) {
    console.log('noteId :', noteId)
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((notes) => notes.filter((note) => note.id !== noteId))
        console.log(`Note (${noteId}) removed successfully!`)
        showSuccessMsg(`Note (${noteId}) removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing note:', err)
        showErrorMsg(`Having problems removing note!`)
      })
  }
  function onSaveNote(newNote) {
    noteService
      .save(newNote)
      .then(() => {
        showSuccessMsg(`Note saved successfully!`)
        loadNotes() // Reload notes after saving
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function loadNotes() {
    noteService
      .query()
      .then((notes) => {
        setNotes(notes)
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className='note-index'>
      <NoteCreator onSaveNote={onSaveNote} />
      {/* <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
      <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>
  )
}
