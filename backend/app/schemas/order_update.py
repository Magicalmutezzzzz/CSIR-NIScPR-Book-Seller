from pydantic import BaseModel
from typing import Optional

from app.enums.order_status import OrderStatus
from app.enums.payment_status import PaymentStatus


class OrderUpdate(BaseModel):
    order_status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None

    invoice_number: Optional[str] = None
    invoice_file: Optional[str] = None

    courier_name: Optional[str] = None
    tracking_number: Optional[str] = None

    admin_notes: Optional[str] = None