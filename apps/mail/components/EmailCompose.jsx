const { useState } = React
import { mailService } from '../services/mail.service.js'

export function EmailCompose({ onClose }) {
  const [email, setEmail] = useState(mailService.getEmptyEmail())

  function handleChange({ target }) {
    const { name, value } = target
    setEmail({ ...email, [name]: value })
  }

  function onSendEmail(ev) {
    ev.preventDefault()
    mailService.save(email).then(() => {
      onClose()
    })
  }

  return (
    <div className="email-compose">
      <header>
        <h2>New Message</h2>
        <button onClick={onClose}>X</button>
      </header>
      <form onSubmit={onSendEmail}>
        <div>
          <input
            type="email"
            name="to"
            placeholder="To"
            value={email.to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={email.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name="body"
            placeholder="Body"
            value={email.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
