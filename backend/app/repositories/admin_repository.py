from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session

from sqlalchemy import func
from app.models.order_item import OrderItem

from app.enums.order_status import OrderStatus
from app.enums.payment_status import PaymentStatus
from app.models.order import Order
from app.models.publication import Publication
from app.models.publisher import Publisher
from app.models.user import User

from app.enums.payment_status import PaymentStatus

from datetime import date
from sqlalchemy import func

class AdminRepository:

    def __init__(self, db: Session):
        self.db = db

    def total_publications(self):
        return self.db.query(Publication).count()

    def total_orders(self):
        return self.db.query(Order).count()

    def total_users(self):
        return self.db.query(User).count()

    def total_publishers(self):
        return self.db.query(Publisher).count()

    def pending_orders(self):
        return (
            self.db.query(Order)
            .filter(Order.order_status == OrderStatus.REQUEST_RECEIVED)
            .count()
        )

    def processing_orders(self):
        return (
            self.db.query(Order)
            .filter(Order.order_status == OrderStatus.PROCESSING)
            .count()
        )

    def shipped_orders(self):
        return (
            self.db.query(Order)
            .filter(Order.order_status == OrderStatus.SHIPPED)
            .count()
        )

    def delivered_orders(self):
        return (
            self.db.query(Order)
            .filter(Order.order_status == OrderStatus.DELIVERED)
            .count()
        )

    def low_stock_publications(self):
        return (
            self.db.query(Publication)
            .filter(Publication.stock <= 5)
            .count()
        )

    def total_revenue(self):

        revenue = (
            self.db.query(
                func.sum(Order.total_amount)
            )
            .filter(
                Order.payment_status == PaymentStatus.PAID,
            )
            .scalar()
        )

        return revenue or Decimal("0.00")
    
    def recent_orders(
        self,
        limit: int = 10,
    ):
        return (
            self.db.query(Order)
            .order_by(
                Order.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return revenue or Decimal("0.00")

    def low_stock_publications_list(
        self,
        threshold: int = 5,
    ):
        return (
            self.db.query(Publication)
            .filter(Publication.stock <= threshold)
            .order_by(Publication.stock.asc())
            .all()
        )
    def pending_invoice_orders(self):

        return (
            self.db.query(Order)
            .filter(
                Order.order_status == OrderStatus.REQUEST_RECEIVED
            )
            .order_by(
                Order.created_at.asc()
            )
            .all()
        )
    
    def ready_to_ship_orders(self):

        return (
            self.db.query(Order)
            .filter(
                Order.payment_status == PaymentStatus.PAID,
                Order.order_status == OrderStatus.PROCESSING,
            )
            .order_by(
                Order.created_at.asc(),
            )
            .all()
        )

    def revenue_analytics(self):

        today = date.today()

        today_total = (
            self.db.query(
                func.coalesce(
                    func.sum(Order.total_amount),
                    0,
                )
            )
            .filter(
                func.date(Order.created_at) == today,
                Order.payment_status == PaymentStatus.PAID,
            )
            .scalar()
        )

        month_total = (
            self.db.query(
                func.coalesce(
                    func.sum(Order.total_amount),
                    0,
                )
            )
            .filter(
                func.extract(
                    "month",
                    Order.created_at,
                )
                == today.month,
                func.extract(
                    "year",
                    Order.created_at,
                )
                == today.year,
                Order.payment_status == PaymentStatus.PAID,
            )
            .scalar()
        )

        year_total = (
            self.db.query(
                func.coalesce(
                    func.sum(Order.total_amount),
                    0,
                )
            )
            .filter(
                func.extract(
                    "year",
                    Order.created_at,
                )
                == today.year,
                Order.payment_status == PaymentStatus.PAID,
            )
            .scalar()
        )

        lifetime_total = (
            self.db.query(
                func.coalesce(
                    func.sum(Order.total_amount),
                    0,
                )
            )
            .filter(
                Order.payment_status == PaymentStatus.PAID,
            )
            .scalar()
        )

        return {
            "today": today_total,
            "month": month_total,
            "year": year_total,
            "lifetime": lifetime_total,
        }

    def top_selling_publications(
        self,
        limit: int = 10,
    ):

        return (
            self.db.query(
                Publication.id.label("publication_id"),
                Publication.title,
                func.sum(OrderItem.quantity).label("total_quantity"),
                func.sum(OrderItem.total_price).label("revenue"),
            )
            .join(
                OrderItem,
                Publication.id == OrderItem.publication_id,
            )
            .join(
                Order,
                Order.id == OrderItem.order_id,
            )
            .filter(
                Order.payment_status == PaymentStatus.PAID,
            )
            .group_by(
                Publication.id,
                Publication.title,
            )
            .order_by(
                func.sum(OrderItem.quantity).desc(),
            )
            .limit(limit)
            .all()
        )