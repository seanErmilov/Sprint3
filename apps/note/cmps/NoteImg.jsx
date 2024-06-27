export function NoteImg(props) {
  const { info } = props
  const { title, imgUrl } = info
  return (
    <div className='note-txt'>
      <div className='note-title'>{title}</div>
      <img src={imgUrl} alt='' />
    </div>
  )
}
