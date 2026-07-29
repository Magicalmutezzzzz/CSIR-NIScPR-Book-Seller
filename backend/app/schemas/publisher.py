from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, HttpUrl


class PublisherBase(BaseModel):
    name: str
    email: EmailStr | None = None
    website: HttpUrl | None = None
    phone: str | None = None
    address: str | None = None


class PublisherCreate(PublisherBase):
    pass


class PublisherUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    website: HttpUrl | None = None
    phone: str | None = None
    address: str | None = None


class PublisherResponse(PublisherBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)