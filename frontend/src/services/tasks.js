import { apiFetch } from "../utils/api";

export const getTasks = () => apiFetch("/tasks/");

export const createTask = (title, content, deadline) =>
    apiFetch("/tasks/", {
        method: "POST",
        body: JSON.stringify({ title, content, deadline }),
    });

export const updateTask = (task_id, title, content, deadline, status) =>
    apiFetch(`/tasks/${task_id}`, {
        method: "PATCH",
        body: JSON.stringify({ task_id, title, content, deadline, status }),
    });

export const deleteTask = (task_id) =>
    apiFetch(`/tasks/${task_id}`, {
        method: "DELETE",
    });