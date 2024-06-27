export function NoteTodos({ info }) {
  const { todos, title } = info
  return (
    <div className='note-todos'>
      <div className='note-title'>{title}</div>
      <ul className='note-list'>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo.txt}</li>
        ))}
      </ul>
    </div>
  )
}
