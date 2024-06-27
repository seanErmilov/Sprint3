const { Link } = ReactRouterDOM

import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul className='note-list'>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => (
            <Link to={`/note/edit/${note.id}`}>
              Edit{console.log('itsdone')}
            </Link>
          )}
        >
          <NotePreview note={note} />
          <section>
            <button onClick={() => onRemoveNote(note.id)}>Remove</button>
            <button>
              pin
              {/* <Link to={`/note/${note.id}`}>Details</Link> */}
            </button>
            <button>
              mail
              {/* <Link to={`/note/edit/${note.id}`}>Edit</Link> */}
            </button>
            <button>bcColor</button>
            <button>copy</button>
          </section>
        </li>
      ))}
    </ul>
  )
}
