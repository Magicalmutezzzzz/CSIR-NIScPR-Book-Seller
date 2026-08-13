from uuid import UUID

from pydantic import BaseModel, ConfigDict


class PublicationCategoryCreate(BaseModel):
    publication_id: UUID
    category_id: UUID


class PublicationCategoryResponse(BaseModel):
    publication_id: UUID
    category_id: UUID

    model_config = ConfigDict(
        from_attributes=True,
    )