from uuid import UUID

from fastapi import HTTPException, status

from app.models.publication import Publication
from app.models.subscription_plan import SubscriptionPlan
from app.repositories.subscription_plan_repository import (
    SubscriptionPlanRepository,
)
from app.schemas.subscription_plan import (
    SubscriptionPlanCreate,
    SubscriptionPlanUpdate,
)


class SubscriptionPlanService:

    def __init__(
        self,
        repository: SubscriptionPlanRepository,
    ):
        self.repository = repository

    def create_subscription_plan(
        self,
        data: SubscriptionPlanCreate,
    ) -> SubscriptionPlan:

        publication = self.repository.db.get(
            Publication,
            data.publication_id,
        )

        if publication is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Publication not found.",
            )

        existing = self.repository.get_by_publication_and_duration(
            data.publication_id,
            data.duration_years,
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{data.duration_years}-year subscription already exists for this publication.",
            )

        subscription_plan = SubscriptionPlan(
            publication_id=data.publication_id,
            duration_years=data.duration_years,
            price=data.price,
            is_active=data.is_active,
        )

        return self.repository.create(subscription_plan)

    def get_all_subscription_plans(
        self,
    ) -> list[SubscriptionPlan]:

        return self.repository.get_all()

    def get_subscription_plan(
        self,
        plan_id: UUID,
    ) -> SubscriptionPlan:

        plan = self.repository.get_by_id(plan_id)

        if plan is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Subscription plan not found.",
            )

        return plan

    def get_publication_subscription_plans(
        self,
        publication_id: UUID,
    ) -> list[SubscriptionPlan]:

        return self.repository.get_by_publication(
            publication_id,
        )

    def update_subscription_plan(
        self,
        plan_id: UUID,
        data: SubscriptionPlanUpdate,
    ) -> SubscriptionPlan:

        plan = self.get_subscription_plan(plan_id)

        update_data = data.model_dump(
            exclude_unset=True,
        )

        if "duration_years" in update_data:

            existing = self.repository.get_by_publication_and_duration(
                plan.publication_id,
                update_data["duration_years"],
            )

            if existing and existing.id != plan.id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Subscription duration already exists.",
                )

        for key, value in update_data.items():
            setattr(plan, key, value)

        return self.repository.update(plan)

    def delete_subscription_plan(
        self,
        plan_id: UUID,
    ) -> None:

        plan = self.get_subscription_plan(plan_id)

        self.repository.delete(plan)