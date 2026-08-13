from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.enums.order_status import OrderStatus
from app.enums.payment_status import PaymentStatus


# ==========================================================
# Order Item Schemas
# ==========================================================

class OrderItemCreate(BaseModel):
    publication_id: UUID
    subscription_plan_id: UUID | None = None
    quantity: int = Field(gt=0)


class OrderItemResponse(BaseModel):
    id: UUID
    publication_id: UUID
    publication_title: str
    subscription_plan_id: UUID | None
    subscription_duration_years: int | None
    quantity: int
    unit_price: Decimal
    total_price: Decimal

    model_config = ConfigDict(
        from_attributes=True,
    )


# ==========================================================
# Order Schemas
# ==========================================================

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str | None = None

    shipping_address: str
    city: str
    state: str
    country: str
    pincode: str

    customer_notes: str | None = None

    items: list[OrderItemCreate]


class OrderUpdate(BaseModel):
    order_status: OrderStatus | None = None
    payment_status: PaymentStatus | None = None

    invoice_number: str | None = None
    invoice_file: str | None = None

    courier_name: str | None = None
    tracking_number: str | None = None

    admin_notes: str | None = None


class OrderResponse(BaseModel):
    id: UUID
    order_number: str

    customer_name: str
    customer_email: EmailStr
    customer_phone: str | None

    shipping_address: str
    city: str
    state: str
    country: str
    pincode: str

    subtotal: Decimal
    shipping_charge: Decimal
    discount: Decimal
    tax: Decimal
    total_amount: Decimal

    order_status: OrderStatus
    payment_status: PaymentStatus

    invoice_number: str | None
    invoice_file: str | None

    courier_name: str | None
    tracking_number: str | None

    customer_notes: str | None
    admin_notes: str | None

    created_at: datetime
    updated_at: datetime

    items: list[OrderItemResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )