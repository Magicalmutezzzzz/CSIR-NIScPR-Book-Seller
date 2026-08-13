from uuid import UUID
from app.core.dependencies import get_current_admin
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.category_repository import CategoryRepository
from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["Categories"])


def get_category_service(db: Session = Depends(get_db)) -> CategoryService:
    repository = CategoryRepository(db)
    return CategoryService(repository)


@router.post(
    "",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    data: CategoryCreate,
    current_admin=Depends(get_current_admin),
    service: CategoryService = Depends(get_category_service),
):
    return service.create_category(data)


@router.get(
    "",
    response_model=list[CategoryResponse],
)
def get_categories(
    service: CategoryService = Depends(get_category_service),
):
    return service.get_all_categories()


@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
)
def get_category(
    category_id: UUID,
    service: CategoryService = Depends(get_category_service),
):
    return service.get_category(category_id)


@router.put(
    "/{category_id}",
    response_model=CategoryResponse,
)
def update_category(
    category_id: UUID,
    data: CategoryUpdate,
    current_admin=Depends(get_current_admin),
    service: CategoryService = Depends(get_category_service),
):
    return service.update_category(category_id, data)

@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_category(
    category_id: UUID,
    current_admin=Depends(get_current_admin),
    service: CategoryService = Depends(get_category_service),
):
    service.delete_category(category_id)