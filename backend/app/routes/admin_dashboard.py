from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.admin_dashboard_repository import (
    AdminDashboardRepository,
)
from app.schemas.dashboard import DashboardResponse

from app.core.dependencies import get_current_admin

from app.services.admin_dashboard_service import (
    AdminDashboardService,
)

router = APIRouter(
    prefix="/admin/dashboard",
    tags=["Admin Dashboard"],
)


def get_dashboard_service(
    db: Session = Depends(get_db),
) -> AdminDashboardService:

    repository = AdminDashboardRepository(db)

    return AdminDashboardService(repository)


@router.get(
    "",
    response_model=DashboardResponse,
)
def get_dashboard(
    current_admin=Depends(get_current_admin),
    service: AdminDashboardService = Depends(
        get_dashboard_service,
    ),
):
    return service.get_dashboard()