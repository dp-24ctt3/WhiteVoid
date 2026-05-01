export default function CenterPanel({ content, userEmail }) {
    return (
        <div className="center-col">
            {content === "welcome" ? (
                <>
                    <div className="c-title">Welcome!</div>
                    <div className="c-divider" />
                    <div className="c-body">
                        Welcome to <em>White Void</em>, where you create tasks to fill your existence.
                        <br /><br />
                        Signed in as <em>{userEmail}</em>.
                    </div>
                </>
            ) : (
                <>
                    <div className="c-title">Manual</div>
                    <div className="c-divider" />
                    <div className="c-body">
                        <span className="c-icon">▽</span> Mark your task as done.<br /><br />
                        <span className="c-icon">◇</span> Open the task in edit mode.<br /><br />
                        <span className="c-icon">✕</span> Delete permanently.<br /><br />
                        Click a card to view its details. Click again to close. Use <em>+</em> to create a new task.
                    </div>
                </>
            )}
        </div>
    );
}
