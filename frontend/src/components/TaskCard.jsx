const fmtDate = (iso) => {
    if (!iso) return "—";
    try {
        return new Date(iso).toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
        });
    } catch { return iso; }
};

export default function TaskCard({ task, isSelected, onSelect, onToggleDone, onEdit, onDelete }) {
    const isDone = task.status === "done";
    const isLate = task.status === "late";

    return (
        <div
            className={`task-card ${task.status}${isSelected ? " selected" : ""}`}
            onClick={() => onSelect(task.task_id)}
        >
            <div className="tc-titlebar">
                <button
                    className="wb wb-min"
                    title={isDone ? "Mark ongoing" : "Mark done"}
                    style={isDone ? { color: "#3e586c" } : {}}
                    onClick={(e) => { e.stopPropagation(); onToggleDone(task.task_id); }}
                >▽</button>

                <button
                    className="wb wb-max"
                    title="Edit"
                    style={isDone ? { color: "#3e586c" } : {}}
                    onClick={(e) => { e.stopPropagation(); onEdit(task.task_id); }}
                >◇</button>

                <span className="tc-title">{task.title}</span>

                <button
                    className="wb wb-close"
                    title="Delete"
                    onClick={(e) => { e.stopPropagation(); onDelete(task.task_id); }}
                >✕</button>
            </div>

            <div className="tc-body">
                <div className="tc-meta">
                    <span>Deadline: {fmtDate(task.deadline)}</span>
                    <span className={`s-${task.status}`}>{task.status}</span>
                </div>
            </div>
        </div>
    );
}
