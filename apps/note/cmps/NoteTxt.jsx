export function NoteTxt(props) {
  const { info } = props
  const { txt } = info
  return <div className='note-txt'>{txt}</div>
}
