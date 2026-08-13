from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.publication_repository import PublicationRepository
from app.schemas.publication import (
    PublicationCreate,
    PublicationResponse,
    PublicationUpdate,
)
from app.services.publication_service import PublicationService

from app.core.dependencies import get_current_admin

from decimal import Decimal
from fastapi import Query

router = APIRouter(
    prefix="/publications",
    tags=["Publications"],
)


def get_publication_service(
    db: Session = Depends(get_db),
) -> PublicationService:
    repository = PublicationRepository(db)
    return PublicationService(repository)


@router.post(
    "",
    response_model=PublicationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_publication(
    data: PublicationCreate,
    current_admin=Depends(get_current_admin),
    service: PublicationService = Depends(get_publication_service),
):
    return service.create_publication(data)

@router.get(
    "",
    response_model=list[PublicationResponse],
)
def get_publications(
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),

    search: str | None = None,

    featured: bool | None = None,

    latest: bool = False,

    in_stock: bool | None = None,

    min_price: Decimal | None = None,

    max_price: Decimal | None = None,

    service: PublicationService = Depends(
        get_publication_service
    ),
):

    return service.search_publications(
        page=page,
        limit=limit,
        search=search,
        featured=featured,
        latest=latest,
        in_stock=in_stock,
        min_price=min_price,
        max_price=max_price,
    )

@router.get(
    "/{publication_id}",
    response_model=PublicationResponse,
)
def get_publication(
    publication_id: UUID,
    service: PublicationService = Depends(get_publication_service),
):
    return service.get_publication(publication_id)


@router.put(
    "/{publication_id}",
    response_model=PublicationResponse,
)
def update_publication(
    publication_id: UUID,
    data: PublicationUpdate,
    current_admin=Depends(get_current_admin),
    service: PublicationService = Depends(get_publication_service),
):
    return service.update_publication(
        publication_id,
        data,
    )


@router.delete(
    "/{publication_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_publication(
    publication_id: UUID,
    current_admin=Depends(get_current_admin),
    service: PublicationService = Depends(get_publication_service),
):
    service.delete_publication(publication_id)