from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.core.dependencies import get_current_admin

from app.repositories.publisher_repository import PublisherRepository
from app.schemas.publisher import (
    PublisherCreate,
    PublisherResponse,
    PublisherUpdate,
)
from app.services.publisher_service import PublisherService

router = APIRouter(
    prefix="/publishers",
    tags=["Publishers"],
)


def get_publisher_service(
    db: Session = Depends(get_db),
) -> PublisherService:
    repository = PublisherRepository(db)
    return PublisherService(repository)


@router.post(
    "",
    response_model=PublisherResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_publisher(
    data: PublisherCreate,
    current_admin=Depends(get_current_admin),
    service: PublisherService = Depends(get_publisher_service),
):
    return service.create_publisher(data)


@router.get(
    "",
    response_model=list[PublisherResponse],
)
def get_publishers(
    service: PublisherService = Depends(get_publisher_service),
):
    return service.get_all_publishers()


@router.get(
    "/{publisher_id}",
    response_model=PublisherResponse,
)
def get_publisher(
    publisher_id: UUID,
    service: PublisherService = Depends(get_publisher_service),
):
    return service.get_publisher(publisher_id)


@router.put(
    "/{publisher_id}",
    response_model=PublisherResponse,
)
def update_publisher(
    publisher_id: UUID,
    data: PublisherUpdate,
    current_admin=Depends(get_current_admin),
    service: PublisherService = Depends(get_publisher_service),
):
    return service.update_publisher(
        publisher_id,
        data,
    )

@router.delete(
    "/{publisher_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_publisher(
    publisher_id: UUID,
    current_admin=Depends(get_current_admin),
    service: PublisherService = Depends(get_publisher_service),
):
    service.delete_publisher(publisher_id)