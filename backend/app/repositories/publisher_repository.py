from uuid import UUID

from sqlalchemy.orm import Session

from app.models.publisher import Publisher

from app.models.category import Category

from app.models.publication import Publication

class PublisherRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, publisher: Publisher) -> Publisher:
        self.db.add(publisher)
        self.db.commit()
        self.db.refresh(publisher)
        return publisher

    def get_by_id(self, publisher_id: UUID) -> Publisher | None:
        return (
            self.db.query(Publisher)
            .filter(Publisher.id == publisher_id)
            .first()
        )

    def get_by_name(self, name: str) -> Publisher | None:
        return (
            self.db.query(Publisher)
            .filter(Publisher.name == name)
            .first()
        )

    def get_by_slug(self, slug: str) -> Publisher | None:
        return (
            self.db.query(Publisher)
            .filter(Publisher.slug == slug)
            .first()
        )

    def get_all(self) -> list[Publisher]:
        return (
            self.db.query(Publisher)
            .order_by(Publisher.name)
            .all()
        )

    def update(self, publisher: Publisher) -> Publisher:
        self.db.commit()
        self.db.refresh(publisher)
        return publisher

    def delete(self, publisher: Publisher) -> None:
        self.db.delete(publisher)
        self.db.commit()
class PublicationRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, publication: Publication):
        self.db.add(publication)
        self.db.commit()
        self.db.refresh(publication)
        return publication

    def get_categories_by_ids(self, category_ids: list):
        return (
            self.db.query(Category)
            .filter(Category.id.in_(category_ids))
            .all()
        )