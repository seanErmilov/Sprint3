import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({
  emails,
  onSelectEmailId,
  onRemoveEmail,
  handleStarClick,
}) {
  if (!emails || emails.length === 0) return <div>No emails found</div>;

  return (
    <section className="email-list-container">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onClick={() => onSelectEmailId(email.id)}
          onRemoveEmail={onRemoveEmail}
          handleStarClick={handleStarClick}
        />
      ))}
    </section>
  );
}
