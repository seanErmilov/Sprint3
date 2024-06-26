import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails }) {
  console.log('emails', emails)
  if (!emails || emails.length === 0) return <div>No emails found</div>

  return (
    <section className='email-list-container'>
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} />
      ))}
    </section>
  )
}
