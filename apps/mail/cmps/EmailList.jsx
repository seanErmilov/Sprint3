export function MailList(emails) {
  if (!emails) console.log('didnt found emails')
  return (
    <section className='email-list-container'>
      <div>Emails {emails} </div>
    </section>
  )
}
