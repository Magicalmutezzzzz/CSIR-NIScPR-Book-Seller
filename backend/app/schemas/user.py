from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UpdateUserProfileRequest(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    phone: str | None = Field(
        default=None,
        max_length=20,
    )

    gender: str | None = Field(
        default=None,
        max_length=20,
    )

    dob: date | None = None

    organization: str | None = Field(
        default=None,
        max_length=200,
    )

    designation: str | None = Field(
        default=None,
        max_length=150,
    )

    address: str | None = None

    city: str | None = Field(
        default=None,
        max_length=100,
    )

    state: str | None = Field(
        default=None,
        max_length=100,
    )

    country: str | None = Field(
        default=None,
        max_length=100,
    )

    pincode: str | None = Field(
        default=None,
        max_length=10,
    )

    profile_image: str | None = None


class UserProfileResponse(BaseModel):
    id: UUID

    full_name: str

    email: EmailStr

    phone: str | None

    gender: str | None

    dob: date | None

    organization: str | None

    designation: str | None

    address: str | None

    city: str | None

    state: str | None

    country: str | None

    pincode: str | None

    profile_image: str | None

    is_verified: bool

    is_active: bool

    model_config = ConfigDict(
        from_attributes=True,
    )