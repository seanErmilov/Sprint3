import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteAudio } from './NoteAudio.jsx'
export function NotePreview({ note }) {
  const { info, isPinned, style, createdAt, id, type } = note

  switch (note.type) {
    case 'NoteTxt':
      return <NoteTxt {...note} />
    case 'NoteImg':
      return <NoteImg {...note} />
    case 'NoteTodos':
      return <NoteTodos {...note} />
    default:
      null
  }
}

function NoteDynamicCom(prop) {}
