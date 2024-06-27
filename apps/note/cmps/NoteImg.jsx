export function NoteImg(props) {
  const { info } = props
  const { title, url } = info
  return (
    <div className='note-txt'>
      <div className='note-title'>{title}</div>
      <img src={url} alt='' />
    </div>
  )
}
