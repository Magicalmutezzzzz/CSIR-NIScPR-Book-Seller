from uuid import UUID

from sqlalchemy.orm import Session

from app.models.publication_image import PublicationImage


class PublicationImageRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        image: PublicationImage,
    ) -> PublicationImage:

        self.db.add(image)
        self.db.commit()
        self.db.refresh(image)

        return image

    def get_by_id(
        self,
        image_id: UUID,
    ) -> PublicationImage | None:

        return (
            self.db.query(PublicationImage)
            .filter(PublicationImage.id == image_id)
            .first()
        )

    def get_by_publication(
        self,
        publication_id: UUID,
    ) -> list[PublicationImage]:

        return (
            self.db.query(PublicationImage)
            .filter(
                PublicationImage.publication_id == publication_id
            )
            .order_by(
                PublicationImage.display_order,
                PublicationImage.created_at,
            )
            .all()
        )

    def update(
        self,
        image: PublicationImage,
    ) -> PublicationImage:

        self.db.commit()
        self.db.refresh(image)

        return image

    def delete(
        self,
        image: PublicationImage,
    ) -> None:

        self.db.delete(image)
        self.db.commit()