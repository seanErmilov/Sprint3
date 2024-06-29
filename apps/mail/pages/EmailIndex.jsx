const { useState, useEffect } = React;
import { mailService } from "../services/mail.service.js"
import { EmailList } from "../components/EmailList.jsx"
import { EmailFilter } from "../components/EmailFilter.jsx"
import { EmailDetails } from "../components/EmailDetails.jsx"
import { EmailCompose } from "../components/EmailCompose.jsx"
import { EmailFolderList } from "../components/EmailFolderList.jsx"

export function EmailIndex() {
  const [allEmails, setAllEmails] = useState([])
  const [emails, setEmails] = useState([])
  const [selectedFolder, setSelectedFolder] = useState("inbox")
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  console.log("filterBy", filterBy);

  useEffect(() => {
    loadEmails();
  }, [selectedFolder, filterBy])

  function loadEmails() {
    mailService
      .query({ ...filterBy, folder: selectedFolder })
      .then((emails) => {
        return setEmails(emails)
      })
      .catch((err) => {
        console.log("Error loading emails:", err)
      });

    mailService
      .query()
      .then((emails) => {
        return setAllEmails(emails)
      })
      .catch((err) => {
        console.log("Error loading emails:", err)
      });
  }

  async function onRemoveEmail(emailId) {
    try {
      await mailService.remove(emailId)
      loadEmails();
      setSelectedEmailId(null);
    } catch (err) {
      console.log("Problems removing email:", err)
    }
  }

  function onSetFilter(newFilter) {
    setFilterBy(newFilter);
  }

  function onFolderChange(folder) {
    setSelectedFolder(folder);
    setSelectedEmailId(null);
  }

  async function onSelectEmailId(emailId) {
    setSelectedEmailId(emailId);
    await mailService.markAsRead(emailId)
    loadEmails();
  }

  async function handleStarClick(emailId) {
    await mailService.toggleStar(emailId)
    loadEmails();
  }

  if (!emails) return <div>Loading...</div>;

  return (
    <section className="email-index">
      <div>
        <button
          className="new-email-button"
          onClick={() => setIsComposing(true)}
        >
          <i className="fa-sharp fa-solid fa-pen"></i>
          New Email
        </button>
        <EmailFolderList
          onFolderChange={onFolderChange}
          emails={allEmails}
          selectedFolder={selectedFolder}
        />
      </div>
      <div className="main">
        {!selectedEmailId && (
          <React.Fragment>
            <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <EmailList
              emails={emails}
              onRemoveEmail={onRemoveEmail}
              onSelectEmailId={onSelectEmailId}
              handleStarClick={handleStarClick}
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

        {isComposing && <EmailCompose onClose={() => setIsComposing(false)} />}
      </div>
    </section>
  )
}
