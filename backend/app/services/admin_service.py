from app.repositories.admin_repository import AdminRepository

from app.schemas.admin import DashboardSummary

from app.schemas.admin import RecentOrder

from app.schemas.admin import LowStockPublication

from app.schemas.admin import PendingInvoiceOrder

from app.schemas.admin import ReadyToShipOrder

from app.schemas.admin import RevenueAnalytics

from app.schemas.admin import TopSellingPublication

class AdminService:

    def __init__(self, repository: AdminRepository):
        self.repository = repository

    def dashboard(self) -> DashboardSummary:

        return DashboardSummary(
            total_publications=self.repository.total_publications(),
            total_orders=self.repository.total_orders(),
            total_users=self.repository.total_users(),
            total_publishers=self.repository.total_publishers(),

            pending_orders=self.repository.pending_orders(),
            processing_orders=self.repository.processing_orders(),
            shipped_orders=self.repository.shipped_orders(),
            delivered_orders=self.repository.delivered_orders(),

            low_stock_publications=self.repository.low_stock_publications(),

            total_revenue=self.repository.total_revenue(),
        )
    def recent_orders(self):

        orders = self.repository.recent_orders()

        return [
            RecentOrder(
                id=order.id,
                order_number=order.order_number,

                customer_name=order.customer_name,
                customer_email=order.customer_email,

                total_amount=order.total_amount,

                order_status=order.order_status.value,
                payment_status=order.payment_status.value,

                created_at=order.created_at,
            )
            for order in orders
        ]
    def low_stock_publications(self):

        publications = self.repository.low_stock_publications_list()

        return [
            LowStockPublication(
                id=publication.id,
                title=publication.title,
                stock=publication.stock,
                price=publication.price,
                publisher=publication.publisher.name
                if publication.publisher
                else None,
            )
            for publication in publications
        ]
    def pending_invoice_orders(self):

        orders = self.repository.pending_invoice_orders()

        return [

            PendingInvoiceOrder(
                id=order.id,

                order_number=order.order_number,

                customer_name=order.customer_name,

                customer_email=order.customer_email,

                customer_phone=order.customer_phone,

                total_amount=order.total_amount,

                created_at=order.created_at,
            )

            for order in orders

        ]
    
    def ready_to_ship_orders(self):

        orders = self.repository.ready_to_ship_orders()

        return [
            ReadyToShipOrder(
                id=order.id,
                order_number=order.order_number,
                customer_name=order.customer_name,
                customer_email=order.customer_email,
                total_amount=order.total_amount,
                created_at=order.created_at,
            )
            for order in orders
        ]
    
    def revenue_analytics(self):

        data = self.repository.revenue_analytics()

        return RevenueAnalytics(
            today=data["today"],
            month=data["month"],
            year=data["year"],
            lifetime=data["lifetime"],
        )

    def top_selling_publications(self):

        rows = self.repository.top_selling_publications()

        return [
            TopSellingPublication(
                publication_id=row.publication_id,
                title=row.title,
                total_quantity=row.total_quantity,
                revenue=row.revenue,
            )
            for row in rows
        ]