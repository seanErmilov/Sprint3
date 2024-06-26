// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
  getFilterFromSearchParams,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regExp.test(note.vendor))
    }
    if (filterBy.minSpeed) {
      notes = notes.filter((note) => note.speed >= filterBy.minSpeed)
    }
    return notes
  })
}

function get(noteId) {
  return storageService
    .get(NOTE_KEY, noteId)
    .then((note) => _setNextPrevNoteId(note))
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote() {
  return {
    id: '',
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: { backgroundColor: '#00d' },
    info: { txt: '', title: '' },
  }
}

function getDefaultFilter() {
  return { txt: '', minSpeed: '' }
}

function getFilterFromSearchParams(searchParams) {
  // return Object.fromEntries(searchParams)
  const txt = searchParams.get('txt') || ''
  const minSpeed = searchParams.get('minSpeed') || ''
  return {
    txt,
    minSpeed,
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
          imgUrl:
            'https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
          title: 'Bobi and Me',
        },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        createdAt: 1112225,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#0d0' },
        info: { txt: 'Learning JavaScript' },
      },
      {
        id: 'n105',
        createdAt: 1112226,
        type: 'NoteImg',
        isPinned: true,
        info: {
          imgUrl:
            'https://images.unsplash.com/photo-1603398938378-7d2f6b5a3b7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2NlbmljfGVufDB8fDB8fHww',
          title: 'Nature Bliss',
        },
        style: { backgroundColor: '#0d0' },
      },
      {
        id: 'n106',
        createdAt: 1112227,
        type: 'NoteTodos',
        isPinned: true,
        info: {
          title: 'Project Tasks',
          todos: [
            { txt: 'Complete UI design', doneAt: null },
            { txt: 'Setup backend server', doneAt: 187222222 },
            { txt: 'Deploy application', doneAt: null },
          ],
        },
      },
      {
        id: 'n107',
        createdAt: 1112228,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#d00' },
        info: { txt: 'Shopping List' },
      },
      {
        id: 'n108',
        createdAt: 1112229,
        type: 'NoteImg',
        isPinned: false,
        info: {
          imgUrl:
            'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
          title: 'Delicious Meals',
        },
        style: { backgroundColor: '#d00' },
      },
      {
        id: 'n109',
        createdAt: 1112230,
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Workout Routine',
          todos: [
            { txt: 'Morning run', doneAt: null },
            { txt: 'Gym session', doneAt: 187333333 },
          ],
        },
      },
      {
        id: 'n110',
        createdAt: 1112231,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Meeting Notes' },
      },
    ]

    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function _createNote(vendor, speed = 250) {
  const note = getEmptyNote(vendor, speed)
  note.id = utilService.makeId()
  return note
}

function _setNextPrevNoteId(note) {
  return storageService.query(NOTE_KEY).then((notes) => {
    const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
    const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
    const prevNote = notes[noteIdx - 1]
      ? notes[noteIdx - 1]
      : notes[notes.length - 1]
    note.nextNoteId = nextNote.id
    note.prevNoteId = prevNote.id
    return note
  })
}
