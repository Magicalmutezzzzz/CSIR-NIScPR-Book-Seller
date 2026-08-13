from datetime import datetime
from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException, status

from app.enums.order_status import OrderStatus
from app.enums.payment_status import PaymentStatus
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.publication import Publication
from app.models.subscription_plan import SubscriptionPlan
from app.repositories.order_repository import OrderRepository
from app.schemas.order import OrderCreate, OrderUpdate


class OrderService:

    def __init__(
        self,
        repository: OrderRepository,
    ):
        self.repository = repository

    def _generate_order_number(self) -> str:
        year = datetime.now().year
        count = len(self.repository.get_all()) + 1
        return f"NISCPR-{year}-{count:06d}"

    def create_order(
        self,
        data: OrderCreate,
    ) -> Order:

        subtotal = Decimal("0.00")
        order_items: list[OrderItem] = []

        for item in data.items:

            publication = self.repository.db.get(
                Publication,
                item.publication_id,
            )

            if publication is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Publication not found.",
                )

            if publication.stock < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for '{publication.title}'.",
                )

            unit_price = (
                publication.discount_price
                if publication.discount_price
                else {publication.price}
            )

            subscription_duration = None

            if item.subscription_plan_id:

                plan = self.repository.db.get(
                    SubscriptionPlan,
                    item.subscription_plan_id,
                )

                if plan is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="Subscription plan not found.",
                    )

                if plan.publication_id != publication.id:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Subscription plan does not belong to this publication.",
                    )

                subscription_duration = plan.duration_years
                unit_price = plan.price

            total_price = unit_price * item.quantity
            subtotal += total_price

            order_items.append(
                OrderItem(
                    publication_id=publication.id,
                    publication_title=publication.title,
                    subscription_plan_id=item.subscription_plan_id,
                    subscription_duration_years=subscription_duration,
                    quantity=item.quantity,
                    unit_price=unit_price,
                    total_price=total_price,
                )
            )

        shipping_charge = Decimal("0.00")
        discount = Decimal("0.00")
        tax = Decimal("0.00")

        total_amount = (
            subtotal
            + shipping_charge
            + tax
            - discount
        )

        order = Order(
            customer_name=data.customer_name,
            customer_email=data.customer_email,
            customer_phone=data.customer_phone,
            shipping_address=data.shipping_address,
            city=data.city,
            state=data.state,
            country=data.country,
            pincode=data.pincode,
            customer_notes=data.customer_notes,
            order_number=self._generate_order_number(),
            order_status=OrderStatus.REQUEST_RECEIVED,
            payment_status=PaymentStatus.PENDING,
            subtotal=subtotal,
            shipping_charge=shipping_charge,
            discount=discount,
            tax=tax,
            total_amount=total_amount,
        )

        return self.repository.create_order(
            order,
            order_items,
        )

    def get_all_orders(self) -> list[Order]:
        return self.repository.get_all()

    def get_my_orders(
        self,
        email: str,
    ) -> list[Order]:

        return self.repository.get_by_customer_email(
            email,
        )


    def get_my_order(
        self,
        order_id: UUID,
        email: str,
    ) -> Order:

        order = self.repository.get_by_id_and_email(
            order_id,
            email,
        )

        if order is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found.",
            )

        return order
    
    def cancel_my_order(
        self,
        order_id: UUID,
        email: str,
    ) -> Order:

        order = self.get_my_order(
            order_id,
            email,
        )

        if order.order_status in (
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order cannot be cancelled.",
            )

        if order.payment_status == PaymentStatus.PAID:

            for item in order.items:
                item.publication.stock += item.quantity

        order.order_status = OrderStatus.CANCELLED

        return self.repository.update(order)

        def get_order(
            self,
            order_id: UUID,
        ) -> Order:

            order = self.repository.get_by_id(order_id)

            if order is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Order not found.",
                )

            return order

    def update_order(
        self,
        order_id: UUID,
        data: OrderUpdate,
    ) -> Order:

        order = self.get_order(order_id)

        if order.order_status == OrderStatus.DELIVERED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Delivered orders cannot be modified.",
            )

        allowed_fields = {
            "order_status",
            "payment_status",
            "invoice_number",
            "invoice_file",
            "courier_name",
            "tracking_number",
            "admin_notes",
        }

        update_data = data.model_dump(exclude_unset=True)

        allowed_transitions = {
            OrderStatus.REQUEST_RECEIVED: [
                OrderStatus.INVOICE_SENT,
            ],
            OrderStatus.INVOICE_SENT: [
                OrderStatus.PAYMENT_RECEIVED,
            ],
            OrderStatus.PAYMENT_RECEIVED: [
                OrderStatus.PROCESSING,
            ],
            OrderStatus.PROCESSING: [
                OrderStatus.SHIPPED,
            ],
            OrderStatus.SHIPPED: [
                OrderStatus.DELIVERED,
            ],
            OrderStatus.DELIVERED: [],
        }

        new_status = update_data.get("order_status")

        if new_status:

            if new_status not in allowed_transitions[
                order.order_status
            ]:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid order status transition.",
                )

        if (
            new_status == OrderStatus.SHIPPED
            and (
                not update_data.get("courier_name")
                or not update_data.get("tracking_number")
            )
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Courier name and tracking number are required before shipping.",
            )

        if (
            update_data.get("payment_status")
            == PaymentStatus.PAID
        ):

            for item in order.items:

                publication = item.publication

                if publication.stock < item.quantity:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Insufficient stock for '{publication.title}'.",
                    )

                publication.stock -= item.quantity

        for key, value in update_data.items():

            if key in allowed_fields:
                setattr(order, key, value)

        return self.repository.update(order)

    def delete_order(
        self,
        order_id: UUID,
    ) -> None:

        order = self.get_order(order_id)
        self.repository.delete(order)