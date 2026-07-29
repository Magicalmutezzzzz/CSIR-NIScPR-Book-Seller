from uuid import UUID

from fastapi import HTTPException, status

from app.models.publisher import Publisher
from app.repositories.publisher_repository import PublisherRepository
from app.schemas.publisher import PublisherCreate, PublisherUpdate


class PublisherService:
    def __init__(self, repository: PublisherRepository):
        self.repository = repository

    def create(self, data: PublisherCreate):
        if self.repository.get_by_name(data.name):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Publisher already exists",
            )

        publisher = Publisher(**data.model_dump())
        return self.repository.create(publisher)

    def get_all(self):
        return self.repository.get_all()

    def get_by_id(self, publisher_id: UUID):
        publisher = self.repository.get_by_id(publisher_id)
        if publisher is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Publisher not found",
            )
        return publisher

    def update(self, publisher_id: UUID, data: PublisherUpdate):
        publisher = self.get_by_id(publisher_id)

        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(publisher, key, value)

        self.repository.update()
        return publisher

    def delete(self, publisher_id: UUID):
        publisher = self.get_by_id(publisher_id)
        self.repository.delete(publisher)
