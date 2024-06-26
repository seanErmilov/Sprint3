const { useState, useEffect } = React

import { EmailList } from '../cmps/EmailList.jsx'
import { mailService } from '../services/mail.service.js'

export function EmailIndex() {
  const [emails, setEmails] = useState([])

  useEffect(() => {
    loadEmails()
  }, [])

  function loadEmails() {
    mailService.query().then((emails) => {
      setEmails(emails)
    })
  }

  if (!emails) return <div>Loading...</div>

  return (
    <section className='email-index'>
      <EmailList emails={emails} />
    </section>
  )
}
