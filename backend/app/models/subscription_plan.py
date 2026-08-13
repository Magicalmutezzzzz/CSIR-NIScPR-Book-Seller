from __future__ import annotations

from decimal import Decimal

from sqlalchemy import Boolean, ForeignKey, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class SubscriptionPlan(BaseModel, Base):
    __tablename__ = "subscription_plans"

    publication_id: Mapped[str] = mapped_column(
        ForeignKey(
            "publications.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    duration_years: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    publication: Mapped["Publication"] = relationship(
        "Publication",
        back_populates="subscription_plans",
    )
    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="subscription_plan",
    )
    