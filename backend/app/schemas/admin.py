from decimal import Decimal

from pydantic import BaseModel
from datetime import datetime

from uuid import UUID

class DashboardSummary(BaseModel):
    total_publications: int
    total_orders: int
    total_users: int
    total_publishers: int

    pending_orders: int
    processing_orders: int
    shipped_orders: int
    delivered_orders: int

    low_stock_publications: int

    total_revenue: Decimal

class RecentOrder(BaseModel):

    id: UUID

    order_number: str

    customer_name: str

    customer_email: str

    total_amount: Decimal

    order_status: str

    payment_status: str

    created_at: datetime

class LowStockPublication(BaseModel):

    id: UUID

    title: str

    stock: int

    price: Decimal

    publisher: str | None

class PendingInvoiceOrder(BaseModel):
    id: UUID

    order_number: str

    customer_name: str

    customer_email: str

    customer_phone: str | None

    total_amount: Decimal

    created_at: datetime

class ReadyToShipOrder(BaseModel):
    id: UUID

    order_number: str

    customer_name: str

    customer_email: str

    total_amount: Decimal

    created_at: datetime

class RevenueAnalytics(BaseModel):
    today: Decimal
    month: Decimal
    year: Decimal
    lifetime: Decimal

class TopSellingPublication(BaseModel):
    publication_id: UUID
    title: str

    total_quantity: int

    revenue: Decimal