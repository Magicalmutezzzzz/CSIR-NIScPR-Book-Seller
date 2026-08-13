from uuid import UUID

from fastapi import HTTPException, status

from app.models.category import Category
from app.models.publication import Publication
from app.models.publication_category import PublicationCategory
from app.repositories.publication_category_repository import (
    PublicationCategoryRepository,
)
from app.schemas.publication_category import (
    PublicationCategoryCreate,
)


class PublicationCategoryService:

    def __init__(
        self,
        repository: PublicationCategoryRepository,
    ):
        self.repository = repository

    def assign_category(
        self,
        data: PublicationCategoryCreate,
    ) -> PublicationCategory:

        publication = self.repository.db.get(
            Publication,
            data.publication_id,
        )

        if publication is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Publication not found.",
            )

        category = self.repository.db.get(
            Category,
            data.category_id,
        )

        if category is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found.",
            )

        existing = self.repository.get(
            data.publication_id,
            data.category_id,
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category already assigned to this publication.",
            )

        relation = PublicationCategory(
            publication_id=data.publication_id,
            category_id=data.category_id,
        )

        return self.repository.create(relation)

    def get_categories_of_publication(
        self,
        publication_id: UUID,
    ) -> list[PublicationCategory]:

        return self.repository.get_by_publication(
            publication_id,
        )

    def get_publications_of_category(
        self,
        category_id: UUID,
    ) -> list[PublicationCategory]:

        return self.repository.get_by_category(
            category_id,
        )

    def remove_category(
        self,
        publication_id: UUID,
        category_id: UUID,
    ) -> None:

        relation = self.repository.get(
            publication_id,
            category_id,
        )

        if relation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Relation not found.",
            )

        self.repository.delete(relation)