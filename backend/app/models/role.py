from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class Role(BaseModel, Base):
    __tablename__ = "roles"

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    users: Mapped[list["User"]] = relationship(
        "User",
        back_populates="role",
    )