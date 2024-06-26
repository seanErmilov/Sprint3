import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
    // setSearchParams(filterBy)
  }, [])

  //end result should be more like this

  //   useEffect(() => {
  //     loadNotes()
  //     setSearchParams(filterBy)
  // }, [filterBy])

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((notes) => notes.filter((note) => note.id !== noteId))
        showSuccessMsg(`Note (${noteId}) removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing note:', err)
        showErrorMsg(`Having problems removing note!`)
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
      <input placeholder="what's on your mind" type='text' />
      {/* <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
      <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>
  )
}
