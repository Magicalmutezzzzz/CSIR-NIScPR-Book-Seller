from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SubscriptionPlanCreate(BaseModel):
    publication_id: UUID
    duration_years: int = Field(ge=1, le=3)
    price: Decimal
    is_active: bool = True


class SubscriptionPlanUpdate(BaseModel):
    duration_years: int | None = Field(
        default=None,
        ge=1,
        le=3,
    )
    price: Decimal | None = None
    is_active: bool | None = None


class SubscriptionPlanResponse(BaseModel):
    id: UUID
    publication_id: UUID
    duration_years: int
    price: Decimal
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True,
    )