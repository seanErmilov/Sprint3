export function NoteTxt(props) {
  const { info } = props
  const { txt, title } = info
  return (
    <div className='note-txt'>
      <div>{title}</div>
      <div>{txt}</div>
    </div>
  )
}
