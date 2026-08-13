from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PublicationImageBase(BaseModel):
    image_url: str = Field(..., max_length=500)
    alt_text: str | None = Field(default=None, max_length=255)
    display_order: int = 0
    is_primary: bool = False


class PublicationImageCreate(PublicationImageBase):
    publication_id: UUID


class PublicationImageUpdate(BaseModel):
    image_url: str | None = None
    alt_text: str | None = None
    display_order: int | None = None
    is_primary: bool | None = None


class PublicationImageResponse(PublicationImageBase):
    id: UUID
    publication_id: UUID

    model_config = ConfigDict(from_attributes=True)