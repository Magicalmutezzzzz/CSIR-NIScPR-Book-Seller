from __future__ import annotations

from decimal import Decimal

from sqlalchemy import Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.enums.order_status import OrderStatus
from app.enums.payment_status import PaymentStatus
from app.models.base_model import BaseModel


class Order(BaseModel, Base):
    __tablename__ = "orders"

    # ---------- Customer ----------

    user_id = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
    )

    customer_name: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    customer_email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    customer_phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    # ---------- Order ----------

    order_number: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False,
        index=True,
    )

    order_status: Mapped[OrderStatus] = mapped_column(
        Enum(OrderStatus),
        default=OrderStatus.REQUEST_RECEIVED,
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus),
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    # ---------- Amount ----------

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    shipping_charge: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    discount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    tax: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    total_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    # ---------- Shipping ----------

    shipping_address: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    country: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    pincode: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
    )

    # ---------- Invoice ----------

    invoice_number: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    invoice_file: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    # ---------- Shipping Details ----------

    courier_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    tracking_number: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    # ---------- Notes ----------

    customer_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    admin_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ---------- Relationships ----------

    user = relationship(
        "User",
        back_populates="orders",
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )