from uuid import UUID

from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem


class OrderRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create_order(
        self,
        order: Order,
        items: list[OrderItem],
    ) -> Order:
        """
        Create order and all items in a single transaction.
        """

        self.db.add(order)
        self.db.flush()

        for item in items:
            item.order_id = order.id

        self.db.add_all(items)

        self.db.commit()

        self.db.refresh(order)

        return order

    def get_by_id(
        self,
        order_id: UUID,
    ) -> Order | None:

        return (
            self.db.query(Order)
            .filter(
                Order.id == order_id,
            )
            .first()
        )

    def get_by_order_number(
        self,
        order_number: str,
    ) -> Order | None:

        return (
            self.db.query(Order)
            .filter(
                Order.order_number == order_number,
            )
            .first()
        )

    def get_all(
        self,
    ) -> list[Order]:

        return (
            self.db.query(Order)
            .order_by(
                Order.created_at.desc(),
            )
            .all()
        )

    def get_by_customer_email(
        self,
        email: str,
    ) -> list[Order]:

        return (
            self.db.query(Order)
            .filter(
                Order.customer_email == email,
            )
            .order_by(
                Order.created_at.desc(),
            )
            .all()
        )
    def get_by_id_and_email(
        self,
        order_id: UUID,
        email: str,
    ) -> Order | None:

        return (
            self.db.query(Order)
            .filter(
                Order.id == order_id,
                Order.customer_email == email,
            )
            .first()
        )

    def update(
        self,
        order: Order,
    ) -> Order:

        self.db.commit()
        self.db.refresh(order)

        return order

    def delete(
        self,
        order: Order,
    ) -> None:

        self.db.delete(order)
        self.db.commit()