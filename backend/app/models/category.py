from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class Category(BaseModel, Base):
    __tablename__ = "categories"

    name: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    publications: Mapped[list["Publication"]] = relationship(
        "Publication",
        back_populates="category",
    )