from uuid import UUID

from sqlalchemy.orm import Session

from app.models.subscription_plan import SubscriptionPlan


class SubscriptionPlanRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        subscription_plan: SubscriptionPlan,
    ) -> SubscriptionPlan:

        self.db.add(subscription_plan)
        self.db.commit()
        self.db.refresh(subscription_plan)

        return subscription_plan

    def get_by_id(
        self,
        plan_id: UUID,
    ) -> SubscriptionPlan | None:

        return (
            self.db.query(SubscriptionPlan)
            .filter(
                SubscriptionPlan.id == plan_id,
            )
            .first()
        )

    def get_all(
        self,
    ) -> list[SubscriptionPlan]:

        return (
            self.db.query(SubscriptionPlan)
            .order_by(
                SubscriptionPlan.duration_years,
            )
            .all()
        )

    def get_by_publication(
        self,
        publication_id: UUID,
    ) -> list[SubscriptionPlan]:

        return (
            self.db.query(SubscriptionPlan)
            .filter(
                SubscriptionPlan.publication_id == publication_id,
            )
            .order_by(
                SubscriptionPlan.duration_years,
            )
            .all()
        )

    def get_by_publication_and_duration(
        self,
        publication_id: UUID,
        duration_years: int,
    ) -> SubscriptionPlan | None:

        return (
            self.db.query(SubscriptionPlan)
            .filter(
                SubscriptionPlan.publication_id == publication_id,
                SubscriptionPlan.duration_years == duration_years,
            )
            .first()
        )

    def update(
        self,
        subscription_plan: SubscriptionPlan,
    ) -> SubscriptionPlan:

        self.db.commit()
        self.db.refresh(subscription_plan)

        return subscription_plan

    def delete(
        self,
        subscription_plan: SubscriptionPlan,
    ) -> None:

        self.db.delete(subscription_plan)
        self.db.commit()