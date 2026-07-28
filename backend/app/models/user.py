from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class User(BaseModel, Base):
    __tablename__ = "users"

    role_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("roles.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    phone: Mapped[Optional[str]] = mapped_column(
        String(20),
        nullable=True,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    google_id: Mapped[Optional[str]] = mapped_column(
        String(255),
        unique=True,
        nullable=True,
    )

    profile_image: Mapped[Optional[str]] = mapped_column(
        String(500),
        nullable=True,
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    last_login: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    role: Mapped["Role"] = relationship(
        "Role",
        back_populates="users",
    )