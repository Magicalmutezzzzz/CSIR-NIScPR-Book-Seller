from uuid import UUID

from fastapi import HTTPException, status
from slugify import slugify

from app.models.publisher import Publisher
from app.repositories.publisher_repository import PublisherRepository
from app.schemas.publisher import (
    PublisherCreate,
    PublisherUpdate,
)


class PublisherService:

    def __init__(
        self,
        repository: PublisherRepository,
    ):
        self.repository = repository

    # ---------------------------------------------------------
    # CREATE PUBLISHER
    # ---------------------------------------------------------

    def create_publisher(
        self,
        data: PublisherCreate,
    ) -> Publisher:

        slug = slugify(data.name)

        # Check duplicate publisher name
        if self.repository.get_by_name(data.name):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Publisher already exists.",
            )

        # Check duplicate slug
        if self.repository.get_by_slug(slug):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A publisher with this name already exists.",
            )

        publisher = Publisher(
            name=data.name,
            slug=slug,
            description=data.description,
            website=data.website,
            email=data.email,
            phone=data.phone,
            address=data.address,
            logo_url=data.logo_url,
            is_active=data.is_active,
        )

        return self.repository.create(publisher)

    # ---------------------------------------------------------
    # GET ALL PUBLISHERS
    # ---------------------------------------------------------

    def get_all_publishers(
        self,
    ) -> list[Publisher]:

        return self.repository.get_all()

    # ---------------------------------------------------------
    # GET SINGLE PUBLISHER
    # ---------------------------------------------------------

    def get_publisher(
        self,
        publisher_id: UUID,
    ) -> Publisher:

        publisher = self.repository.get_by_id(
            publisher_id
        )

        if not publisher:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Publisher not found.",
            )

        return publisher

    # ---------------------------------------------------------
    # UPDATE PUBLISHER
    # ---------------------------------------------------------

    def update_publisher(
        self,
        publisher_id: UUID,
        data: PublisherUpdate,
    ) -> Publisher:

        publisher = self.get_publisher(
            publisher_id
        )

        update_data = data.model_dump(
            exclude_unset=True,
        )

        # If publisher name is changed,
        # regenerate its slug.
        if "name" in update_data:

            new_name = update_data["name"]

            if new_name:
                existing = self.repository.get_by_name(
                    new_name
                )

                if (
                    existing
                    and existing.id != publisher.id
                ):
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Publisher already exists.",
                    )

                update_data["slug"] = slugify(
                    new_name
                )

        # Apply changes
        for key, value in update_data.items():

            setattr(
                publisher,
                key,
                value,
            )

        return self.repository.update(
            publisher
        )

    # ---------------------------------------------------------
    # DELETE PUBLISHER
    # ---------------------------------------------------------

    def delete_publisher(
        self,
        publisher_id: UUID,
    ) -> None:

        publisher = self.get_publisher(
            publisher_id
        )

        self.repository.delete(
            publisher
        )