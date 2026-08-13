from uuid import UUID

from decimal import Decimal

from sqlalchemy.orm import Session, joinedload

from sqlalchemy import or_

from app.models.publication import Publication

from app.models.category import Category

class PublicationRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        publication: Publication,
    ) -> Publication:

        self.db.add(publication)
        self.db.commit()
        self.db.refresh(publication)

        return publication

    def get_by_id(
        self,
        publication_id: UUID,
    ) -> Publication | None:

        return (
            self.db.query(Publication)
            .options(
                joinedload(Publication.publication_type),
                joinedload(Publication.publisher),
                joinedload(Publication.categories),
            )
            .filter(Publication.id == publication_id)
            .first()
        )

    def get_by_slug(
        self,
        slug: str,
    ) -> Publication | None:

        return (
            self.db.query(Publication)
            .filter(Publication.slug == slug)
            .first()
        )

    def get_by_isbn(
        self,
        isbn: str,
    ) -> Publication | None:

        return (
            self.db.query(Publication)
            .filter(Publication.isbn == isbn)
            .first()
        )

    def get_all(self) -> list[Publication]:

        return (
            self.db.query(Publication)
            .options(
                joinedload(Publication.publication_type),
                joinedload(Publication.publisher),
                joinedload(Publication.categories),
            )
            .order_by(Publication.title)
            .all()
        )

    def update(
        self,
        publication: Publication,
    ) -> Publication:

        self.db.commit()
        self.db.refresh(publication)

        return publication

    def delete(
        self,
        publication: Publication,
    ) -> None:

        self.db.delete(publication)
        self.db.commit()

    def search(
        self,
        page: int = 1,
        limit: int = 12,
        search: str | None = None,
        featured: bool |None = None,
        latest: bool = False,
        in_stock: bool | None = None,
        min_price: Decimal | None = None,
        max_price: Decimal | None = None,
    ):
        query = (
            self.db.query(Publication)
            .options(
                joinedload(Publication.publication_type),
                joinedload(Publication.publisher),
                joinedload(Publication.categories),
            )
        )

        query = query.filter(
            Publication.is_active.is_(True)
        )

        if search:
            term = f"%{search}%"

            query = query.filter(
                or_(
                    Publication.title.ilike(term),
                    Publication.description.ilike(term),
                    Publication.keywords.ilike(term),
                    Publication.author.ilike(term),
                )
            )

        if featured is not None:
            query = query.filter(
                Publication.is_featured == featured
            )

        if in_stock is True:
            query = query.filter(
                Publication.stock > 0
            )

        if in_stock is False:
            query = query.filter(
                Publication.stock <= 0
            )

        if min_price is not None:
            query = query.filter(
                Publication.price >= min_price
            )

        if max_price is not None:
            query = query.filter(
                Publication.price <= max_price
            )

        if latest:
            query = query.order_by(
                Publication.created_at.desc()
            )
        else:
            query = query.order_by(
                Publication.title.asc()
            )

        return (
            query
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

    def get_categories_by_ids(
        self,
        category_ids: list[UUID],
    ) -> list[Category]:

        if not category_ids:
            return []

        return (
            self.db.query(Category)
            .filter(Category.id.in_(category_ids))
            .all()
        )