import { useState } from "react";

const fmtDeadline = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
};

export default function DetailPanel({ task, mode, form, onChange, onSave, onCancel, onStartEdit, onClose }) {
    const [deadlineErr, setDeadlineErr] = useState("");
    const set = (key, val) => { if (key === "deadline") setDeadlineErr(""); onChange(key, val); };
    const isEdit = mode === "edit" || mode === "create";

    if (!mode) return (
        <div className="detail-panel">
            <div className="dp-titlebar"><span className="dp-title">—</span></div>
            <div className="dp-empty"><em>Select a task to view details.</em></div>
        </div>
    );

    const handleSave = () => {
        if (!form.deadline) { setDeadlineErr("Procrastinating is a bad habit, you know. Set a deadline already."); return; }
        setDeadlineErr("");
        onSave();
    };

    return (
        <div className="detail-panel">
            <div className="dp-titlebar">
                <span className="dp-title">
                    {mode === "create" ? "New Task" : task?.title}
                </span>
                <button className="dp-close-btn" onClick={onClose}>✕</button>
            </div>
            <div className="dp-body">
                {/* title */}
                <div className="field">
                    <div className="field-label">Title</div>
                    {isEdit
                        ? <input className="field-input" value={form.title ?? ""} onChange={e => set("title", e.target.value)} />
                        : <div className="field-value">{task?.title || "—"}</div>}
                </div>
                {/* description */}
                <div className="field">
                    <div className="field-label">Description</div>
                    {isEdit
                        ? <textarea className="field-textarea" value={form.content ?? ""} onChange={e => set("content", e.target.value)} />
                        : <div className="field-value">{task?.content || "—"}</div>}
                </div>
                {/* deadline */}
                <div className="field">
                    <div className="field-label">Deadline</div>
                    {isEdit
                        ? <>
                            <input className="field-input" type="datetime-local" value={form.deadline?.slice(0, 16) ?? ""} onChange={e => set("deadline", e.target.value)} />
                            {deadlineErr && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "#862222", marginTop: "4px" }}>{deadlineErr}</div>}
                        </>
                        : <div className="field-value">{fmtDeadline(task?.deadline)}</div>}
                </div>
                {/* status — only in edit, not create */}
                {mode === "edit" && (
                    <div className="field">
                        <div className="field-label">Status</div>
                        <select className="status-select" value={form.status} onChange={e => set("status", e.target.value)}>
                            <option value="ongoing">ongoing</option>
                            <option value="done">done</option>
                            <option value="late">late</option>
                        </select>
                    </div>
                )}
                {/* timestamps — view only */}
                {mode === "view" && <>
                    <div className="field">
                        <div className="field-label">Created</div>
                        <div className="field-value">{fmtDeadline(new Date(task.created_at))}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Last edited</div>
                        <div className="field-value">{fmtDeadline(new Date(task.updated_at))}</div>
                    </div>
                </>}
                <div className="dp-actions">
                    {isEdit
                        ? <>
                            <button className="act-btn primary" onClick={handleSave}>Save</button>
                            <button className="act-btn" onClick={onCancel}>Cancel</button>
                        </>
                        : <button className="act-btn" onClick={onStartEdit}>Edit</button>
                    }
                </div>
            </div>
        </div>
    );
}