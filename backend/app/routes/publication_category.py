from uuid import UUID
from app.core.dependencies import get_current_admin
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.publication_category_repository import (
    PublicationCategoryRepository,
)
from app.schemas.publication_category import (
    PublicationCategoryCreate,
    PublicationCategoryResponse,
)
from app.services.publication_category_service import (
    PublicationCategoryService,
)

router = APIRouter(
    prefix="/publication-categories",
    tags=["Publication Categories"],
)


def get_publication_category_service(
    db: Session = Depends(get_db),
) -> PublicationCategoryService:

    repository = PublicationCategoryRepository(db)

    return PublicationCategoryService(repository)


@router.post(
    "",
    response_model=PublicationCategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def assign_category(
    data: PublicationCategoryCreate,
    current_admin=Depends(get_current_admin),
    service: PublicationCategoryService = Depends(
        get_publication_category_service,
    ),
):
    return service.assign_category(data)


@router.get(
    "/publication/{publication_id}",
    response_model=list[PublicationCategoryResponse],
)
def get_categories_of_publication(
    publication_id: UUID,
    service: PublicationCategoryService = Depends(
        get_publication_category_service,
    ),
):
    return service.get_categories_of_publication(
        publication_id,
    )


@router.get(
    "/category/{category_id}",
    response_model=list[PublicationCategoryResponse],
)
def get_publications_of_category(
    category_id: UUID,
    service: PublicationCategoryService = Depends(
        get_publication_category_service,
    ),
):
    return service.get_publications_of_category(
        category_id,
    )


@router.delete(
    "/publication/{publication_id}/category/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_category(
    publication_id: UUID,
    category_id: UUID,
    current_admin=Depends(get_current_admin),
    service: PublicationCategoryService = Depends(
        get_publication_category_service,
    ),
):
    service.remove_category(
        publication_id,
        category_id,
    )