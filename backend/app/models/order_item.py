from __future__ import annotations

from decimal import Decimal

from sqlalchemy import ForeignKey, Integer, Numeric, String

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel


class OrderItem(BaseModel, Base):
    __tablename__ = "order_items"

    order_id = mapped_column(
        ForeignKey(
            "orders.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    publication_id = mapped_column(
        ForeignKey(
            "publications.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
        index=True,
    )

    subscription_plan_id = mapped_column(
        ForeignKey(
            "subscription_plans.id",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
    )

    publication_title: Mapped[str] = mapped_column(
        String(300),
        nullable=False,
    )

    subscription_duration_years: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    total_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    # ---------- Relationships ----------

    order = relationship(
        "Order",
        back_populates="items",
    )

    publication = relationship(
        "Publication",
        back_populates="order_items",
    )

    subscription_plan = relationship(
        "SubscriptionPlan",
        back_populates="order_items",
    )