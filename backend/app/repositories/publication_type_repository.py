from sqlalchemy.orm import Session

from app.models.publication_type import PublicationType


class PublicationTypeRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return (
            self.db.query(PublicationType)
            .order_by(PublicationType.name)
            .all()
        )