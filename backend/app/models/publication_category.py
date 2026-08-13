from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class PublicationCategory(Base):
    __tablename__ = "publication_categories"

    publication_id: Mapped[str] = mapped_column(
        ForeignKey(
            "publications.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    category_id: Mapped[str] = mapped_column(
        ForeignKey(
            "categories.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )