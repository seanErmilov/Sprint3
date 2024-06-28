import { mailService } from '../services/mail.service.js'

const { useEffect, useState } = React

export function EmailDetails({ emailId, onBack, onRemoveEmail }) {
  const [email, setEmail] = useState(null)

  useEffect(() => {
    mailService.get(emailId).then((email) => setEmail(email))
  }, [emailId])

  function handleDelete() {
    onRemoveEmail(email.id)
    onBack()
  }

  if (!email) return <div>Loading...</div>
  return (
    <section className='email-details'>
      <div className='email-details-header'>
        <span className='email-from'>{email.from}</span>
        <span className='email-date'>
          {new Date(email.createdAt).toLocaleString()}
        </span>
      </div>
      <div className='email-subject'>{email.subject}</div>
      <div className='email-body'>{email.body}</div>
      <button onClick={onBack}>Back</button>
      <button onClick={handleDelete}>
      <i className="fa-solid fa-trash-can"></i>
      </button>
    </section>
  )
}
