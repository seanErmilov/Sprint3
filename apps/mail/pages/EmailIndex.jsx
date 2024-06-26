const { useState, useEffect } = React

import { EmailList } from '../cmps/EmailList.jsx'
import { mailService } from '../cmps/EmailList.jsx'

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

  return (
    <section className='email-index'>
      <EmailList email={emails} />
    </section>
  )
}
