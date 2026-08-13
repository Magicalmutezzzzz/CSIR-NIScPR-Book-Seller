from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.order_repository import OrderRepository
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderUpdate,
)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
from app.services.order_service import OrderService

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


def get_order_service(
    db: Session = Depends(get_db),
) -> OrderService:
    repository = OrderRepository(db)
    return OrderService(repository)


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    data: OrderCreate,
    service: OrderService = Depends(get_order_service),
):
    return service.create_order(data)


@router.get(
    "",
    response_model=list[OrderResponse],
)
def get_orders(
    service: OrderService = Depends(get_order_service),
):
    return service.get_all_orders()

@router.get(
    "/my-orders",
    response_model=list[OrderResponse],
)
def get_my_orders(
    email: str = Query(...),
    service: OrderService = Depends(get_order_service),
):
    return service.get_my_orders(email)


@router.get(
    "/my-orders/{order_id}",
    response_model=OrderResponse,
)
def get_my_order(
    order_id: UUID,
    email: str = Query(...),
    service: OrderService = Depends(get_order_service),
):
    return service.get_my_order(
        order_id,
        email,
    )


@router.put(
    "/my-orders/{order_id}/cancel",
    response_model=OrderResponse,
)
def cancel_my_order(
    order_id: UUID,
    email: str = Query(...),
    service: OrderService = Depends(get_order_service),
):
    return service.cancel_my_order(
        order_id,
        email,
    )

@router.get(
    "/{order_id}",
    response_model=OrderResponse,
)
def get_order(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
):
    return service.get_order(order_id)


@router.put(
    "/{order_id}",
    response_model=OrderResponse,
)
def update_order(
    order_id: UUID,
    data: OrderUpdate,
    service: OrderService = Depends(get_order_service),
):
    return service.update_order(
        order_id,
        data,
    )


@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_order(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
):
    service.delete_order(order_id)