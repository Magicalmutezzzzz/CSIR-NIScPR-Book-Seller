from __future__ import annotations

from datetime import date
from decimal import Decimal
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import (
    Boolean,
    Date,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class Publication(BaseModel, Base):
    __tablename__ = "publications"

    # ---------- Basic Information ----------

    title: Mapped[str] = mapped_column(
        String(300),
        nullable=False,
        index=True,
    )

    subtitle: Mapped[str | None] = mapped_column(
        String(300),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ---------- Publication Type ----------

    publication_type_id = mapped_column(
        ForeignKey("publication_types.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    publisher_id: Mapped[UUID | None] = mapped_column(
    ForeignKey("publishers.id", ondelete="SET NULL"),
    nullable=True,
    index=True,
    )
    # ---------- Identifiers ----------

    isbn: Mapped[str | None] = mapped_column(
        String(50),
        unique=True,
        nullable=True,
    )

    issn: Mapped[str | None] = mapped_column(
        String(50),
        unique=True,
        nullable=True,
    )

    doi: Mapped[str | None] = mapped_column(
        String(150),
        unique=True,
        nullable=True,
    )
    
    publisher: Mapped["Publisher | None"] = relationship(
    "Publisher",
    back_populates="publications",
    )

    # ---------- Pricing ----------

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    discount_price: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )

    stock: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    # ---------- Details ----------

    language: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    edition: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    

    pages: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    publication_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    # ---------- Preview ----------

    pdf_preview: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    # ---------- Status ----------

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    # ---------- Relationships ----------

    publication_type: Mapped["PublicationType"] = relationship(
        "PublicationType",
        back_populates="publications",
    )

    images: Mapped[list["PublicationImage"]] = relationship(
        "PublicationImage",
        back_populates="publication",
        cascade="all, delete-orphan",
    )

    subscription_plans: Mapped[list["SubscriptionPlan"]] = relationship(
        "SubscriptionPlan",
        back_populates="publication",
        cascade="all, delete-orphan",
    )

    authors: Mapped[list["Author"]] = relationship(
        "Author",
        secondary="publication_authors",
        back_populates="publications",
    )

    categories: Mapped[list["Category"]] = relationship(
        "Category",
        secondary="publication_categories",
        back_populates="publications",
    )