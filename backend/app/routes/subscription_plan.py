from uuid import UUID
from app.core.dependencies import get_current_admin
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.subscription_plan_repository import (
    SubscriptionPlanRepository,
)
from app.schemas.subscription_plan import (
    SubscriptionPlanCreate,
    SubscriptionPlanResponse,
    SubscriptionPlanUpdate,
)
from app.services.subscription_plan_service import (
    SubscriptionPlanService,
)

router = APIRouter(
    prefix="/subscription-plans",
    tags=["Subscription Plans"],
)


def get_subscription_plan_service(
    db: Session = Depends(get_db),
) -> SubscriptionPlanService:

    repository = SubscriptionPlanRepository(db)

    return SubscriptionPlanService(repository)


@router.post(
    "",
    response_model=SubscriptionPlanResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_subscription_plan(
    data: SubscriptionPlanCreate,
    current_admin=Depends(get_current_admin),
    service: SubscriptionPlanService = Depends(
        get_subscription_plan_service,
    ),
):
    return service.create_subscription_plan(data)


@router.get(
    "",
    response_model=list[SubscriptionPlanResponse],
)
def get_subscription_plans(
    service: SubscriptionPlanService = Depends(
        get_subscription_plan_service,
    ),
):
    return service.get_all_subscription_plans()


@router.get(
    "/{plan_id}",
    response_model=SubscriptionPlanResponse,
)
def get_subscription_plan(
    plan_id: UUID,
    service: SubscriptionPlanService = Depends(
        get_subscription_plan_service,
    ),
):
    return service.get_subscription_plan(plan_id)


@router.get(
    "/publication/{publication_id}",
    response_model=list[SubscriptionPlanResponse],
)
def get_publication_subscription_plans(
    publication_id: UUID,
    service: SubscriptionPlanService = Depends(
        get_subscription_plan_service,
    ),
):
    return service.get_publication_subscription_plans(
        publication_id,
    )


@router.put(
    "/{plan_id}",
    response_model=SubscriptionPlanResponse,
)
def update_subscription_plan(
    plan_id: UUID,
    data: SubscriptionPlanUpdate,
    current_admin=Depends(get_current_admin),
    service: SubscriptionPlanService = Depends(
        get_subscription_plan_service,
    ),
):
    return service.update_subscription_plan(
        plan_id,
        data,
    )


@router.delete(
    "/{plan_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_subscription_plan(
    plan_id: UUID,
    current_admin=Depends(get_current_admin),
    service: SubscriptionPlanService = Depends(
        get_subscription_plan_service,
    ),
):
    service.delete_subscription_plan(plan_id)