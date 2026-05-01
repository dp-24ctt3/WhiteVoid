from fastapi import HTTPException, APIRouter

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "where you create tasks to fill your existence."}

@router.get("/health")
async def health():
    return {"status": "ok"}