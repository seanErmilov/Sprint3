import { utilService } from '../../../services/util.service.js'

import { mailService } from '../services/mail.service.js'

export function EmailPreview({ email }) {
  return (
    <div className='email-preview'>
      <div className='email-preview-header'>
        <span className='email-from'>{email.from}</span>
        <span className='email-date'>
          {new Date(email.createdAt).toLocaleString()}
        </span>
      </div>
      <div className='email-subject'>{email.subject}</div>
      <div className='email-body-snippet'>{email.body.slice(0, 50)}...</div>
    </div>
  )
}
