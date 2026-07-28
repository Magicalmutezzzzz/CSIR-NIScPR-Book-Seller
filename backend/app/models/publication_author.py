from sqlalchemy import ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class PublicationAuthor(Base):
    __tablename__ = "publication_authors"

    publication_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("publications.id", ondelete="CASCADE"),
        primary_key=True,
    )

    author_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("authors.id", ondelete="CASCADE"),
        primary_key=True,
    )

    # Preserves author order (e.g. First Author, Second Author...)
    author_order: Mapped[int] = mapped_column(
        Integer,
        default=1,
        nullable=False,
    )