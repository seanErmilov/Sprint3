import { mailService } from '../services/mail.service.js'

export function EmailPreview({ email, onClick, onRemoveEmail }) {
  return (
    <div className='email-preview' onClick={onClick}>
      <div className='email-preview-header'>
        <span className='email-from'>{email.from}</span>
        <span className='email-date'>
          {new Date(email.createdAt).toLocaleString()}
        </span>
        <button className='delete-btn' onClick={(e) => { e.stopPropagation(); onRemoveEmail(email.id); }}>
          Delete
        </button>
      </div>
      <div className='email-subject'>{email.subject}</div>
      <div className='email-body-snippet'>{email.body.slice(0, 50)}...</div>
    </div>
  )
}
