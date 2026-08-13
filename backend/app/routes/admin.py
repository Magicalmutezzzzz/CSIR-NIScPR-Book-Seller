from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.dependencies import get_current_admin

from app.repositories.admin_repository import AdminRepository
from app.services.admin_service import AdminService

from app.schemas.admin import (
    DashboardSummary,
    RecentOrder,
    LowStockPublication,
    PendingInvoiceOrder,
    ReadyToShipOrder,
    RevenueAnalytics,
    TopSellingPublication,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"],
)


@router.get(
    "/orders/recent",
    response_model=list[RecentOrder],
)
def recent_orders(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)
    service = AdminService(repository)

    return service.recent_orders()


@router.get(
    "/publications/low-stock",
    response_model=list[LowStockPublication],
)
def low_stock_publications(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)
    service = AdminService(repository)

    return service.low_stock_publications()


@router.get(
    "/orders/pending-invoices",
    response_model=list[PendingInvoiceOrder],
)
def pending_invoice_orders(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)
    service = AdminService(repository)

    return service.pending_invoice_orders()


@router.get(
    "/orders/ready-to-ship",
    response_model=list[ReadyToShipOrder],
)
def ready_to_ship_orders(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)
    service = AdminService(repository)

    return service.ready_to_ship_orders()


@router.get(
    "/analytics/revenue",
    response_model=RevenueAnalytics,
)
def revenue_analytics(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)
    service = AdminService(repository)

    return service.revenue_analytics()


@router.get(
    "/analytics/top-selling-publications",
    response_model=list[TopSellingPublication],
)
def top_selling_publications(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)
    service = AdminService(repository)

    return service.top_selling_publications()