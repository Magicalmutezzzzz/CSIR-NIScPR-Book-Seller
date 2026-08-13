from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.publication_image_repository import (
    PublicationImageRepository,
)
from app.schemas.publication_image import (
    PublicationImageCreate,
    PublicationImageResponse,
    PublicationImageUpdate,
)
from app.services.publication_image_service import (
    PublicationImageService,
)

from app.core.dependencies import get_current_admin

router = APIRouter(
    prefix="/publication-images",
    tags=["Publication Images"],
)


def get_publication_image_service(
    db: Session = Depends(get_db),
) -> PublicationImageService:

    repository = PublicationImageRepository(db)

    return PublicationImageService(repository)


@router.post(
    "",
    response_model=PublicationImageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_image(
    data: PublicationImageCreate,
    current_admin=Depends(get_current_admin),
    service: PublicationImageService = Depends(
        get_publication_image_service
    ),
):
    return service.create_image(data)


@router.get(
    "/publication/{publication_id}",
    response_model=list[PublicationImageResponse],
)
def get_images(
    publication_id: UUID,
    service: PublicationImageService = Depends(
        get_publication_image_service
    ),
):
    return service.get_images(publication_id)


@router.get(
    "/{image_id}",
    response_model=PublicationImageResponse,
)
def get_image(
    image_id: UUID,
    service: PublicationImageService = Depends(
        get_publication_image_service
    ),
):
    return service.get_image(image_id)


@router.put(
    "/{image_id}",
    response_model=PublicationImageResponse,
)
def update_image(
    image_id: UUID,
    data: PublicationImageUpdate,
    current_admin=Depends(get_current_admin),
    service: PublicationImageService = Depends(
        get_publication_image_service
    ),
):
    return service.update_image(
        image_id,
        data,
    )


@router.delete(
    "/{image_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_image(
    image_id: UUID,
    current_admin=Depends(get_current_admin),
    service: PublicationImageService = Depends(
        get_publication_image_service
    ),
):
    service.delete_image(image_id)