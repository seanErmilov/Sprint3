import { utilService } from '../../../services/util.service.js'

import { mailService } from '../services/mail.service.js'

export function EmailPreview({ email }) {
  return (
    <div className='email-preview'>
      <h3>{email.subject}</h3>
      <p>{email.body}</p>
      <small>{new Date(email.createAt).toLocaleString()}</small>
    </div>
  )
}
