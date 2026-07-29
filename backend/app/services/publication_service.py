from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.publication_repository import PublicationRepository
from app.schemas.publication import (
    PublicationCreate,
    PublicationUpdate,
)


class PublicationService:
    def __init__(self, db: Session):
        self.repository = PublicationRepository(db)

    # --------------------------------
    # Create Publication
    # --------------------------------

    def create_publication(
        self,
        publication: PublicationCreate,
    ):
        return self.repository.create(publication)

    # --------------------------------
    # Get All Publications
    # --------------------------------

    def get_publications(
        self,
        skip: int = 0,
        limit: int = 20,
    ):
        return self.repository.get_all(skip, limit)

    # --------------------------------
    # Get One Publication
    # --------------------------------

    def get_publication(
        self,
        publication_id: UUID,
    ):
        return self.repository.get_by_id(publication_id)

    # --------------------------------
    # Update Publication
    # --------------------------------

    def update_publication(
        self,
        publication_id: UUID,
        publication: PublicationUpdate,
    ):

        db_publication = self.repository.get_by_id(publication_id)

        if not db_publication:
            return None

        return self.repository.update(
            db_publication,
            publication,
        )

    # --------------------------------
    # Delete Publication
    # --------------------------------

    def delete_publication(
        self,
        publication_id: UUID,
    ):

        db_publication = self.repository.get_by_id(publication_id)

        if not db_publication:
            return False

        self.repository.delete(db_publication)

        return True

    # --------------------------------
    # Featured Publications
    # --------------------------------

    def featured_publications(self):
        return self.repository.featured()

    # --------------------------------
    # Active Publications
    # --------------------------------

    def active_publications(self):
        return self.repository.active()

    # --------------------------------
    # Search Publications
    # --------------------------------

    def search_publications(
        self,
        keyword: str,
    ):
        return self.repository.search(keyword)