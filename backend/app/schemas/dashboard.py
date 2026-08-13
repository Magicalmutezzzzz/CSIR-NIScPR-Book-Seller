from decimal import Decimal

from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_publications: int
    total_orders: int
    total_users: int
    total_revenue: Decimal


class LowStockPublication(BaseModel):
    id: str
    title: str
    stock: int


class RecentOrder(BaseModel):
    order_number: str
    customer_name: str
    total_amount: Decimal
    order_status: str


class DashboardResponse(BaseModel):
    stats: DashboardStats
    low_stock: list[LowStockPublication]
    recent_orders: list[RecentOrder]