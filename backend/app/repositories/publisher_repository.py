from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.publisher import Publisher


class PublisherRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, publisher: Publisher):
        self.db.add(publisher)
        self.db.commit()
        self.db.refresh(publisher)
        return publisher

    def get_all(self):
        return self.db.scalars(
            select(Publisher).order_by(Publisher.name)
        ).all()

    def get_by_id(self, publisher_id: UUID):
        return self.db.get(Publisher, publisher_id)

    def get_by_name(self, name: str):
        return self.db.scalar(
            select(Publisher).where(Publisher.name == name)
        )

    def update(self):
        self.db.commit()

    def delete(self, publisher: Publisher):
        self.db.delete(publisher)
        self.db.commit()