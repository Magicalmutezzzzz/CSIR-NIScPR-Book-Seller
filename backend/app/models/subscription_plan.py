from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.auth import LoginRequest, LoginResponse
from app.services.auth import AuthService

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest):
    token = AuthService.authenticate(data.email, data.password)
    return LoginResponse(access_token=token)

@router.get("/me")
def me(
    current_user=Depends(get_current_user),
):
    return {
        "id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role.name if current_user.role else None,
    }