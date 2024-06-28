const { Link } = ReactRouterDOM

import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul className='note-list'>
      {notes.map((note, index) => (
        <li key={note.id} className='note'>
          <NotePreview note={note} />
          <section className='note-buttons'>
            <button onClick={() => onRemoveNote(note.id)}>
              <img
                src='../../../assets/img/icon/pin.svg'
                alt='Trash'
                title='Trash note'
              />
            </button>
            <button>Details</button>
            <button>Edit</button>
          </section>
        </li>
      ))}
    </ul>
  )
}
