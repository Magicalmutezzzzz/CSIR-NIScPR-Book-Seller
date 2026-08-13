from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.publication import Publication
from app.models.user import User


class AdminDashboardRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def total_publications(self) -> int:

        return (
            self.db.query(
                func.count(Publication.id),
            )
            .scalar()
            or 0
        )

    def total_users(self) -> int:

        return (
            self.db.query(
                func.count(User.id),
            )
            .scalar()
            or 0
        )

    def total_orders(self) -> int:

        return (
            self.db.query(
                func.count(Order.id),
            )
            .scalar()
            or 0
        )

    def total_revenue(self) -> Decimal:

        revenue = (
            self.db.query(
                func.sum(Order.total_amount),
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
                Order.created_at.desc(),
            )
            .limit(limit)
            .all()
        )

    def low_stock(
        self,
        threshold: int = 5,
    ):

        return (
            self.db.query(Publication)
            .filter(
                Publication.stock <= threshold,
            )
            .order_by(
                Publication.stock.asc(),
            )
            .all()
        )
        