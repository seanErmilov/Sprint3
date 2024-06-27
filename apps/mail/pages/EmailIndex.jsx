const { useState, useEffect } = React
import { EmailList } from '../cmps/EmailList.jsx'
import { mailService } from '../services/mail.service.js'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailDetails } from '../cmps/EmailDetails.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

export function EmailIndex() {
  const [emails, setEmails] = useState([])
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [selectedEmailId, setSelectedEmailId] = useState(null)
  const [isComposing, setIsComposing] = useState(false)

  useEffect(() => {
    loadEmails()
  }, [filterBy])

  function loadEmails() {
    mailService
      .query(filterBy)
      .then((emails) => setEmails(emails))
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function onRemoveEmail(emailId) {
    mailService
      .remove(emailId)
      .then(() => {
        setEmails((emails) => emails.filter((email) => email.id !== emailId))
        setSelectedEmailId(null)
      })
      .catch((err) => {
        console.log('Problems removing email:', err)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onSelectEmailId(emailId) {
    setSelectedEmailId(emailId)
  }

  if (!emails) return <div>Loading...</div>

  return (
    <section className="email-index">
      {!selectedEmailId && (
        <React.Fragment>
          <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          <button onClick={() => setIsComposing(true)}>New Email</button>
          <EmailList
            emails={emails}
            onRemoveEmail={onRemoveEmail}
            onSelectEmailId={onSelectEmailId}
          />
        </React.Fragment>
      )}

      {selectedEmailId && (
        <EmailDetails
          onBack={() => setSelectedEmailId(null)}
          emailId={selectedEmailId}
          onRemoveEmail={onRemoveEmail}
        />
      )}

      {isComposing && (
        <EmailCompose onClose={() => setIsComposing(false)} />
      )}
    </section>
  )
}
