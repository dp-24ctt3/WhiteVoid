import TaskCard from "./TaskCard";

const sortOrder = { late: 0, ongoing: 1, done: 2 };

export default function TaskList({ tasks, selectedId, loading, onSelect, onToggleDone, onEdit, onDelete, onAdd }) {
    const sorted = [...tasks].sort((a, b) => (sortOrder[a.status] ?? 1) - (sortOrder[b.status] ?? 1));

    return (
        <div className="task-col">
            <div className="task-header">
                <span className="task-label"></span>
                <button className="add-btn" title="New task" onClick={onAdd}>+</button>
            </div>

            <div className="task-scroll">
                {loading ? (
                    <div className="empty-state"><em>Loading tasks…</em></div>
                ) : tasks.length === 0 ? (
                    <div className="empty-state"><em>…and the Void stares back.</em></div>
                ) : (
                    sorted.map(task => (
                        <TaskCard
                            key={task.task_id}
                            task={task}
                            isSelected={selectedId === task.task_id}
                            onSelect={onSelect}
                            onToggleDone={onToggleDone}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
