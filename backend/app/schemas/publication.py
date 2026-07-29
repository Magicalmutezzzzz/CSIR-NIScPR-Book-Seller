from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


# -----------------------------
# Base Schema
# -----------------------------

class PublicationBase(BaseModel):
    title: str = Field(..., max_length=300)
    subtitle: str | None = None
    description: str | None = None

    publication_type_id: UUID

    isbn: str | None = None
    issn: str | None = None
    doi: str | None = None

    price: Decimal
    discount_price: Decimal | None = None
    stock: int = 0

    language: str | None = None
    edition: str | None = None
    publisher: str | None = None

    pages: int | None = None
    publication_date: date | None = None

    pdf_preview: str | None = None

    is_featured: bool = False
    is_active: bool = True


# -----------------------------
# Create
# -----------------------------

class PublicationCreate(PublicationBase):
    author_ids: list[UUID] = []
    category_ids: list[UUID] = []


# -----------------------------
# Update
# -----------------------------

class PublicationUpdate(BaseModel):
    title: str | None = None
    subtitle: str | None = None
    description: str | None = None

    publication_type_id: UUID | None = None

    isbn: str | None = None
    issn: str | None = None
    doi: str | None = None

    price: Decimal | None = None
    discount_price: Decimal | None = None
    stock: int | None = None

    language: str | None = None
    edition: str | None = None
    publisher: str | None = None

    pages: int | None = None
    publication_date: date | None = None

    pdf_preview: str | None = None

    is_featured: bool | None = None
    is_active: bool | None = None

    author_ids: list[UUID] | None = None
    category_ids: list[UUID] | None = None


# -----------------------------
# Response
# -----------------------------

class PublicationResponse(PublicationBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)