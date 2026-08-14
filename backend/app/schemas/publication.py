from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

class PublicationTypeResponse(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)


class CategoryResponse(BaseModel):
    id: UUID
    name: str
    slug: str

    model_config = ConfigDict(from_attributes=True)
class PublicationBase(BaseModel):
    title: str = Field(
        ...,
        min_length=2,
        max_length=300,
    )

    subtitle: str | None = None

    slug: str | None = None

    description: str | None = None

    keywords: str | None = None

    publication_type_id: UUID

    publisher_id: UUID | None = None

    isbn: str | None = None

    issn: str | None = None

    doi: str | None = None

    sku: str | None = None

    price: Decimal = Field(
        ge=0,
    )

    discount_price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    stock: int = Field(
        default=0,
        ge=0,
    )

    language: str | None = None

    format: str | None = None

    edition: str | None = None

    pages: int | None = Field(
        default=None,
        ge=0,
    )

    publication_date: date | None = None

    cover_image: str | None = None

    pdf_preview: str | None = None

    is_featured: bool = False

    is_active: bool = True


class PublicationCreate(PublicationBase):

    author: str | None = None

    category_ids: list[UUID] = Field(
        default_factory=list,
    )


class PublicationUpdate(BaseModel):

    title: str | None = None

    subtitle: str | None = None

    slug: str | None = None

    description: str | None = None

    author: str | None = None

    keywords: str | None = None

    publication_type_id: UUID | None = None

    publisher_id: UUID | None = None

    isbn: str | None = None

    issn: str | None = None

    doi: str | None = None

    sku: str | None = None

    price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    discount_price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    stock: int | None = Field(
        default=None,
        ge=0,
    )

    language: str | None = None

    format: str | None = None

    edition: str | None = None

    pages: int | None = Field(
        default=None,
        ge=0,
    )

    publication_date: date | None = None

    cover_image: str | None = None

    pdf_preview: str | None = None

    is_featured: bool | None = None

    is_active: bool | None = None

    category_ids: list[UUID] | None = None


class PublicationResponse(PublicationBase):
    id: UUID

    author: str | None = None

    category_ids: list[UUID] = Field(default_factory=list)

    publication_type: PublicationTypeResponse | None = None

    categories: list[CategoryResponse] = Field(default_factory=list)

    model_config = ConfigDict(
        from_attributes=True,
    )