from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import (
    UpdateUserProfileRequest,
    UserProfileResponse,
)
from app.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


def get_user_service(
    db: Session = Depends(get_db),
):
    return UserService(
        UserRepository(db)
    )


@router.get(
    "/me",
    response_model=UserProfileResponse,
)
def get_profile(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(get_user_service),
):
    return service.get_profile(current_user)


@router.put(
    "/me",
    response_model=UserProfileResponse,
)
def update_profile(
    data: UpdateUserProfileRequest,
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(get_user_service),
):
    return service.update_profile(
        current_user,
        data,
    )