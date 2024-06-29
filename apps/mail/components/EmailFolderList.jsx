
import { mailService } from "../services/mail.service.js"

const FOLDERS = ["inbox", "starred", "sent", "trash", "draft"]
const FOLDER_ICONS = {
  inbox: "fa-inbox",
  starred: "fa-star",
  sent: "fa-paper-plane",
  trash: "fa-trash",
  draft: "fa-file",
};

const FolderItem = ({
  folderName,
  onFolderChange,
  unreadCount,
  isSelected,
}) => {
  return (
    <button
      className={"folder-button" + (isSelected ? " selected" : "")}
      onClick={() => onFolderChange(folderName)}
    >
      <i className={`fa-solid ${FOLDER_ICONS[folderName]}`}></i>
      <span>{folderName.charAt(0).toUpperCase() + folderName.slice(1)}</span>
      <span>{unreadCount}</span>
    </button>
  )
}

export function EmailFolderList({ onFolderChange, emails, selectedFolder }) {
  const unreadCount = mailService.getUnreadCount(emails);
  return (
    <section className="email-folder-list">
      {FOLDERS.map((folderName) => (
        <FolderItem
          key={folderName}
          folderName={folderName}
          onFolderChange={onFolderChange}
          unreadCount={unreadCount[folderName]}
          isSelected={selectedFolder === folderName}
        />
      ))}
    </section>
  )
}
