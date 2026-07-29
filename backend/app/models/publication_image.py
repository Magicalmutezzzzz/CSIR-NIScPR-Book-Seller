from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class PublicationImage(BaseModel, Base):
    __tablename__ = "publication_images"

    publication_id: Mapped[str] = mapped_column(
        ForeignKey("publications.id", ondelete="CASCADE"),
        nullable=False,
    )

    image_url: Mapped[str] = mapped_column(String(500), nullable=False)

    alt_text: Mapped[str | None] = mapped_column(String(255), nullable=True)

    is_primary: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    publication = relationship(
        "Publication",
        back_populates="images",
    )