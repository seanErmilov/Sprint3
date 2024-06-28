export function NoteImg(props) {
  const { info } = props
  const { title, imgUrl } = info
  return (
    <div className='note-img'>
      <img src={imgUrl} alt='' />
      <div className='note-title'>{title}</div>
    </div>
  )
}
