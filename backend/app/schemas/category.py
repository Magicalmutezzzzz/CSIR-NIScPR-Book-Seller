from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CategoryBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    description: str | None = None
    image_url: str | None = None
    display_order: int = 0
    is_active: bool = True


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    description: str | None = None
    image_url: str | None = None
    display_order: int | None = None
    is_active: bool | None = None


class CategoryResponse(CategoryBase):
    id: UUID
    slug: str

    model_config = ConfigDict(from_attributes=True)