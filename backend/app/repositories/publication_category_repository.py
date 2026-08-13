from uuid import UUID

from sqlalchemy.orm import Session

from app.models.publication_category import PublicationCategory


class PublicationCategoryRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        publication_category: PublicationCategory,
    ) -> PublicationCategory:

        self.db.add(publication_category)
        self.db.commit()
        self.db.refresh(publication_category)

        return publication_category

    def get(
        self,
        publication_id: UUID,
        category_id: UUID,
    ) -> PublicationCategory | None:

        return (
            self.db.query(PublicationCategory)
            .filter(
                PublicationCategory.publication_id == publication_id,
                PublicationCategory.category_id == category_id,
            )
            .first()
        )

    def get_by_publication(
        self,
        publication_id: UUID,
    ) -> list[PublicationCategory]:

        return (
            self.db.query(PublicationCategory)
            .filter(
                PublicationCategory.publication_id == publication_id,
            )
            .all()
        )

    def get_by_category(
        self,
        category_id: UUID,
    ) -> list[PublicationCategory]:

        return (
            self.db.query(PublicationCategory)
            .filter(
                PublicationCategory.category_id == category_id,
            )
            .all()
        )

    def delete(
        self,
        publication_category: PublicationCategory,
    ) -> None:

        self.db.delete(publication_category)
        self.db.commit()