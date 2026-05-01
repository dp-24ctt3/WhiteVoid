from fastapi import APIRouter, Depends
from dependencies.auth import get_current_user

router = APIRouter()

@router.get("/auth/me")
def get_profile(user=Depends(get_current_user)):
    return {
        "uid": user["uid"],
        "email": user["email"],
        "name": user.get("name"),
        "provider": user["firebase"]["sign_in_provider"]
    }