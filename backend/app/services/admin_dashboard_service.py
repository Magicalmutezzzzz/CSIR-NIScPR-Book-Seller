from app.repositories.admin_dashboard_repository import (
    AdminDashboardRepository,
)
from app.schemas.dashboard import (
    DashboardResponse,
    DashboardStats,
    LowStockPublication,
    RecentOrder,
)


class AdminDashboardService:

    def __init__(
        self,
        repository: AdminDashboardRepository,
    ):
        self.repository = repository

    def get_dashboard(self) -> DashboardResponse:

        stats = DashboardStats(
            total_publications=self.repository.total_publications(),
            total_orders=self.repository.total_orders(),
            total_users=self.repository.total_users(),
            total_revenue=self.repository.total_revenue(),
        )

        low_stock = [
            LowStockPublication(
                id=str(book.id),
                title=book.title,
                stock=book.stock,
            )
            for book in self.repository.low_stock()
        ]

        recent_orders = [
            RecentOrder(
                order_number=order.order_number,
                customer_name=order.customer_name,
                total_amount=order.total_amount,
                order_status=order.order_status.value,
            )
            for order in self.repository.recent_orders()
        ]

        return DashboardResponse(
            stats=stats,
            low_stock=low_stock,
            recent_orders=recent_orders,
        )