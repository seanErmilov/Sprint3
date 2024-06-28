import { mailService } from "../services/mail.service.js";

export function EmailPreview({
  email,
  onClick,
  onRemoveEmail,
  handleStarClick,
}) {
  const readClass = " " + (email.isRead ? "read" : "unread");

  const onStarClick = (e) => {
    e.stopPropagation();
    handleStarClick(email.id);
  };
  return (
    <div className="email-preview" onClick={onClick}>
      <div className="email-preview-header">
        <span className={"email-from" + readClass}>From: {email.from}</span>
        <span className="email-date">
          {new Date(email.createdAt).toLocaleString()}
        </span>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveEmail(email.id);
          }}
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <div className={"email-subject" + readClass}>{email.subject}</div>
      <div className="email-body-snippet">{email.body.slice(0, 50)}...</div>
      <div className="star-container" onClick={onStarClick}>
        {email.isStarred ? (
          <i className="fa-solid fa-star"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </div>
    </div>
  );
}
