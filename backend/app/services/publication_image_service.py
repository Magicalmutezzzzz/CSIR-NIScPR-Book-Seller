from uuid import UUID

from fastapi import HTTPException, status

from app.models.publication import Publication
from app.models.publication_image import PublicationImage
from app.repositories.publication_image_repository import (
    PublicationImageRepository,
)
from app.schemas.publication_image import (
    PublicationImageCreate,
    PublicationImageUpdate,
)


class PublicationImageService:

    def __init__(
        self,
        repository: PublicationImageRepository,
    ):
        self.repository = repository

    def create_image(
        self,
        data: PublicationImageCreate,
    ) -> PublicationImage:

        publication = self.repository.db.get(
            Publication,
            data.publication_id,
        )

        if publication is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Publication not found.",
            )

        if data.is_primary:

            images = self.repository.get_by_publication(
                data.publication_id,
            )

            for image in images:
                image.is_primary = False

        image = PublicationImage(
            publication_id=data.publication_id,
            image_url=data.image_url,
            alt_text=data.alt_text,
            display_order=data.display_order,
            is_primary=data.is_primary,
        )

        return self.repository.create(image)

    def get_images(
        self,
        publication_id: UUID,
    ) -> list[PublicationImage]:

        return self.repository.get_by_publication(
            publication_id,
        )

    def get_image(
        self,
        image_id: UUID,
    ) -> PublicationImage:

        image = self.repository.get_by_id(image_id)

        if image is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Image not found.",
            )

        return image

    def update_image(
        self,
        image_id: UUID,
        data: PublicationImageUpdate,
    ) -> PublicationImage:

        image = self.get_image(image_id)

        update_data = data.model_dump(
            exclude_unset=True,
        )

        if update_data.get("is_primary"):

            images = self.repository.get_by_publication(
                image.publication_id,
            )

            for img in images:
                img.is_primary = False

        for key, value in update_data.items():
            setattr(
                image,
                key,
                value,
            )

        return self.repository.update(image)

    def delete_image(
        self,
        image_id: UUID,
    ) -> None:

        image = self.get_image(image_id)

        self.repository.delete(image)