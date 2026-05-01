from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime, timezone

class TaskCreate(BaseModel):
    title: str
    content: Optional[str] = ""
    deadline: Optional[datetime] = None

    @field_validator("deadline", mode="before")
    @classmethod
    def make_aware(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            v = datetime.fromisoformat(v)
        if isinstance(v, datetime) and v.tzinfo is None:
            return v.replace(tzinfo=timezone.utc)
        return v

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    deadline: Optional[datetime] = None
    status: Optional[str] = None

    @field_validator("deadline", mode="before")
    @classmethod
    def make_aware(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            v = datetime.fromisoformat(v)
        if isinstance(v, datetime) and v.tzinfo is None:
            return v.replace(tzinfo=timezone.utc)
        return v
        
    def non_empty(self):
        return {k: v for k, v in self.model_dump().items() if v is not None}