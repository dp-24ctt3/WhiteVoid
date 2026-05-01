from config.firebase_config import get_firestore
from fastapi import APIRouter, Depends, HTTPException
from firebase_admin import firestore
from datetime import datetime, timezone
from dependencies.auth import get_current_user
from models.task_models import TaskCreate, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])
db = get_firestore()

@router.get("/")
def get_tasks(user=Depends(get_current_user)):
    docs = (
        db.collection("tasks")
        .where("user_id", "==", user["uid"])
        .order_by("created_at", direction=firestore.Query.DESCENDING)
        .stream()
    )
    return [doc.to_dict() for doc in docs]


@router.post("/", status_code=201)
def create_task(body: TaskCreate, user=Depends(get_current_user)):
    now = datetime.now(timezone.utc)
    task_ref = db.collection("tasks").document()

    doc = {
        "user_id": user["uid"],
        "task_id": task_ref.id,
        "title": body.title,
        "content": body.content,
        "deadline": body.deadline,
        "created_at": now,
        "updated_at": now,
        "status": "ongoing",
    }

    if (doc["deadline"] and now > doc["deadline"]):
        doc["status"] = "late"
    task_ref.set(doc)
    return doc


@router.patch("/{task_id}")
def update_task(task_id: str, body: TaskUpdate, user=Depends(get_current_user)):
    task_ref = db.collection("tasks").document(task_id)
    task = task_ref.get()

    if not task.exists:
        raise HTTPException(status_code=404, detail="Task not found.")
    if task.to_dict().get("user_id") != user["uid"]:
        raise HTTPException(status_code=403, detail="Not your task.")

    updates = body.non_empty()
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update.")

    updates["updated_at"] = datetime.now(timezone.utc)
    if (updates["updated_at"] > (updates["deadline"] if updates["deadline"] else task.to_dict().get("deadline")) and updates["status"] != "done"):
        updates["status"] = "late"
    task_ref.update(updates)
    return task_ref.get().to_dict()


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: str, user=Depends(get_current_user)):
    task_ref = db.collection("tasks").document(task_id)
    task = task_ref.get()

    if not task.exists:
        raise HTTPException(status_code=404, detail="Task not found.")
    if task.to_dict().get("user_id") != user["uid"]:
        raise HTTPException(status_code=403, detail="Not your task.")

    task_ref.delete()