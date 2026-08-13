from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PublisherBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    description: str | None = None
    website: str | None = None
    email: str | None = None
    phone: str | None = None
    address: str | None = None
    logo_url: str | None = None
    is_active: bool = True


class PublisherCreate(PublisherBase):
    pass


class PublisherUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=200)
    description: str | None = None
    website: str | None = None
    email: str | None = None
    phone: str | None = None
    address: str | None = None
    logo_url: str | None = None
    is_active: bool | None = None


class PublisherResponse(PublisherBase):
    id: UUID
    slug: str

    model_config = ConfigDict(from_attributes=True)