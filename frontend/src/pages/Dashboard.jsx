import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/authContext.jsx";
import Taskbar from "../components/Taskbar.jsx";
import CenterPanel from "../components/CenterPanel.jsx";
import TaskList from "../components/TaskList.jsx";
import DetailPanel from "../components/DetailPanel.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks.js";
import { apiFetch } from "../utils/api.js";

export default function Dashboard() {
    const { user } = useAuth();
    const [me, setMe] = useState(null);
    const [error, setError] = useState(null);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [centerContent, setCenterContent] = useState("welcome");

    // detail panel state
    const [selectedId, setSelectedId] = useState(null);
    const [detailMode, setDetailMode] = useState(null); // null | "view" | "edit" | "create"
    const [form, setForm] = useState({});

    // ---------- data ----------
    useEffect(() => {
        Promise.all([getTasks(), apiFetch("/auth/me")])
            .then(([tasks, me]) => {
                setTasks(tasks);
                setMe(me); // pass to Taskbar for the power menu
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // ---------- handlers ----------
    const handleSelect = (id) => {
        if (selectedId === id && detailMode === "view") {
            setSelectedId(null);
            setDetailMode(null);
        } else {
            const t = tasks.find(x => x.task_id === id);
            if (t) { setSelectedId(id); setDetailMode("view"); setForm({ ...t }); }
        }
    };

    const handleToggleDone = async (id) => {
        const task = tasks.find(t => t.task_id === id);
        const newStatus = task.status === "done" ? "ongoing" : "done";
        try {
            const updated = await updateTask(id, task.title, task.content, task.deadline, newStatus);
            setTasks(prev => prev.map(t => t.task_id === id ? updated : t));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (id) => {
        const t = tasks.find(x => x.task_id === id);
        if (t) { setSelectedId(id); setDetailMode("edit"); setForm({ ...t }); }
    };

    const handleDelete = async (id) => {
        setTasks(prev => prev.filter(x => x.task_id !== id));
        if (selectedId === id) { setSelectedId(null); setDetailMode(null); }
        try {
            await deleteTask(id);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAdd = () => {
        setSelectedId(null);
        setDetailMode("create");
        setForm({ title: "", content: "", deadline: "", status: "ongoing" });
    };

    const handleFormChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

    const handleSave = async () => {
        try {
            if (detailMode === "create") {
                const created = await createTask(form.title ?? "_", form.content ?? "_", form.deadline);
                setTasks(prev => [created, ...prev]);
                setSelectedId(created.task_id);
                setForm({ ...created });
            } else {
                const updated = await updateTask(form.task_id, form.title ?? "_", form.content ?? "_", form.deadline, form.status);
                setTasks(prev => prev.map(x => x.task_id === updated.task_id ? updated : x));
                setForm({ ...updated });
            }
            setDetailMode("view");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        if (detailMode === "create") {
            setSelectedId(null);
            setDetailMode(null);
        } else {
            const t = tasks.find(x => x.task_id === selectedId);
            if (t) setForm({ ...t });
            setDetailMode("view");
        }
    };

    const handleClose = () => { setSelectedId(null); setDetailMode(null); };

    const selectedTask = tasks.find(x => x.task_id === selectedId) ?? null;

    return (
        <div className="app">
            <Taskbar
                centerContent={centerContent}
                onCenter={setCenterContent}
                user={me}
            />

            <CenterPanel content={centerContent} userEmail={user?.email} />

            <TaskList
                tasks={tasks}
                selectedId={selectedId}
                loading={loading}
                onSelect={handleSelect}
                onToggleDone={handleToggleDone}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
            />

            <div className="col-div" />

            <DetailPanel
                mode={detailMode}
                task={selectedTask}
                form={form}
                onChange={handleFormChange}
                onSave={handleSave}
                onCancel={handleCancel}
                onStartEdit={() => setDetailMode("edit")}
                onClose={handleClose}
            />
        </div>
    );
}