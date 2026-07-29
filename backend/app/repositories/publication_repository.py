from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.publication import Publication
from app.schemas.publication import PublicationCreate, PublicationUpdate


class PublicationRepository:
    def __init__(self, db: Session):
        self.db = db

    # -------------------------
    # Create Publication
    # -------------------------

    def create(self, publication: PublicationCreate) -> Publication:
        db_publication = Publication(
            **publication.model_dump(
                exclude={"author_ids", "category_ids"}
            )
        )

        self.db.add(db_publication)
        self.db.commit()
        self.db.refresh(db_publication)

        return db_publication

    # -------------------------
    # Get All Publications
    # -------------------------

    def get_all(
        self,
        skip: int = 0,
        limit: int = 20,
    ):
        stmt = (
            select(Publication)
            .options(
                selectinload(Publication.images),
                selectinload(Publication.publication_type),
                selectinload(Publication.authors),
                selectinload(Publication.categories),
            )
            .offset(skip)
            .limit(limit)
        )

        return self.db.scalars(stmt).all()

    # -------------------------
    # Get Publication By ID
    # -------------------------

    def get_by_id(self, publication_id: UUID):
        stmt = (
            select(Publication)
            .where(Publication.id == publication_id)
            .options(
                selectinload(Publication.images),
                selectinload(Publication.publication_type),
                selectinload(Publication.authors),
                selectinload(Publication.categories),
            )
        )

        return self.db.scalar(stmt)

    # -------------------------
    # Update Publication
    # -------------------------

    def update(
        self,
        db_publication: Publication,
        publication: PublicationUpdate,
    ) -> Publication:

        update_data = publication.model_dump(exclude_unset=True)

        update_data.pop("author_ids", None)
        update_data.pop("category_ids", None)

        for key, value in update_data.items():
            setattr(db_publication, key, value)

        self.db.commit()
        self.db.refresh(db_publication)

        return db_publication

    # -------------------------
    # Delete Publication
    # -------------------------

    def delete(self, db_publication: Publication):

        self.db.delete(db_publication)
        self.db.commit()

    # -------------------------
    # Featured Publications
    # -------------------------

    def featured(self):

        stmt = (
            select(Publication)
            .where(Publication.is_featured.is_(True))
            .where(Publication.is_active.is_(True))
        )

        return self.db.scalars(stmt).all()

    # -------------------------
    # Active Publications
    # -------------------------

    def active(self):

        stmt = (
            select(Publication)
            .where(Publication.is_active.is_(True))
        )

        return self.db.scalars(stmt).all()

    # -------------------------
    # Search Publications
    # -------------------------

    def search(self, keyword: str):

        stmt = (
            select(Publication)
            .where(
                Publication.title.ilike(f"%{keyword}%")
            )
        )

        return self.db.scalars(stmt).all()